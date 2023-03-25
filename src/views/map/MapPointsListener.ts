import MapPoint from './MapPoint';

class MapPointsListener {

    /**
     * Gets called when the map points are added or removed.
     * @param mapPoints All the map points that are currently in the map.
     */
    public onMapPointsChanged: ((mapPoints: Iterable<MapPoint>) => void) | undefined;

    /**
     * Fires the map points changed event.
     * @param mapPoints All the map points that are currently in the map.
     */
    fireMapPointsChanged(mapPoints: Iterable<MapPoint>): void {
        this.onMapPointsChanged?.(mapPoints);
    }
}

export default MapPointsListener;