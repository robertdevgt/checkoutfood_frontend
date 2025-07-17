import type { LoginForm } from "@/type/authTypes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import toast from "react-hot-toast";
import { useAppStore } from "@/store";

export default function Login() {

  const location = useLocation();
  const previousPath = location.state;

  const login = useAppStore((state) => state.login);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue
  } = useForm<LoginForm>();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onError: (error) => {
      toast.error(error.message);
      setValue('password', '');
    },
    onSuccess: () => {
      if (previousPath) {
        navigate(previousPath);
      } else {
        navigate('/')
      }
    }
  });

  const onSubmit = (formData: LoginForm) => mutate(formData);

  return (
    <div className="w-full px-6 py-10 sm:px-10 bg-white rounded-lg shadow-xl">
      <h1 className="font-bold text-3xl text-gray-800 text-center">Inicia sesión</h1>

      <form className="space-y-6 mt-8" onSubmit={handleSubmit(onSubmit)}>
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
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            {...register("password", {
              required: "La contraseña es requerida",
            })}
            type="password"
            placeholder="Tu contraseña"
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
            autoComplete="off"
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <button
          disabled={isPending}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-200 uppercase cursor-pointer"
        >
          {isPending ? <LoadingSpinner /> : <p>Inciar Sesión</p>}
        </button>
      </form>

      <nav className="mt-8 flex flex-col space-y-3 text-sm text-gray-600">
        <Link to="/register" className="text-center hover:underline">
          ¿Aún no tienes una cuenta? Crea una
        </Link>
        <Link to="/forgot-password" className="text-center hover:underline">
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>

    </div>
  )
}
