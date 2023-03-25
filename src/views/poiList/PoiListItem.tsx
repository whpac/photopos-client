import './PoiListItem.scss';
import MapPoint from '../map/MapPoint';

type PoiListItemProps = {
    point: MapPoint;
}

function PoiListItem({ point }: PoiListItemProps){
    return (
        <li className="poi-list-item">
            <button type="button" className="poi-list-item--button">
                ({point.lat}, {point.lng})
            </button>
        </li>
    );
}

export default PoiListItem;