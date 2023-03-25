import L from 'leaflet';
import MapPoint from './MapPoint';

class MapMarker extends L.Marker {
    protected point: MapPoint;

    constructor(point: MapPoint, options?: L.MarkerOptions) {
        super(point, options);
        this.point = point;
    }

    getMapPoint(): MapPoint {
        return this.point;
    }
}

export default MapMarker;