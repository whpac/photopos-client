/**
 * Base class for a map point.
 */
class MapPoint {
    /** The latitude (North - South) */
    public readonly lat: number;
    /** The longitude (East - West) */
    public readonly lng: number;
    /** Not to recalculate the distances on map re-render */
    protected distances: Map<MapPoint, number>;

    constructor(latitude: number, longitude: number) {
        this.lat = latitude;
        this.lng = longitude;
        this.distances = new Map();
    }

    /**
     * Returns a hash code for the point. It's used to compare points as values.
     */
    public getHashCode(): string {
        return `${this.lat};${this.lng}`;
    }

    /**
     * Calculates the distance to another point.
     * Results are cached.
     * @param point The point to calculate the distance to.
     * @returns The distance in kilometers.
     */
    public distanceTo(point: MapPoint): number {
        // Don't recalculate the distance if it's already calculated
        let distance = this.distances.get(point);
        if(distance !== undefined) {
            return distance;
        }

        // Source: https://www.geeksforgeeks.org/program-distance-two-points-earth/
        // Convert coords to radians
        const lng1 = this.lng * Math.PI / 180;
        const lat1 = this.lat * Math.PI / 180;
        const lng2 = point.lng * Math.PI / 180;
        const lat2 = point.lat * Math.PI / 180;

        // Haversine formula
        const dlng = lng2 - lng1;
        const dlat = lat2 - lat1;
        const a = Math.pow(Math.sin(dlat / 2), 2)
            + Math.cos(lat1) * Math.cos(lat2)
            * Math.pow(Math.sin(dlng / 2), 2);
        const c = 2 * Math.asin(Math.sqrt(a));

        // Radius of earth in kilometers
        const R = 6371;
        distance = c * R;
        this.distances.set(point, distance);
        return distance;
    }
}

export default MapPoint;