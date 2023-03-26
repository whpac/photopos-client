import './PoiList.scss';
import { useEffect, useState } from 'react';
import ActionAreaContent from '../actionArea/ActionAreaContent';
import MapPoint from '../map/MapPoint';
import MapPointsListener from '../map/MapPointsListener';
import PoiListItem from './PoiListItem';

type PoiListProps = {
    mapListener?: MapPointsListener;
}

function PoiList({ mapListener }: PoiListProps){
    const [points, setPoints] = useState<MapPoint[]>([]);

    useEffect(() => {
        if(mapListener){
            mapListener.setOnMapPointsChanged((points) => {
                setPoints([...points])
            });
        }
    }, [mapListener]);

    const referencePoint = new MapPoint(52.4, 16.9);
    const itemsList = points.map((point) => {
        return (
            <PoiListItem
                point={point}
                distance={referencePoint.distanceTo(point)}
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