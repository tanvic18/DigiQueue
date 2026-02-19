"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

interface Props {
  setLocation: (coords: { lat: number; lng: number }) => void;
  selectedCity: string;
}

// ✅ lowercase mapping
const cityCoordinates: Record<string, [number, number]> = {
  mumbai: [19.0760, 72.8777],
  delhi: [28.6139, 77.2090],
  agra: [27.1767, 78.0081],
  jaipur: [26.9124, 75.7873],
  chennai: [13.0827, 80.2707],
  kolkata: [22.5726, 88.3639],
  hyderabad: [17.3850, 78.4867],
  bengaluru: [12.9716, 77.5946],
};

function LocationMarker({ setLocation }: any) {
  const [position, setPosition] = useState<any>(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setLocation({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return position ? <Marker position={position} /> : null;
}

// ✅ This component moves map smoothly
function ChangeMapView({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 12);
  }, [center, map]);

  return null;
}

export default function OSMMap({ setLocation, selectedCity }: Props) {
  const [center, setCenter] = useState<[number, number]>([
    19.0760, 72.8777,
  ]);

  useEffect(() => {
    if (!selectedCity) return;

    const normalizedCity = selectedCity.trim().toLowerCase();

    if (cityCoordinates[normalizedCity]) {
      setCenter(cityCoordinates[normalizedCity]);
    } else {
      console.log("City not found in mapping:", selectedCity);
    }
  }, [selectedCity]);

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ChangeMapView center={center} />

        <LocationMarker setLocation={setLocation} />
      </MapContainer>
    </div>
  );
}