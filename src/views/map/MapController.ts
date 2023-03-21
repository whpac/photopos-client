import L, { LatLngExpression, LeafletEventHandlerFn } from 'leaflet';

class MapController {
    private map: L.Map;
    private mapEventHandlers: Map<string, LeafletEventHandlerFn>;
    private markers: Set<L.Marker>;

    constructor(map: L.Map) {
        this.map = map;
        this.mapEventHandlers = new Map();
        this.markers = new Set();

        this.attachMapEventHandler('moveend', this.onMapMoved);

        console.log('Created map controller');
    }

    release(): void {
        this.detachMapEventHandler('moveend');
        console.log('Released map controller');
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
        const bounds = this.map.getBounds();
        this.displayBounds(bounds);

        // TODO: Load points from the adapter
        // TODO: Display those points on the map provided they weren't displayed before
        this.displayMarker(bounds.getCenter());
        this.removeOutOfBoundsMarkers();
    }

    private displayMarker(coords: LatLngExpression): L.Marker {
        const marker = L.marker(coords);
        this.markers.add(marker);
        marker.addTo(this.map);
        return marker;
    }

    private removeMarker(marker: L.Marker): void {
        this.markers.delete(marker);
        marker.remove();
    }

    private removeOutOfBoundsMarkers(): void {
        const bound = this.map.getBounds();
        const ne = bound.getNorthEast();
        const sw = bound.getSouthWest();

        for(const marker of this.markers) {
            const coords = marker.getLatLng();
            if(coords.lat > ne.lat || coords.lat < sw.lat || coords.lng > ne.lng || coords.lng < sw.lng) {
                this.removeMarker(marker);
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