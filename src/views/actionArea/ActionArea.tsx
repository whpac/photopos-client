import './ActionArea.scss';
import PoiList from '../poiList/PoiList';
import ActionAreaMenu from './ActionAreaMenu';

function ActionArea(){
    return (
        <div className="action-area">
            <div className="action-area--content">
                <PoiList />
            </div>
            <div className="action-area--menu">
                <ActionAreaMenu />
            </div>
        </div>
    );
}

export default ActionArea;