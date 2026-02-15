"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { supabase } from "@/lib/supabase";

interface ThreatPoint {
    id: number;
    lat: number;
    lng: number;
    type: string;
    description: string;
}

// Mock initial data for Tunisia
const INITIAL_THREATS: ThreatPoint[] = [
    { id: 1, lat: 36.8065, lng: 10.1815, type: "SMS", description: "Fake Tunisian Post SMS" },
    { id: 2, lat: 35.8256, lng: 10.6084, type: "Phishing", description: "Bank login clone" },
    { id: 3, lat: 34.7406, lng: 10.7603, type: "QR", description: "Malicious QR on cafe menu" },
];

export default function Map() {
    const [threats, setThreats] = useState<ThreatPoint[]>(INITIAL_THREATS);

    useEffect(() => {
        // Subscribe to new reports
        const channel = supabase
            .channel("public:reports")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "reports" },
                (payload) => {
                    const newThreat = payload.new as ThreatPoint;
                    setThreats((prev) => [...prev, newThreat]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <MapContainer
            center={[34.0, 9.0] as [number, number]} // Center of Tunisia roughly
            zoom={7}
            scrollWheelZoom={true}
            className="h-[600px] w-full rounded-xl z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {threats.map((threat) => (
                <Marker key={threat.id} position={[threat.lat, threat.lng]}>
                    <Popup>
                        <div className="text-black">
                            <strong>{threat.type} Attack</strong>
                            <br />
                            {threat.description}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
