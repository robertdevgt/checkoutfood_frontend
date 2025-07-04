import { useNavigate } from "react-router-dom"
import ModalCreateRestaurant from "../modals/ModalCreateRestaurant";
import { useQuery } from "@tanstack/react-query";
import { getAllRestaurants } from "@/api/RestaurantAPI";

export default function RestaurantsComponent() {
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['getAllRestaurants'],
    queryFn: getAllRestaurants,
  });

  if (data) return (
    <div>
      <div className="flex justify-between">
        <p className="font-bold text-2xl">Restaurantes</p>

        <button className="bg-blue-500 p-2 text-white font-bold hover:bg-blue-700 cursor-pointer" onClick={() => navigate(location.pathname + '?createRestaurant=true')}>
          Agregar Restaurante
        </button>
      </div>

      <div>
        {data.map(restaurant => (
          <div
            key={restaurant._id}
            className="flex items-center gap-4 p-4 bg-white shadow rounded-lg mt-5"
          >
            <img
              src={`${import.meta.env.VITE_UPLOADS_URL}/${restaurant.logo}`}
              alt={`Logo de ${restaurant.name}`}
              className="object-cover rounded-full w-12 h-12"
            />
            <div>
              <p className="font-semibold text-lg">{restaurant.name}</p>
              <p className="text-gray-600 text-sm">{restaurant.description}</p>
            </div>
          </div>
        ))}
      </div>


      <ModalCreateRestaurant />
    </div>
  )
}
