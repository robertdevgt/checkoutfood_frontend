import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@/components/ErrorMessage";
import { requestNewConfirmationCode } from "@/api/AuthAPI";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RequestConfirmationCode() {
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<{ email: string }>();

    const { mutate, isPending } = useMutation({
        mutationFn: requestNewConfirmationCode,
        onError: (error) => {
            toast.error(error.message);
            setIsDisabled(true);
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
        }
    });

    const onSubmit = (formData: { email: string }) => {
        mutate(formData.email);
    }
    return (
        <>
            <h1 className="text-2xl font-semibold text-center text-gray-800 max-w-md">
                Solicitar Código
            </h1>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        {...register("email", {
                            required: "El email es requerido",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                        type="text"
                        placeholder="Tu email"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                        autoComplete="off"
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>

                <button type="submit" disabled={isPending || isDisabled} className={`${isDisabled ? 'opacity-30 cursor-not-allowed' : ' cursor-pointer hover:bg-blue-800'} bg-blue-500 text-white font-bold p-2 rounded  transition-colors w-full`}>
                    {isPending ? <p>Cargando...</p> : <p>Enviar instrucciones</p>}
                </button>
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to={'/register'}
                    className="text-center  font-normal"
                >
                    ¿Aún no tienes una cuenta? Crea Una
                </Link>

                <Link
                    to={'/login'}
                    className="text-center  font-normal"
                >
                    ¿Ya tienes una cuenta? Inicia sesión
                </Link>
            </nav>
        </>
    )
}
