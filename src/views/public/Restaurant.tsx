import type { Restaurant } from "@/type/restaurantTypes";
import { useParams, useSearchParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAvailableRestaurantProducts, getRestaurantById } from "@/api/RestaurantAPI";
import { SearchIcon, TrashIcon } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAppStore } from "@/store";

export default function Restaurant() {
    const params = useParams<{ id: Restaurant['_id'] }>();
    const id = params.id!!;

    const addToCart = useAppStore((state) => state.addToCart);

    const { data: restaurant, isLoading, isError } = useQuery({
        queryKey: ['getRestaurantById', id],
        queryFn: () => getRestaurantById({ restaurantId: id }),
    });

    const [searchParams, setSearchParams] = useSearchParams('');
    const [query, setQuery] = useState<string>(searchParams.get("query") ?? "");


    const handleSearchItem = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    const handleSetFilters = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchParams(query ? { query } : {});
    }

    const handleClearFilters = () => {
        setSearchParams({});
        setQuery('');
    }

    const { data: products, isLoading: isLoadingProducts, isFetching } = useQuery({
        queryKey: ['getAvailableRestaurantProducts', id, searchParams.get("query")],
        queryFn: () => getAvailableRestaurantProducts({ restaurantId: id, query: searchParams.get("query") ?? '' }),
        placeholderData: keepPreviousData
    });


    if (isLoading) return <p className="text-center mt-10">Cargando restaurante...</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">Error al cargar restaurante.</p>;



    if (restaurant) return (
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

                <div className="p-5 flex w-full justify-end items-center gap-4 bg-white rounded-md">
                    <form className="flex items-center gap-2" onSubmit={(e) => handleSetFilters(e)}>
                        <div className="flex items-center gap-3 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 shadow transition-all focus-within:ring-2 focus-within:ring-blue-400">
                            <input
                                onChange={handleSearchItem}
                                value={query}
                                type="text"
                                placeholder="Buscar..."
                                className="w-80 bg-transparent outline-none border-none text-gray-700 placeholder-gray-400"
                            />
                            <TrashIcon className="text-gray-400 hover:text-red-500 cursor-pointer transition" onClick={() => handleClearFilters()} />
                        </div>

                        <button type="submit">
                            <SearchIcon
                                className="text-gray-600 hover:text-blue-600 cursor-pointer transition-transform duration-200 hover:scale-110"
                            />
                        </button>
                    </form>
                </div>

                <div className="border-gray-200 space-y-5">
                    <h3 className="font-bold text-4xl">Productos:</h3>
                    {(isLoadingProducts || isFetching) && <LoadingSpinner />}
                    {products?.length === 0 ? (
                        <p className="text-center">No hay productos</p>
                    ) : (
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products?.map(product => (
                                <div
                                    key={product._id}
                                    className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col items-center hover:shadow-lg transition duration-300 hover:scale-[1.02]"
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

                                    <button onClick={() => addToCart(product)} className="bg-blue-500 text-white p-2 mt-5 font-bold rounded-xl cursor-pointer hover:bg-blue-600 transition-colors">
                                        Agregar al Carrito
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
