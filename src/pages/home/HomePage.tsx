import './HomePage.scss';
import Map from '../../views/map/Map';
import ActionArea from '../../views/actionArea/ActionArea';
import Photopos from '../../dataModel/Photopos';

function HomePage() {
    return (
        <div className="home-page--container">
            <div className="home-page--map-box">
                <Map adapter={Photopos.mapAdapter} mapControlChannel={Photopos.mapControlChannel} />
            </div>
            <div className="home-page--action-area">
                <ActionArea mapControlChannel={Photopos.mapControlChannel} mapFilter={Photopos.mapFilter} />
            </div>
        </div>
    );
}

export default HomePage;