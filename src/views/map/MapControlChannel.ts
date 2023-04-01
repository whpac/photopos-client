import EventListenerSet, { EventListener } from '../../dataModel/EventListenerSet';
import MapFilter from './MapFilter';
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

    /** The currently active map filter */
    protected mapFilter: MapFilter | null = null;
    /** Represents the mapFilterChanged event */
    public readonly onMapFilterChanged: EventListenerSet<MapControlChannel, MapFilter | null>;
    /** Fires the onMapFilterChanged event */
    protected readonly fireMapFilterChanged: EventListener<MapControlChannel, MapFilter | null>;
    /** A function that gets called when the filter's options are changed */
    protected filterHandler: EventListener<MapFilter, null> | null = null;

    public constructor() {
        [this.onPointSelected, this.firePointSelected] = EventListenerSet.create();
        [this.onMapPointsChanged, this.fireMapPointsChanged] = EventListenerSet.create();
        [this.onMapFilterChanged, this.fireMapFilterChanged] = EventListenerSet.create();
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

    /**
     * Returns the currently active map filter or null if no filter is active.
     */
    public getMapFilter(): MapFilter | null {
        return this.mapFilter;
    }

    /**
     * Sets the filter to be used for filtering map points.
     * @param mapFilter The map filter to set or null to remove the currently active map filter.
     */
    public setMapFilter(mapFilter: MapFilter | null): void {
        this.filterHandler ??= (filter) => this.fireMapFilterChanged(this, filter);

        // Remove the old filter's listener
        // and attach it to the new filter
        this.mapFilter?.onChange.removeListener(this.filterHandler);
        mapFilter?.onChange.addListener(this.filterHandler);

        this.mapFilter = mapFilter;
        this.fireMapFilterChanged(this, mapFilter);
    }
}

export default MapControlChannel;