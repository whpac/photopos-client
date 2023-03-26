import MapPoint from './MapPoint';

type OnMapPointsChangedFunc = (mapPoints: Iterable<MapPoint>) => void;
type OnMapPointClickedFunc = (mapPoint: MapPoint) => void;

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
     * Gets called when a map point is clicked.
     * @param mapPoint The map point that was clicked.
     */
    protected onMapPointClicked: OnMapPointClickedFunc | undefined;

    /**
     * Sets the function that is called when the map points are added or removed.
     * If there's pending event, it will be fired immediately.
     * @param handler A function to call when the map points are added or removed.
     */
    setOnMapPointsChanged(handler: OnMapPointsChangedFunc): void {
        this.onMapPointsChanged = handler;
        if(this.lastMapPoints) {
            this.fireMapPointsChanged(this.lastMapPoints);
        }
    }

    /**
     * Sets the function that is called when a map point is clicked.
     * @param handler A function to call when a map point is clicked.
     */
    setOnMapPointClicked(handler: OnMapPointClickedFunc): void {
        this.onMapPointClicked = handler;
    }

    /**
     * Fires the map points changed event.
     * @param mapPoints All the map points that are currently in the map.
     */
    fireMapPointsChanged(mapPoints: Iterable<MapPoint>): void {
        this.onMapPointsChanged?.(mapPoints);
        this.lastMapPoints = mapPoints;
    }

    /**
     * Fires the map point clicked event.
     * @param mapPoint The map point that was clicked.
     */
    fireMapPointClicked(mapPoint: MapPoint): void {
        this.onMapPointClicked?.(mapPoint);
    }
}

export default MapPointsListener;