import type { Coords } from "@/components/Map";
import { useQuery } from "@tanstack/react-query";
import { getNerbyRestaurants } from "@/api/RestaurantAPI";
import { Eye } from "lucide-react";
import { usePosition } from "@/hooks/usePosition";

export default function Restaurants() {
  const { position } = usePosition();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['nerbyRestaurants', position],
    queryFn: () => getNerbyRestaurants({ position: position as Coords }),
    enabled: !!position
  });

  if (isError) return <p>Error al cargar el contenido :/</p>
  if (isLoading) return <p>Cargando...</p>
  if (data) return (
    <div className="h-full w-2/3 mx-auto my-10">
      <h1 className="font-bold text-3xl">Algunos Restaurantes Cerca de Ti</h1>

      <div className="space-y-5 mt-5">
        {data.map((restaurant) => (
          <div
            key={restaurant._id}
            className="bg-white rounded-xl overflow-hidden p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-100"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <img
                  src={`${import.meta.env.VITE_UPLOADS_URL}/${restaurant.logo}`}
                  alt={`Logo de ${restaurant.name}`}
                  className="object-cover rounded-full w-14 h-14 border-2 border-blue-100"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-gray-800 mb-1">{restaurant.name}</h2>
                  {restaurant.distance && (
                    <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full">
                      {restaurant.distance.toFixed(2)} km
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-2">
                  {restaurant.address || "Dirección no disponible"}
                </p>
                <div className="flex items-center text-sm text-gray-500 gap-2">
                  <Eye className="w-4 h-4" />
                  Ver detalles
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
