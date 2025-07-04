import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { userAddressForm } from "@/type/userTypes";
import { useState } from "react";
import Map, { type Coords } from "../Map";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAddress } from "@/api/UserAPI";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSpinner";
import toast from "react-hot-toast";
import Modal from "../Modal";

export default function ModalAddAddress() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modal = queryParams.get('addAdress')!;
    const open = modal ? true : false;
    const queryClient = useQueryClient();

    const [position, setPosition] = useState<Coords | null>(null);
    const [address, setAddress] = useState<string>("");

    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm<userAddressForm>();

    const handleCloseModal = () => {
        navigate('/profile', { replace: true });
    }

    const { mutate } = useMutation({
        mutationFn: addAddress,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            handleCloseModal();
            reset();
            queryClient.invalidateQueries({ queryKey: ['getAddresses'] })
        }
    });



    const onSubmit = (formData: userAddressForm) => {
        if (!position || !address) {
            toast.error('Debe seleccionar al menos una dirección');
            return;
        }
        formData.formatted_address = address;
        formData.latitude = position.lat;
        formData.longitude = position.lng;

        mutate(formData);
    }

    return (
        <Modal modal={open} closeModal={() => handleCloseModal()} title="Agregar Dirección">
            <div className="p-10">
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="label" className="block text-sm font-medium text-gray-700">
                            ¿Qué dirección es esta?
                        </label>
                        <input
                            {...register("label", {
                                required: "El descripción de la dirección es requerido",
                                minLength: {
                                    value: 2,
                                    message: "El nombre debe tener al menos 2 caracteres"
                                }
                            })}
                            type="text"
                            placeholder="Ej: Trabajo, Casa"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                            autoComplete="off"
                        />
                        {errors.label && <ErrorMessage>{errors.label.message}</ErrorMessage>}
                    </div>

                    <Map address={address} setAddress={setAddress} position={position} setPosition={setPosition} />

                    <button
                        disabled={false}
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-200 uppercase cursor-pointer"
                    >
                        {false ? <LoadingSpinner /> : <p>Agregar Dirección</p>}
                    </button>
                </form>
            </div>
        </Modal>
    )
}
