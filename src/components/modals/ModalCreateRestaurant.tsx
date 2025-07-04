import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { useForm } from "react-hook-form";
import type { RestaurantForm } from "@/type/restaurantTypes";
import { useState } from "react";
import type { Coords } from "../Map";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "../Modal";
import ErrorMessage from "../ErrorMessage";
import Map from "../Map";
import toast from "react-hot-toast";
import { createRestaurant } from "@/api/RestaurantAPI";

export default function ModalCreateRestaurant() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modal = queryParams.get('createRestaurant')!;
    const open = modal ? true : false;
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [position, setPosition] = useState<Coords | null>(null);
    const [address, setAddress] = useState<string>("");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm<RestaurantForm>();

    const handleCloseModal = () => {
        navigate(location.pathname, { replace: true });
        setPreviewUrl(null);
        reset();
    }

    const { mutate, isPending } = useMutation({
        mutationFn: createRestaurant,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            handleCloseModal();
            queryClient.invalidateQueries({ queryKey: ['getAllRestaurants'] })
        }
    });



    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
    };

    const onSubmit = (formData: RestaurantForm) => {
        if (!position || !address) {
            toast.error('Debe seleccionar al menos una dirección');
            return;
        }

        formData.latitude = position.lat;
        formData.longitude = position.lng;
        formData.address = address;

        mutate(formData);
    }

    return (
        <Modal modal={open} closeModal={() => handleCloseModal()} title="Agregar Restaurante">
            <div className="p-10">
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            {...register("name", {
                                required: "El nombre es requerido",
                                minLength: {
                                    value: 2,
                                    message: "El nombre debe tener al menos 2 caracteres"
                                }
                            })}
                            type="text"
                            placeholder="Nombre del restaurante"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                            autoComplete="off"
                        />
                        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Descripción
                        </label>
                        <input
                            {...register("description", {
                                required: "La descripción es requerida",
                            })}
                            type="text"
                            placeholder="Descripción del restaurante"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                            autoComplete="off"
                        />
                        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Logo
                        </label>
                        <input
                            {...register("logo", {
                                required: "La imagen es requerida",
                                validate: {
                                    size: (files) =>
                                        files[0]?.size < 2 * 1024 * 1024 || "El archivo debe ser menor a 2MB",
                                },
                            })}
                            onChange={handleImageChange}
                            type="file"
                            accept="image/*"
                            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100
                                transition duration-150"
                        />
                        {errors.logo && (
                            <ErrorMessage>

                                {errors.logo.message}
                            </ErrorMessage>
                        )}
                    </div>

                    {previewUrl && (
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <img
                                src={previewUrl}
                                alt="Previsualización"
                                className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow"
                            />
                            <p className="text-sm text-gray-600">Previsualización</p>
                        </div>
                    )}

                    <Map address={address} setAddress={setAddress} position={position} setPosition={setPosition} />


                    <button
                        disabled={isPending}
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 font-bold text-white py-3 rounded-md transition duration-200 uppercase cursor-pointer"
                    >
                        {isPending ? <LoadingSpinner /> : <p>Agregar Restaurante</p>}
                    </button>
                </form>
            </div>
        </Modal>
    )
}
