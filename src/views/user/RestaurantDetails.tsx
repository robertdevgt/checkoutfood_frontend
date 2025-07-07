import type { Restaurant } from "@/type/restaurantTypes";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantDetailsById } from "@/api/RestaurantAPI";
import { EditIcon, PlusIcon, SearchIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import ModalAddProduct from "@/components/modals/ModalAddProduct";

export default function Restaurant() {
    const params = useParams<{ id: Restaurant['_id'] }>();
    const id = params.id!!;
    const { data } = useAuth();
    const navigate = useNavigate();

    const { data: restaurant, isLoading, isError } = useQuery({
        queryKey: ['getRestaurantDetailsById', id],
        queryFn: () => getRestaurantDetailsById({ restaurantId: id }),
    });

    if (isLoading) return <p className="text-center mt-10">Cargando restaurante...</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">Error al cargar restaurante.</p>;

    if (restaurant?.manager != data?._id) {
        navigate('/');
        return;
    }

    if (restaurant && data) return (
        <div>
            <div className="h-32 lg:h-72 overflow-hidden shadow-md bg-[url(/img/banner.webp)]  bg-cover bg-center">
                <div className="lg:p-10 mt-5 lg:mt-10 p-5">
                    <img
                        src={`${import.meta.env.VITE_UPLOADS_URL}/${restaurant.logo}`}
                        alt={`Logo de ${restaurant.name}`}
                        className="object-cover w-12 h-12 lg:w-32 lg:h-32"
                    />
                    <p className="text-white font-bold capitalize text-xl lg:text-3xl">{restaurant.name}</p>
                </div>
            </div>

            <div className="lg:p-20">
                <div className="p-5 flex w-full justify-end">
                    <SearchIcon />
                </div>

                <div className="lg:shadow-xl border-gray-200 space-y-5">
                    <div className="flex justify-between">
                        <h3 className="font-bold text-4xl">Productos:</h3>
                        <button className="flex gap-2 bg-blue-500 text-white p-2 font-bold cursor-pointer hover:bg-blue-600 transition-colors"
                            onClick={() => navigate(location.pathname + '?addNewProduct=true')}
                        >
                            <PlusIcon />
                            <p>Agregar Nuevo Producto</p>
                        </button>
                    </div>

                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {restaurant.products.map(product => (
                            <div
                                key={product._id}
                                className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col items-center hover:shadow-lg transition duration-300"
                            >
                                <img
                                    src={`${import.meta.env.VITE_UPLOADS_URL}/${product.img}`}
                                    alt={`Imagen de ${product.name}`}
                                    className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-xl mb-4"
                                />

                                <div className="text-center space-y-2">
                                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                                    <p className="text-sm text-gray-500">{product.description}</p>
                                    <p className="text-green-600 text-xl font-bold">${product.price.toFixed(2)}</p>
                                </div>

                                <div className="flex gap-2">
                                    <button className="bg-yellow-500 text-white p-2 mt-5 font-bold rounded-xl cursor-pointer hover:bg-yellow-600 transition-colors">
                                        Cambiar Estado
                                    </button>

                                    <button className="bg-blue-500 text-white p-2 mt-5 font-bold rounded-xl cursor-pointer hover:bg-blue-600 transition-colors">
                                        <EditIcon />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ModalAddProduct />
        </div>
    );
}
