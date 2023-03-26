import './HomePage.scss';
import Map from '../../views/map/Map';
import ActionArea from '../../views/actionArea/ActionArea';
import MapPointsListener from '../../views/map/MapPointsListener';
import StorageMapAdapter from '../../dataModel/mapData/StorageMapAdapter';
import LocalStorageManager from '../../dataModel/storage/LocalStorageManager';

let mapEventListener = new MapPointsListener();
let mapAdapter = new StorageMapAdapter(
    new LocalStorageManager()
);

function HomePage() {
    return (
        <div className="home-page--container">
            <div className="home-page--map-box">
                <Map eventListener={mapEventListener} adapter={mapAdapter} />
            </div>
            <div className="home-page--action-area">
                <ActionArea mapListener={mapEventListener} />
            </div>
        </div>
    );
}

export default HomePage;