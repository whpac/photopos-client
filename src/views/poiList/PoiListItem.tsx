import './PoiListItem.scss';
import MapPoint from '../map/MapPoint';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const convertCoords = (point: MapPoint): string => {
    const decimalToDMS = (decimal: number): string => {
        const deg = Math.floor(decimal);
        const min = Math.floor((decimal - deg) * 60);
        const sec = ((decimal - deg - min / 60) * 3600).toLocaleString(undefined, { maximumFractionDigits: 1, minimumFractionDigits: 1});
        return `${deg}° ${min}′ ${sec}″`;
    }
    return `${decimalToDMS(point.lat)} N, ${decimalToDMS(point.lng)} E`;
}

type PoiListItemProps = {
    point: MapPoint;
    distance?: number;
}

function PoiListItem({ point, distance }: PoiListItemProps){
    let title: JSX.Element;
    let coordsOrDistance: JSX.Element;

    if (point.hasLabel()){
        title = (<span className="poi-list-item--title">{point.getLabel()}</span>);
    } else {
        title = (<span className="poi-list-item--title poi-list-item--title__notitle">(Unnamed Point)</span>);
    }

    if (distance !== undefined) {
        coordsOrDistance = (
            <>
                <FontAwesomeIcon
                    className="poi-list-item--location-icon"
                    title="Distance to the point from your location"
                    icon={icon({name: 'ruler', style: 'solid'})} />
                {distance.toLocaleString(undefined, { maximumFractionDigits: 1, minimumFractionDigits: 1})} km
            </>
        );
    } else {
        coordsOrDistance = (
            <>
                <FontAwesomeIcon
                    className="poi-list-item--location-icon"
                    title="Point location on map"
                    icon={icon({name: 'location-dot', style: 'solid'})} />
                {convertCoords(point)}
            </>
        );
    }

    return (
        <li className="poi-list-item">
            <button type="button" className="poi-list-item--button">
                {title}
                <span className="poi-list-item--location">
                    {coordsOrDistance}
                </span>
            </button>
        </li>
    );
}

export default PoiListItem;