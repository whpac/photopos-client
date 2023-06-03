import './HomePage.scss';
import Map from '../../views/map/Map';
import ActionArea from '../../views/actionArea/ActionArea';
import StorageMapAdapter from '../../dataModel/mapData/StorageMapAdapter';
import MapControlChannel from '../../views/map/MapControlChannel';
import Photopos from '../../dataModel/Photopos';
import ForLaterMapFilter from '../../dataModel/mapData/ForLaterMapFilter';

let mapAdapter = new StorageMapAdapter(Photopos.storageManager);
let mapControlChannel = new MapControlChannel();
let mapFilter = new ForLaterMapFilter(Photopos.forLaterPointsList);

mapControlChannel.setMapFilter(mapFilter);

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