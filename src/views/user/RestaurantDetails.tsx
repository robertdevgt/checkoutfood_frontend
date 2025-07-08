import type { Restaurant } from "@/type/restaurantTypes";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { changeProductStatus, getAllRestaurantProducts, getRestaurantById } from "@/api/RestaurantAPI";
import { EditIcon, PlusIcon, SearchIcon, TrashIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState, type ChangeEvent, type FormEvent } from "react";
import ModalAddProduct from "@/components/modals/ModalAddProduct";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Restaurant() {
    const params = useParams<{ id: Restaurant['_id'] }>();
    const id = params.id!!;
    const { data } = useAuth();
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams('');
    const [query, setQuery] = useState<string>(searchParams.get("query") ?? "");


    const queryClient = useQueryClient();

    const { data: restaurant, isLoading, isError } = useQuery({
        queryKey: ['getRestaurantById', id],
        queryFn: () => getRestaurantById({ restaurantId: id }),
    });

    const { data: products } = useQuery({
        queryKey: ['getAllRestaurantProducts', id, searchParams.get("query")],
        queryFn: () => getAllRestaurantProducts({ restaurantId: id, query: searchParams.get("query") ?? '' }),
        placeholderData: keepPreviousData
    });


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

    const { mutate } = useMutation({
        mutationFn: changeProductStatus,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['getAllRestaurantProducts', id] });
        }
    });

    if (isLoading) return <div className="flex justify-center items-center"><LoadingSpinner /></div>;
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

                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products?.map(product => (
                            <div
                                key={product._id}
                                className="bg-white rounded-xl shadow-sm border border-blue-50 p-5 flex flex-col items-center hover:shadow-md transition-all duration-300 hover:border-blue-100 hover:scale-[1.02]"
                            >
                                <img
                                    src={`${import.meta.env.VITE_UPLOADS_URL}/${product.img}`}
                                    alt={`Imagen de ${product.name}`}
                                    className="w-28 h-28 object-cover rounded-lg mb-4 border-2 border-blue-100 p-1"
                                />

                                <div className="text-center space-y-3 w-full">
                                    <h3 className="text-lg font-bold text-blue-800">{product.name}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                                    <p className="text-blue-600 text-xl font-extrabold mt-2">${product.price.toFixed(2)}</p>
                                </div>

                                <div className="flex gap-3 mt-4 w-full justify-center">
                                    <button
                                        onClick={() => mutate({ productId: product._id })}
                                        className={`py-2 px-3 rounded-lg font-bold text-xs uppercase tracking-wide transition-colors ${product.status
                                            ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                            }`}
                                    >
                                        {product.status ? 'Disponible' : 'No disponible'}
                                    </button>

                                    <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-lg cursor-pointer transition-colors">
                                        <EditIcon className="w-4 h-4" />
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
