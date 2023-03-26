import './PoiList.scss';
import { useLayoutEffect, useState } from 'react';
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

    useLayoutEffect(() => {
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
            {itemsList.length > 0 ? (
                    <ul className="poi-list">
                        {itemsList}
                    </ul>
                ) : (
                    <div className="poi-list--empty">
                        <p>No places found.</p>
                        <p>Zoom out the map or apply weaker filtering.</p>
                    </div>
                )
            }
        </ActionAreaContent>
    );
}

export default PoiList;