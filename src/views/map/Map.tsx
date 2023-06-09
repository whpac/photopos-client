import './Map.scss';
import { MapContainer, TileLayer, ZoomControl, AttributionControl } from 'react-leaflet';
import { useEffect, useMemo, useState } from 'react';
import MapController from './MapController';
import MapAdapter from './MapAdapter';
import MapControlChannel from './MapControlChannel';

type MapProps = {
    adapter: MapAdapter;
    mapControlChannel: MapControlChannel;
};

function Map({ adapter, mapControlChannel }: MapProps) {
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
            </MapContainer>
        ),
        [],
    );

    useEffect(() => {
        if(map === null) return;

        const controller = new MapController(map, adapter, mapControlChannel);

        return () => controller.release();
    }, [map, adapter, mapControlChannel]);

    return (
        <>
            {displayMap}
        </>
    );
}

export default Map;