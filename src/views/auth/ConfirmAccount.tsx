import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@/api/AuthAPI";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ConfirmAccount() {
    const [token, setToken] = useState<string>();
    const [shake, setShake] = useState<boolean>(false);
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message);
            setShake(true);
            setTimeout(() => setShake(false), 4000);
            setToken('');
        },
        onSuccess: (data) => {
            toast.success(data);
            navigate('/login');
        }
    });

    const handleChange = (token: string) => {
        setToken(token);
    }

    const handleComplete = (token: string) => {
        mutate(token);
    }

    return (
        <div className="flex flex-col items-center justify-center gap-8 px-4 py-10">
            <h1 className="text-2xl font-semibold text-center text-gray-800 max-w-md">
                Confirma tu cuenta ingresando el código que te enviamos por correo
            </h1>

            <div className="flex gap-3">
                <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                    {[...Array(6)].map((_, i) => (
                        <PinInputField
                            key={i}
                            className={`${shake ? 'animate-shake border-red-500' : ''} w-12 h-14 text-xl text-center border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 bg-white text-gray-900`}
                        />
                    ))}
                </PinInput>
            </div>

            <Link to={'/request-code'} className="hover:text-gray-500">
                Solicitar otro código
            </Link>
        </div>
    )
}
