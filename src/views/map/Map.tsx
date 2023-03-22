import './Map.scss';
import { MapContainer, TileLayer, ZoomControl, Marker, Popup, AttributionControl } from 'react-leaflet';
import { useEffect, useMemo, useState } from 'react';
import MapController from './MapController';
import MapAdapter from './MapAdapter';
import MapPoint from './MapPoint';

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

function Map() {
    const [map, setMap] = useState<L.Map | null>(null);

    const displayMap = useMemo(
        () => (
            <MapContainer ref={setMap} center={[52.4, 16.9]} zoom={13}
                scrollWheelZoom={true} zoomControl={false} attributionControl={false}>
                <ZoomControl position="topleft" />
                <AttributionControl position="bottomleft" />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxNativeZoom={19} maxZoom={20}
                />
                {/*<Marker position={[52.4, 16.9]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>*/}
            </MapContainer>
        ),
        [],
    );

    useEffect(() => {
        if(map === null) return;

        const controller = new MapController(map, new DummyMapAdapter());
        return () => controller.release();
    }, [map]);

    return (
        <>
            {displayMap}
        </>
    );
}

export default Map;