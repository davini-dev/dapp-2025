"use client"; // Garante que o componente seja renderizado no lado do cliente

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// Tipos para os estados de posição e velocidade
interface Coords {
  latitude: number;
  longitude: number;
  speed: number | null;
  accuracy: number | null;
}

const Map = () => {
  const [position, setPosition] = useState<[number, number]>([
    -23.46207, -46.556279,
  ]); // Estado para posição inicial
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
            setPosition([latitude, longitude]);
            setSpeed(speed);
            setAccuracy(accuracy);
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
      navigator.geolocation.clearWatch(watchId); // Limpa o monitoramento de geolocalização
    };
  }, []);

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
            <p>Velocidade: ({speed} * 3.6).toFixed(2) km/h</p>
            <p>Precisão: {accuracy} metros"</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
