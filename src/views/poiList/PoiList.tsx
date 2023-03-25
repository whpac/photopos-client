import { useEffect, useState } from 'react';
import ActionAreaContent from '../actionArea/ActionAreaContent';
import MapPoint from '../map/MapPoint';
import MapPointsListener from '../map/MapPointsListener';

type PoiListProps = {
    mapListener?: MapPointsListener;
}

function PoiList({ mapListener }: PoiListProps){
    const [points, setPoints] = useState<MapPoint[]>([]);

    useEffect(() => {
        if(mapListener){
            mapListener.onMapPointsChanged = (points) => {
                setPoints([...points])
            }
        }
    }, [mapListener]);

    const itemsList = points.map((point, index) => {
        return <li key={point.getHashCode()}>#{index}. ({point.lat}, {point.lng})</li>
    });

    return (
        <ActionAreaContent title="Nearby">
            <ul>
                {itemsList}
            </ul>
        </ActionAreaContent>
    );
}

export default PoiList;