import './Map.scss'
import { MapContainer, TileLayer, ZoomControl, Marker, Popup, AttributionControl } from 'react-leaflet'

function Map(){
    return (
        <MapContainer center={[52.4, 16.9]} zoom={13} scrollWheelZoom={true} zoomControl={false} attributionControl={false}>
            <ZoomControl position="topleft" />
            <AttributionControl position="bottomleft" />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {<Marker position={[52.4, 16.9]}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>}
        </MapContainer>
    );
}

export default Map;