import L from 'leaflet';
import MapPoint from './MapPoint';
import MapMarkerIcon from './MapMarkerIcon';

class MapMarker extends L.Marker {
    protected point: MapPoint;

    constructor(point: MapPoint, options?: L.MarkerOptions) {
        super(point, options);
        this.point = point;
        this.setIcon(MapMarkerIcon.DEFAULT_ICON);
    }

    getMapPoint(): MapPoint {
        return this.point;
    }
}

export default MapMarker;