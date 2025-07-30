"use client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const customIcon = L.icon({
  iconUrl: "/location-pin.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const locations = [
  {
    position: [43.75494581246912, 20.103530609092356],
    text: "Put 22. avgusta bb",
  },
  {
    position: [44.815026143511375, 20.463435855168104],
    text: "Nušićeva br. 19",
  },
  {
    position: [44.75075466162658, 20.585066355165218],
    text: "Smederevski put 39a",
  },
  {
    position: [45.240220262449235, 19.82469672635041],
    text: "Bulevar Evrope br. 2",
  },
  {
    position: [45.25529839038944, 19.83851765518693],
    text: "Pavla Papa br. 22",
  },
];

export default function Map() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <MapContainer
      center={[44.52727658035047, 20.57307492964115]}
      zoom={8}
      style={{
        width: "100%",
      }}
      className="h-[500px] z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => (
        <Marker key={index} position={location.position} icon={customIcon}>
          <Popup>{location.text}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
