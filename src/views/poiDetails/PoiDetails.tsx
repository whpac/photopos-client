import Point from '../../dataModel/entities/Point';
import ActionAreaContent from '../actionArea/ActionAreaContent';
import MapPoint from '../map/MapPoint';

type PoiDetailsProps = {
    point: MapPoint | null;
};

function PoiDetails({ point }: PoiDetailsProps){
    let title: string;

    if ((point as Point).label){
        title = (point as Point).label!;
    } else {
        title = '(Unnamed Point)';
    }

    return (
        <ActionAreaContent title={title}>
            <div>
                Some details here...
            </div>
        </ActionAreaContent>
    );
}

export default PoiDetails;