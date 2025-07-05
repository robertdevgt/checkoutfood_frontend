import type { Coords } from "@/components/Map";
import { useEffect, useState } from "react";

export const usePosition = () => {
    const [position, setPosition] = useState<Coords | null>(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setPosition({ lat, lng });
                },
                (error) => {
                    console.error("Error obteniendo ubicación:", error);
                }
            );
        }
    }, []);

    return { position }
}