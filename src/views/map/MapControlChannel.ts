import EventListenerSet, { EventListener } from '../../dataModel/EventListenerSet';
import MapPoint from './MapPoint';

class MapControlChannel {

    /** Currently selected point */
    protected selectedPoint: MapPoint | null = null;
    /** Represents the pointSelected event */
    public readonly onPointSelected: EventListenerSet<MapControlChannel, MapPoint | null>;
    /** Fires the onPointSelected event */
    protected readonly firePointSelected: EventListener<MapControlChannel, MapPoint | null>;

    /** Points currently on the map */
    protected mapPoints: Iterable<MapPoint> = [];
    /** Represents the mapPointsChanged event */
    public readonly onMapPointsChanged: EventListenerSet<MapControlChannel, Iterable<MapPoint>>;
    /** Fires the onMapPointsChanged event */
    protected readonly fireMapPointsChanged: EventListener<MapControlChannel, Iterable<MapPoint>>;

    public constructor() {
        [this.onPointSelected, this.firePointSelected] = EventListenerSet.create();
        [this.onMapPointsChanged, this.fireMapPointsChanged] = EventListenerSet.create();
    }

    /**
     * Gets the currently selected point or null if nothing is selected.
     */
    public getSelectedPoint(): MapPoint | null {
        return this.selectedPoint;
    }

    /**
     * Selects a point.
     * @param point The point to select or null to deselect the currently selected point.
     */
    public selectPoint(point: MapPoint | null): void {
        this.selectedPoint = point;
        this.firePointSelected(this, point);
    }

    /**
     * Returns map points.
     */
    public getMapPoints(): Iterable<MapPoint> {
        return this.mapPoints;
    }

    /**
     * Saves map points currently on the map.
     * @param mapPoints The map points currently on the map.
     */
    public setMapPoints(mapPoints: Iterable<MapPoint>): void {
        this.mapPoints = mapPoints;
        this.fireMapPointsChanged(this, mapPoints);
    }
}

export default MapControlChannel;