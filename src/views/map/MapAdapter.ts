import MapPoint from './MapPoint';

/**
 * Specifies the interface for the map adapter.
 * Provides a way to specify the markers to display on the map.
 */
interface MapAdapter {

    /**
     * Returns an array of points to display on the map.
     * @param latMin The minimum latitude of the bounding box
     * @param latMax The maximum latitude of the bounding box
     * @param lngMin The minimum longitude of the bounding box
     * @param lngMax The maximum longitude of the bounding box
     */
    getPoints(latMin: number, latMax: number, lngMin: number, lngMax: number): Promise<MapPoint[]>;
}

export default MapAdapter;