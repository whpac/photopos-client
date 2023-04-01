import L, { LeafletEventHandlerFn } from 'leaflet';
import MapAdapter from './MapAdapter';
import MapControlChannel from './MapControlChannel';
import MapMarker from './MapMarker';
import MapPoint from './MapPoint';

class MapController {
    // The relative thickness of the margin to add to the map bounds (in both directions)
    private readonly MAP_MARGIN = [0.06, 0.02] as const;

    private map: L.Map;
    private mapEventHandlers: Map<string, LeafletEventHandlerFn>;
    private markers: Map<string, MapMarker>;
    private points: Set<MapPoint>;
    protected adapter: MapAdapter;
    protected controlChannel: MapControlChannel;

    constructor(map: L.Map, adapter: MapAdapter, controlChannel: MapControlChannel) {
        this.map = map;
        this.mapEventHandlers = new Map();
        this.markers = new Map();
        this.points = new Set();
        this.adapter = adapter;
        this.controlChannel = controlChannel;

        this.attachMapEventHandler('moveend', this.onMapMoved);
        this.attachMapEventHandler('click', this.onMapClicked);
        this.controlChannel.onMapFilterChanged.addListener(() => this.updateMapView());
        this.updateMapView();
    }

    /**
     * Clean up the map controller.
     */
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

    private onMapClicked(): void {
        // Don't deselect the point if nothing is selected
        if(this.controlChannel.getSelectedPoint() === null) return;
        this.controlChannel.selectPoint(null);
    }

    /**
     * Updates the map view by adding/removing markers.
     */
    private async updateMapView(): Promise<void> {
        const bounds = this.map.getBounds();
        const marginBounds = this.makeMarginBounds(bounds, this.MAP_MARGIN);
        const bNE = marginBounds.getNorthEast();
        const bSW = marginBounds.getSouthWest();

        let adapterPoints = await this.adapter.getPoints(bSW.lat, bNE.lat, bSW.lng, bNE.lng);

        const filter = this.controlChannel.getMapFilter();
        if(filter !== null) {
            adapterPoints = filter.filter(adapterPoints);
        }

        // Here will remain those points that should be removed from the map
        // even though they are still in the bounds (but not returned by the adapter
        // or filtered out by the user)
        const formerPointsHash = new Set<string>(this.markers.keys());

        const addedPoints = new Set<MapPoint>();
        for(const point of adapterPoints) {
            if(!marginBounds.contains(point)) continue; // Skip points that are out of bounds
            const marker = this.displayMarker(point);
            formerPointsHash.delete(point.getHashCode());

            if(marker == null) continue; // Skip points that are already present
            addedPoints.add(point);
        }

        const removedPoints = this.removeOutOfBoundsMarkers(this.MAP_MARGIN);

        // Remove the points that are in bounds but filtered out
        for(const pointHash of formerPointsHash) {
            const removedPoint = this.removeMarker(pointHash);
            if(removedPoint) removedPoints.add(removedPoint);
        }

        if(this.hasMapChanged(addedPoints, removedPoints)) {
            this.controlChannel.setMapPoints(this.points);
        }
    }

    /**
     * Based on the points that were added and removed, checks if the map contents have changed.
     * @param addedPoints The points that were added to the map
     * @param removedPoints The points that were removed from the map
     * @returns Whether the map contents have changed
     */
    private hasMapChanged(addedPoints: Set<MapPoint>, removedPoints: Set<MapPoint>): boolean {
        if(addedPoints.size !== removedPoints.size) return true;
        if(addedPoints.size === 0 && removedPoints.size === 0) return false;

        for(const point of addedPoints) {
            if(!removedPoints.has(point)) return true;
        }
        return false;
    }

    /**
     * Adds a marker to the map at the specified point, if it doesn't already exist.
     * @param point The point to display
     * @returns The marker that was displayed or null if nothing was added
     */
    private displayMarker(point: MapPoint): MapMarker | null {
        const markerHash = point.getHashCode();
        let marker = this.markers.get(markerHash);
        if(marker) return null; // Marker already exists

        this.points.add(point);
        marker = new MapMarker(point);
        this.markers.set(markerHash, marker);

        if(point.hasLabel()) {
            marker.bindTooltip(point.getLabel());
        }

        marker.addTo(this.map);
        marker.on('click', () => this.controlChannel.selectPoint(marker!.getMapPoint()));
        return marker;
    }

    /**
     * Removes a marker from the map.
     * @param markerHash The hash of the marker to remove.
     * @returns The point that was removed or null if nothing was removed
     */
    private removeMarker(markerHash: string): MapPoint | null {
        const marker = this.markers.get(markerHash);
        if(!marker) return null; // There was no marker with such hash

        const point = marker.getMapPoint();
        this.points.delete(point);
        this.markers.delete(markerHash);
        marker.remove();
        return point;
    }

    /**
     * Removes all markers that are out of bounds.
     * @param margin The margin to add to the bounds (relative to the map size)
     * @param marginY The margin to add to the bounds (relative to the map size) on the Y axis
     * @param marginX The margin to add to the bounds (relative to the map size) on the X axis
     * @returns The set of points that were removed
     */
    private removeOutOfBoundsMarkers(): Set<MapPoint>;
    private removeOutOfBoundsMarkers(margin: number): Set<MapPoint>;
    private removeOutOfBoundsMarkers(margin: readonly [number, number]): Set<MapPoint>;
    private removeOutOfBoundsMarkers(marginY?: number, marginX?: number): Set<MapPoint>;
    private removeOutOfBoundsMarkers(marginY?: number | readonly [number, number], marginX?: number): Set<MapPoint> {
        if(typeof marginY === 'number' || marginY === undefined) {
            marginY ??= 0;
            marginX ??= marginY;
        } else {
            marginX = marginY[1];
            marginY = marginY[0];
        }

        const bounds = this.map.getBounds();
        const marginBounds = this.makeMarginBounds(bounds, marginY, marginX);

        const removedPoints = new Set<MapPoint>();
        for(const [markerHash, marker] of this.markers) {
            const coords = marker.getLatLng();
            if(!marginBounds.contains(coords)) {
                this.removeMarker(markerHash);
                removedPoints.add(marker.getMapPoint());
            }
        }
        return removedPoints;
    }

    /**
     * Extends the bounds by the specified relative margin.
     * @param bounds The bounds to extend
     * @param margin How much to extend the bounds (relative to the map size) on both axes
     * @param marginY How much to extend the bounds (relative to the map size) on the Y axis
     * @param marginX How much to extend the bounds (relative to the map size) on the X axis
     */
    private makeMarginBounds(bounds: L.LatLngBounds, margin: number): L.LatLngBounds;
    private makeMarginBounds(bounds: L.LatLngBounds, margin: readonly [number, number]): L.LatLngBounds;
    private makeMarginBounds(bounds: L.LatLngBounds, marginY: number, marginX: number): L.LatLngBounds;
    private makeMarginBounds(bounds: L.LatLngBounds, marginY: number | readonly [number, number], marginX?: number): L.LatLngBounds {
        if(typeof marginY === 'number') {
            marginX ??= marginY;
        } else {
            marginX = marginY[1];
            marginY = marginY[0];
        }

        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();
        const height = bounds.getNorth() - bounds.getSouth();
        const width = bounds.getEast() - bounds.getWest();
        marginY *= height;
        marginX *= width;

        const marginBounds = L.latLngBounds(
            [sw.lat - marginY, sw.lng - marginX],
            [ne.lat + marginY, ne.lng + marginX]
        );

        return marginBounds;
    }
}

export default MapController;