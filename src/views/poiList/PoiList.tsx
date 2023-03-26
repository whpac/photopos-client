import './PoiList.scss';
import { useEffect, useState } from 'react';
import ActionAreaContent from '../actionArea/ActionAreaContent';
import MapPoint from '../map/MapPoint';
import MapPointsListener from '../map/MapPointsListener';
import PoiListItem from './PoiListItem';

type PoiListProps = {
    mapListener?: MapPointsListener;
    referencePoint?: MapPoint;
}

function PoiList({ mapListener, referencePoint }: PoiListProps){
    const [points, setPoints] = useState<MapPoint[]>([]);

    useEffect(() => {
        if(mapListener){
            let comparer: (a: MapPoint, b: MapPoint) => number;
            if(referencePoint === undefined){
                // From north to south, then from west to east
                comparer = (a, b) => (b.lat - a.lat) || (a.lng - b.lng);
            }else{
                comparer = (a, b) => referencePoint.distanceTo(a) - referencePoint.distanceTo(b);
            }

            mapListener.setOnMapPointsChanged((points) => {
                setPoints([...points].sort(comparer))
            });
        }
    }, [mapListener, referencePoint]);

    const itemsList = points.map((point) => {
        return (
            <PoiListItem
                point={point}
                distance={referencePoint?.distanceTo(point)}
                key={point.getHashCode()} />
        )
    });

    return (
        <ActionAreaContent title="Nearby">
            <ul className="poi-list">
                {itemsList}
            </ul>
        </ActionAreaContent>
    );
}

export default PoiList;