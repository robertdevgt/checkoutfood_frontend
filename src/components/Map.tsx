import { GoogleMap, Marker, useJsApiLoader, type Libraries } from "@react-google-maps/api";
import { useRef, useEffect, type Dispatch, type SetStateAction } from "react";

const containerStyle = {
    width: "100%",
    height: "400px",
};

export type Coords = {
    lat: number;
    lng: number;
};

const defaultCenter: Coords = { lat: 14.6349, lng: -90.5069 };
const libraries: Libraries = ["places"];

type Props = {
    address: string | null,
    setAddress: Dispatch<SetStateAction<string>>,
    position: Coords | null,
    setPosition: Dispatch<SetStateAction<Coords | null>>;
}

export default function Map({ address, setAddress, position, setPosition }: Props) {
    const mapRef = useRef<google.maps.Map | null>(null);

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_MAPS_API_TOKEN,
        libraries,
    });

    useEffect(() => {
        const fetchLocationAndAddress = async (lat: number, lng: number) => {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_MAPS_API_TOKEN}`
            );
            const data = await response.json();

            if (data.status === "OK" && data.results.length > 0) {
                setAddress(data.results[0].formatted_address);
            } else {
                setAddress("No se encontró la dirección.");
            }
        };

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setPosition({ lat, lng });
                    fetchLocationAndAddress(lat, lng);
                },
                (error) => {
                    console.error("Error obteniendo ubicación:", error);
                }
            );
        }
    }, []);

    const handleClick = async (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setPosition({ lat, lng });

            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_MAPS_API_TOKEN}`
            );
            const data = await response.json();

            if (data.status === "OK" && data.results.length > 0) {
                setAddress(data.results[0].formatted_address);
            } else {
                setAddress("No se encontró la dirección.");
            }
        }
    };

    return isLoaded ? (
        <div className="w-full max-w-4xl mx-auto px-4 py-6">
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={position || defaultCenter}
                    zoom={15}
                    onClick={handleClick}
                    onLoad={(map) => {
                        mapRef.current = map;
                    }}
                >
                    {position && <Marker position={position} />}
                </GoogleMap>
            </div>

            <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Dirección seleccionada:
                </h2>
                <p className="text-gray-600">{address || "No se ha seleccionado una dirección aún."}</p>
            </div>
        </div>
    ) : (
        <div className="w-full text-center py-10 text-gray-500 animate-pulse">
            Cargando mapa...
        </div>
    );
}
