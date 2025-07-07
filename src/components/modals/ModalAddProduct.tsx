import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { ProductForm } from "@/type/productTypes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "../Modal";
import Dropzone from 'react-dropzone';
import ErrorMessage from "../ErrorMessage";
import toast from "react-hot-toast";
import { addProduct } from "@/api/RestaurantAPI";
import type { Restaurant } from "@/type/restaurantTypes";
import LoadingSpinner from "../LoadingSpinner";

const categories = ['food', 'coffes', 'cakes', 'drinks']

export default function ModalAddProduct() {
    const location = useLocation();
    const params = useParams<{ id: Restaurant['_id'] }>();
    const id = params.id!!;
    const queryParams = new URLSearchParams(location.search);
    const modal = queryParams.get('addNewProduct')!;
    const open = modal ? true : false;
    const [img, setImg] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleCloseModal = () => {
        navigate(location.pathname, { replace: true });
    }

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm<ProductForm>();

    const handleImageChange = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setImg(file);

        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
    };

    const { mutate, isPending } = useMutation({
        mutationFn: addProduct,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
            setImg(null);
            handleCloseModal();
            queryClient.invalidateQueries({ queryKey: ['getRestaurantDetailsById', id] })
        }
    });

    const onSubmit = (formData: ProductForm) => {
        if (!img) {
            toast.error('La imagen es requerida');
            return;
        }

        formData.img = img;

        mutate({ product: formData, restaurantId: id });
    }

    return (
        <Modal modal={open} closeModal={() => handleCloseModal()} title="Agregar Producto" width="w-2/3">
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
                            placeholder="Nombre del producto"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                            autoComplete="off"
                        />
                        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            Precio
                        </label>
                        <input
                            {...register("price", {
                                required: "El precio es requerido",
                            })}
                            type="number"
                            placeholder="Precio del producto"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                            autoComplete="off"
                        />
                        {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
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
                            placeholder="Descripción del producto"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                            autoComplete="off"
                        />
                        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Categoría
                        </label>
                        <select
                            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                            {...register("category", {
                                required: "La categoría es requerida",
                            })}

                        >
                            <option value="">--SELECCIONE UN OPCIÓN--</option>
                            {categories.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        {errors.category && <ErrorMessage>{errors.category.message}</ErrorMessage>}
                    </div>

                    <div>
                        <p className="block text-sm font-medium text-gray-700">Imagen del producto: </p>
                        <Dropzone onDrop={(acceptedFiles) => handleImageChange(acceptedFiles)}
                            multiple={false}
                        >
                            {({ getRootProps, getInputProps, isDragActive }) => (
                                <div
                                    {...getRootProps()}
                                    className={`
                                flex flex-col items-center justify-center
                                border-2 border-dashed rounded-xl p-10 transition
                                ${isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-white"}
                                cursor-pointer hover:border-blue-500 hover:bg-blue-50
                                `}
                                >
                                    <input {...getInputProps()} />


                                    {img && previewUrl ? (
                                        <div className="flex flex-col items-center justify-center space-y-2">
                                            <img
                                                src={previewUrl}
                                                alt="Previsualización"
                                                className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow"
                                            />
                                            <p className="text-sm text-gray-600">Previsualización</p>
                                        </div>
                                    ) : (
                                        <p className="text-gray-600 text-sm text-center">
                                            {isDragActive ? "Suelta el archivo aquí" : "Haz clic o arrastra una imagen para subirla"}
                                        </p>

                                    )}



                                </div>
                            )}
                        </Dropzone>
                    </div>

                    <button
                        disabled={isPending}
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 font-bold text-white py-3 rounded-md transition duration-200 uppercase cursor-pointer"
                    >
                        {isPending ? <LoadingSpinner /> : <p>Crear Producto</p>}
                    </button>
                </form>


            </div>
        </Modal >
    )
}
