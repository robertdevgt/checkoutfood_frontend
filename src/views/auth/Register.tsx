import 'react-phone-number-input/style.css';
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import type { RegisterForm } from "types/authTypes";
import { createAccount } from "@/api/AuthAPI";
import ErrorMessage from "@/components/ErrorMessage";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";
import PhoneInput from 'react-phone-number-input';


export default function Register() {
    const {
        handleSubmit,
        register,
        watch,
        reset,
        control,
        formState: { errors }
    } = useForm<RegisterForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: createAccount,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
        }
    });

    const onSubmit = (data: RegisterForm) => mutate({ formData: data });
    const password = watch("password");

    return (
        <div className="w-full px-6 py-10 sm:px-10 bg-white rounded-lg shadow-xl">
            <h1 className="font-bold text-3xl text-gray-800 text-center">Crea tu cuenta</h1>

            <form className="space-y-6 mt-8" onSubmit={handleSubmit(onSubmit)}>
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
                        placeholder="Tu nombre"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                        autoComplete="off"
                    />
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        {...register("email", {
                            required: "El email es requerido",
                            pattern: {
                                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: "El formato del email no es válido"
                            }
                        })}
                        type="email"
                        placeholder="Tu email"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                        autoComplete="off"
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>

                <div>
                    <label htmlFor="" className="block text-sm font-medium text-gray-700">
                        Número de teléfono
                    </label>
                    <Controller
                        name='phone'
                        control={control}
                        rules={{ required: 'El número de teléfono es obligatorio' }}
                        render={({ field, fieldState }) => (
                            <div>
                                <PhoneInput
                                    {...field}
                                    placeholder="Ingresa tu número"
                                    onChange={field.onChange}
                                    className='mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none'
                                />
                                {fieldState.error && (
                                    <ErrorMessage>
                                        {fieldState.error.message}
                                    </ErrorMessage>
                                )}
                            </div>
                        )}
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Contraseña
                    </label>
                    <input
                        {...register("password", {
                            required: "La contraseña es requerida",
                            minLength: {
                                value: 8,
                                message: "La contraseña debe tener al menos 8 caracteres"
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                                message: "Debe contener mayúsculas, minúsculas y un número"
                            }
                        })}
                        type="password"
                        placeholder="Tu contraseña"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                        Confirmar Contraseña
                    </label>
                    <input
                        {...register("password_confirmation", {
                            required: "Confirma tu contraseña",
                            validate: value =>
                                value === password || "Las contraseñas no coinciden"
                        })}
                        type="password"
                        placeholder="Confirmación de contraseña"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
                </div>


                <button
                    disabled={isPending}
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-200 uppercase cursor-pointer"
                >
                    {isPending ? <LoadingSpinner /> : <p>Crear Cuenta</p>}
                </button>
            </form>

            <nav className="mt-8 flex flex-col space-y-3 text-sm text-gray-600">
                <Link to="/login" className="text-center hover:underline">
                    ¿Ya tienes una cuenta? Inicia sesión
                </Link>
                <Link to="/forgot-password" className="text-center hover:underline">
                    ¿Olvidaste tu contraseña? Reestablecer
                </Link>
            </nav>

        </div>
    );
}
