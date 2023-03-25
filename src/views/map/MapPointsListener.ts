import MapPoint from './MapPoint';

type OnMapPointsChangedFunc = (mapPoints: Iterable<MapPoint>) => void;

class MapPointsListener {
    /**
     * The last map points that were added or removed.
     * Stored only if there's no handler set.
     */
    protected lastMapPoints: Iterable<MapPoint> | undefined;

    /**
     * Gets called when the map points are added or removed.
     * @param mapPoints All the map points that are currently in the map.
     */
    protected onMapPointsChanged: OnMapPointsChangedFunc | undefined;

    /**
     * Sets the function that is called when the map points are added or removed.
     * If there's pending event, it will be fired immediately.
     * @param handler A function to call when the map points are added or removed.
     */
    setOnMapPointsChanged(handler: OnMapPointsChangedFunc): void {
        this.onMapPointsChanged = handler;
        if(this.lastMapPoints) {
            this.fireMapPointsChanged(this.lastMapPoints);
            this.lastMapPoints = undefined;
        }
    }

    /**
     * Fires the map points changed event.
     * @param mapPoints All the map points that are currently in the map.
     */
    fireMapPointsChanged(mapPoints: Iterable<MapPoint>): void {
        if(this.onMapPointsChanged) {
            this.onMapPointsChanged(mapPoints);
        } else {
            this.lastMapPoints = mapPoints;
        }
    }
}

export default MapPointsListener;