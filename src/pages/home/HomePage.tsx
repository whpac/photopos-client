import './HomePage.scss';
import Map from '../../views/map/Map';
import ActionArea from '../../views/actionArea/ActionArea';

function HomePage () {
    return (
        <div className="home-page--container">
            <div className="home-page--map-box">
                <Map />
            </div>
            <div className="home-page--action-area">
                <ActionArea />
            </div>
        </div>
    );
}

export default HomePage;