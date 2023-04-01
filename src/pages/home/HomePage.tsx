import './HomePage.scss';
import Map from '../../views/map/Map';
import ActionArea from '../../views/actionArea/ActionArea';
import StorageMapAdapter from '../../dataModel/mapData/StorageMapAdapter';
import MapControlChannel from '../../views/map/MapControlChannel';
import LocalStorageManager from '../../dataModel/storage/LocalStorageManager';
import RemoteStorageManager from '../../dataModel/storage/RemoteStorageManager';
import HybridStorageManager from '../../dataModel/storage/HybridStorageManager';
import MapPoint from '../../views/map/MapPoint';
import MapFilter from '../../views/map/MapFilter';
import EventListenerSet, { EventListener } from '../../dataModel/EventListenerSet';

// A dummy map filter for testing purposes
class MockMapFilter implements MapFilter {
    onChange: EventListenerSet<MapFilter, null>;
    fireOnChange: EventListener<MapFilter, null>;

    constructor() {
        [this.onChange, this.fireOnChange] = EventListenerSet.create();
    }

    filter(points: MapPoint[]): MapPoint[] {
        return points.filter((point) => point.getLabel() !== 'Test 1');
    }
}

let mapAdapter = new StorageMapAdapter(
    new HybridStorageManager([
        new LocalStorageManager(),
        new RemoteStorageManager()
    ])
);
let mapControlChannel = new MapControlChannel();

mapControlChannel.setMapFilter(new MockMapFilter());

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