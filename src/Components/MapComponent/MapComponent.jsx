import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Correção para os ícones do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapComponent = () => {
  // Coordenadas de -26.9726617, -53.6404182
  const [coords, setCoords] = useState({ lat: -26.9726617, lon: -53.6404182 });



  return (
    <MapContainer center={[coords.lat, coords.lon]} zoom={17} style={{ height: '400px', width: '100%', }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[coords.lat, coords.lon]}>
        <Popup>
          <b>Moto Bike Tunas</b><br />Av. Cerro Largo - 488
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;