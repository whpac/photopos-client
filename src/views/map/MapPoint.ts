/**
 * Base class for a map point.
 */
class MapPoint {
    /** The latitude (North - South) */
    public readonly lat: number;
    /** The longitude (East - West) */
    public readonly lng: number;

    constructor(latitude: number, longitude: number) {
        this.lat = latitude;
        this.lng = longitude;
    }
}

export default MapPoint;