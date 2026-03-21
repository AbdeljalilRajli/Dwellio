import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Fix for default marker icon issues with Vite/Webpack
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIconRetina,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Gold Icon for Dwellio branding
const GoldIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: #7C5C44; width: 32px; height: 32px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; items-center; justify-center; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
            <div style="width: 10px; height: 10px; background-color: white; border-radius: 50%; transform: rotate(45deg);"></div>
          </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

interface PropertyMapProps {
    latitude?: number;
    longitude?: number;
    address: string;
    city: string;
}

const CITY_COORDS: Record<string, [number, number]> = {
    'Marrakech': [31.6295, -7.9811],
    'Casablanca': [33.5731, -7.5898],
    'Rabat': [34.0209, -6.8416],
    'Tangier': [35.7595, -5.8340],
    'Agadir': [30.4278, -9.5981],
    'Essaouira': [31.5085, -9.7595],
    'Fes': [34.0331, -5.0003]
};

// Component to handle map view updates when props change
function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 14);
    }, [center, map]);
    return null;
}

export function PropertyMap({ latitude, longitude, address, city }: PropertyMapProps) {
    const defaultCenter = CITY_COORDS[city] || [31.6295, -7.9811]; // Default to Marrakech
    const center: [number, number] = latitude && longitude ? [latitude, longitude] : defaultCenter;

    return (
        <div className="h-full w-full rounded-2xl overflow-hidden relative group">
            <MapContainer 
                center={center} 
                zoom={14} 
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%', zIndex: 0 }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={center} icon={GoldIcon}>
                    <Popup className="custom-popup">
                        <div className="p-1">
                            <p className="font-bold text-brand-primary mb-1">{address}</p>
                            <p className="text-xs text-brand-accent">{city}, Morocco</p>
                        </div>
                    </Popup>
                </Marker>
                <ChangeView center={center} />
            </MapContainer>
            
            {/* Overlay for better integration */}
            <div className="absolute inset-0 pointer-events-none border-2 border-[#EDE0D5] rounded-2xl z-[1000] group-hover:border-[#7C5C44]/20 transition-colors" />
        </div>
    );
}
