import './HomePage.scss';
import Map from '../../views/map/Map';
import ActionArea from '../../views/actionArea/ActionArea';
import MapPointsListener from '../../views/map/MapPointsListener';
import MapAdapter from '../../views/map/MapAdapter';
import MapPoint from '../../views/map/MapPoint';

let mapEventListener = new MapPointsListener();
mapEventListener.onMapPointsChanged = (points) => {
    console.log([...points]);
}

class DummyMapAdapter implements MapAdapter {

    async getPoints(latMin: number, latMax: number, lngMin: number, lngMax: number): Promise<MapPoint[]> {
        return [
            new MapPoint(52.4, 16.9),
            new MapPoint(52.3, 17.2),
            new MapPoint(52.5, 17.1),
            new MapPoint(52.6, 16.8),
        ];
    }
}

function HomePage () {
    return (
        <div className="home-page--container">
            <div className="home-page--map-box">
                <Map eventListener={mapEventListener} adapter={new DummyMapAdapter()} />
            </div>
            <div className="home-page--action-area">
                <ActionArea />
            </div>
        </div>
    );
}

export default HomePage;