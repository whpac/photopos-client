import L, { LeafletEventHandlerFn } from 'leaflet';
import MapAdapter from './MapAdapter';
import MapPoint from './MapPoint';

class MapController {
    private map: L.Map;
    private mapEventHandlers: Map<string, LeafletEventHandlerFn>;
    private markers: Map<string, L.Marker>;
    protected adapter: MapAdapter;

    constructor(map: L.Map, adapter: MapAdapter) {
        this.map = map;
        this.mapEventHandlers = new Map();
        this.markers = new Map();
        this.adapter = adapter;

        this.attachMapEventHandler('moveend', this.onMapMoved);
        this.updateMapView();
    }

    release(): void {
        for(const markerHash of this.markers.keys()) {
            this.removeMarker(markerHash);
        }
        for(const event of this.mapEventHandlers.keys()) {
            this.detachMapEventHandler(event);
        }
    }

    /**
     * Attaches an event handler to the map in a way it's easily detachable.
     * @param eventName The name of the event to attach to the map
     * @param handler The handler function to attach to the event (will be bound to current this)
     */
    private attachMapEventHandler(eventName: string, handler: LeafletEventHandlerFn): void {
        handler = handler.bind(this);
        this.map.addEventListener(eventName, handler);
        this.mapEventHandlers.set(eventName, handler);
    }

    /**
     * Detaches the event handler from the map.
     * @param eventName The name of the event to detach from the map
     */
    private detachMapEventHandler(eventName: string): void {
        const handler = this.mapEventHandlers.get(eventName);
        if(handler) {
            this.map.removeEventListener(eventName, handler);
        }
    }

    private onMapMoved(): void {
        this.updateMapView();
    }

    /**
     * Updates the map view by adding/removing markers.
     */
    private async updateMapView(): Promise<void> {
        const bounds = this.map.getBounds();
        const bNE = bounds.getNorthEast();
        const bSW = bounds.getSouthWest();
        this.displayBounds(bounds);

        const adapterPoints = await this.adapter.getPoints(bSW.lat, bNE.lat, bSW.lng, bNE.lng);
        for(const point of adapterPoints) {
            if(!bounds.contains(point)) continue; // Skip points that are out of bounds
            this.displayMarker(point);
        }

        this.removeOutOfBoundsMarkers();
    }

    /**
     * Adds a marker to the map at the specified point.
     * If a marker at the coords already exists, it will be returned.
     * @param coords The coordinates of the marker to display
     * @returns The marker that was displayed
     */
    private displayMarker(coords: MapPoint): L.Marker {
        const markerHash = coords.getHashCode();
        let marker = this.markers.get(markerHash);
        if(marker) return marker; // Marker already exists

        marker = L.marker(coords);
        this.markers.set(markerHash, marker);
        marker.addTo(this.map);
        return marker;
    }

    /**
     * Removes a marker from the map.
     * @param markerHash The hash of the marker to remove.
     */
    private removeMarker(markerHash: string): void {
        const marker = this.markers.get(markerHash);
        if(!marker) return; // There was no marker with such hash

        this.markers.delete(markerHash);
        marker.remove();
    }

    /**
     * Removes all markers that are out of bounds.
     */
    private removeOutOfBoundsMarkers(): void {
        const bound = this.map.getBounds();
        // TODO: Add some margin to ensure the pin is completely invisible

        for(const [markerHash, marker] of this.markers) {
            const coords = marker.getLatLng();
            if(!bound.contains(coords)) {
                this.removeMarker(markerHash);
            }
        }
    }

    // TODO: Remove this debug function
    private displayBounds(bounds: L.LatLngBounds) {
        let diag = document.getElementById('diag');
        if(!diag) {
            diag = document.createElement('div');
            diag.id = 'diag';
            diag.style.position = 'absolute';
            diag.style.top = '0';
            diag.style.left = '0';
            diag.style.zIndex = '1000';
            diag.style.backgroundColor = 'rgba(255,255,255,0.7)';
            diag.style.padding = '2px 6px';
            diag.style.fontSize = '10px';
            document.body.appendChild(diag);
        }

        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        diag.innerHTML = `<b>Bounds:</b> (${sw.lat.toFixed(6)} N, ${sw.lng.toFixed(6)} E) - (${ne.lat.toFixed(6)} N, ${ne.lng.toFixed(6)} E)`;
    }
}

export default MapController;