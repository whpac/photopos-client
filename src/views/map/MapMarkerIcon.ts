import L from 'leaflet';
import iconBlue from './mapMarkers/blue.png';
import iconGreen from './mapMarkers/green.png';
import shadow from './mapMarkers/shadow.png';

class MapMarkerIcon extends L.Icon {

    /** The default blue icon */
    public static readonly DEFAULT_ICON = new MapMarkerIcon();

    /** The green icon for a selected pin */
    public static readonly SELECTED_ICON = new MapMarkerIcon({
        iconUrl: iconGreen
    });

    protected constructor(options?: L.IconOptions) {
        // Merge options with default options
        options = Object.assign({
            iconUrl: iconBlue,
            shadowUrl: shadow,

            iconSize: [25, 41],
            shadowSize: [41, 41],
            iconAnchor: [12.5, 41],
            shadowAnchor: [12.5, 41],
            popupAnchor: [12.5, -45],
            tooltipAnchor: [12.5, -21]
        }, options);

        super(options ?? { iconUrl: iconBlue });
    }
}

export default MapMarkerIcon;