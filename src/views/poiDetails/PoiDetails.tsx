import ActionAreaContent from '../actionArea/ActionAreaContent';
import MapPoint from '../map/MapPoint';

type PoiDetailsProps = {
    point: MapPoint | null;
};

function PoiDetails({ point }: PoiDetailsProps){
    let title: string;

    if (point?.hasLabel()){
        title = point.getLabel();
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