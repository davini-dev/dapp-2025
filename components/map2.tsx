"use client"; // Garante que o componente seja renderizado no lado do cliente

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

// Tipos para os estados de posição e velocidade
interface Coords {
  latitude: number;
  longitude: number;
  speed: number | null;
  accuracy: number | null;
}

// Componente de botão de localização que usa o hook useMap
const LocationButton = ({ centerMap }: { centerMap: (mapInstance: any) => void }) => {
  const map = useMap();

  const handleClick = () => {
    centerMap(map);
  };

  return (
    <div className="leaflet-top leaflet-right" style={{ zIndex: 1000 }}>
      <div className="leaflet-control leaflet-bar">
        <button
          onClick={handleClick}
          title="Centralizar no Local Atual"
          style={{
            width: '30px',
            height: '30px',
            lineHeight: '30px',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: 'white',
            border: '2px solid rgba(0,0,0,0.2)',
            borderRadius: '4px',
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Ícone de localização (pode ser substituído por um SVG ou imagem) */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

const Map = () => {
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  const [position, setPosition] = useState<[number, number]>([
    -23.46207, -46.556279,
  ]); // Estado para posição inicial
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    -23.46207, -46.556279,
  ]); // Posição inicial para centralização manual
  const [speed, setSpeed] = useState<number | null>(null); // Estado para velocidade
  const [accuracy, setAccuracy] = useState<number | null>(null); // Estado para precisão

  useEffect(() => {
    let watchId: number;

    // Função para atualizar a localização e velocidade
    const updatePosition = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude, speed, accuracy } = position.coords;
            const newPosition: [number, number] = [latitude, longitude];
            setPosition(newPosition);
            setSpeed(speed);
            setAccuracy(accuracy);
            setInitialPosition(newPosition); // Atualiza a posição inicial para o botão de centralização
          },
          (error) => {
            console.error(error);
          },
          {
            enableHighAccuracy: true,
          },
        );
      } else {
        alert("Geolocalização não suportada pelo seu navegador");
      }
    };

    // Atualiza a posição a cada 5 segundos
    const intervalId = setInterval(updatePosition, 5000);

    // Atualiza a posição logo na montagem do componente
    updatePosition();

    return () => {
      clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
      // Não limpamos o watchId aqui, pois getCurrentPosition não retorna um watchId.
      // A função clearWatch é para watchPosition, que não estamos usando.
    };
  }, []);

  // Função para centralizar o mapa na posição atual
  const centerMap = (mapInstance: any) => {
    if (initialPosition) {
      mapInstance.setView(initialPosition, mapInstance.getZoom());
    }
  };

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{
        height: "70vh",
        width: "90%",
        margin: "auto",
        marginTop: "20px",
      }}
    >
      {/* Adiciona o botão de localização ao mapa */}
      <LocationButton centerMap={centerMap} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          <div>
            <p>
              <strong>Localização Atual:</strong>
            </p>
            <p>Latitude: {position[0]}</p>
            <p>Longitude: {position[1]}</p>
            <p>Velocidade: {speed !== null ? (speed * 3.6).toFixed(2) : 'N/A'} km/h</p>
            <p>Precisão: {accuracy !== null ? accuracy.toFixed(2) : 'N/A'} metros</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
