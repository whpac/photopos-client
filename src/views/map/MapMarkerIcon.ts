import L from 'leaflet';
import iconBlue from './mapMarkers/blue.png';
import iconGreen from './mapMarkers/green.png';
import shadow from './mapMarkers/shadow.png';

class MapMarkerIcon extends L.Icon {

    constructor(options?: L.IconOptions) {
        options = Object.assign({
            iconUrl: iconBlue,
            shadowUrl: shadow,

            iconSize: [25, 41], // size of the icon
            shadowSize: [41, 41], // size of the shadow
            iconAnchor: [12.5, 41], // point of the icon which will correspond to marker's location
            shadowAnchor: [12.5, 41],  // the same for the shadow
            popupAnchor: [12.5, -45], // point from which the popup should open relative to the iconAnchor
            tooltipAnchor: [12.5, -21] // point from which the tooltip should open relative to the iconAnchor
        }, options);

        super(options ?? { iconUrl: iconBlue });
    }

    static createSelectedIcon(): MapMarkerIcon {
        return new MapMarkerIcon({
            iconUrl: iconGreen
        });
    }

    static createDefaultIcon(): MapMarkerIcon {
        return new MapMarkerIcon();
    }
}

export default MapMarkerIcon;