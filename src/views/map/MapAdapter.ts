import MapPoint from './MapPoint';

/**
 * Specifies the interface for the map adapter.
 * Provides a way to specify the markers to display on the map.
 */
interface MapAdapter {

    /**
     * Returns an array of points to display on the map.
     * @param viewport The viewport to get the points for. [SW, NE] points
     */
    getPoints(viewport: [MapPoint, MapPoint]): Promise<MapPoint[]>;
}

export default MapAdapter;