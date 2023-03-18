import './HomePage.scss';
import Map from '../../views/map/Map';
import PoiList from '../../views/poiList/PoiList';

function HomePage () {
    return (
        <div className="home-page--container">
            <div className="home-page--map-box">
                <Map />
            </div>
            <div className="home-page--poi-list-box">
                <PoiList />
            </div>
        </div>
    );
}

export default HomePage;