import './HomePage.scss';
import Map from '../../views/map/Map';
import ActionArea from '../../views/actionArea/ActionArea';
import StorageMapAdapter from '../../dataModel/mapData/StorageMapAdapter';
import LocalStorageManager from '../../dataModel/storage/LocalStorageManager';
import MapControlChannel from '../../views/map/MapControlChannel';

let mapAdapter = new StorageMapAdapter(
    new LocalStorageManager()
);
let mapControlChannel = new MapControlChannel();

function HomePage() {
    return (
        <div className="home-page--container">
            <div className="home-page--map-box">
                <Map adapter={mapAdapter} mapControlChannel={mapControlChannel} />
            </div>
            <div className="home-page--action-area">
                <ActionArea mapControlChannel={mapControlChannel} />
            </div>
        </div>
    );
}

export default HomePage;