import { Outlet } from "react-router-dom";
import Logo from "@/components/Logo";

export default function AuthLayout() {
    return (
        <div className="h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-100">
            <div className="flex items-center justify-center p-6 shadow-lg">
                <div className="w-full max-w-md space-y-6">
                    <Outlet />
                </div>
            </div>

            <div className="relative hidden md:block overflow-hidden">
                <div className="absolute inset-0 bg-blue-600 opacity-90" />
                <div className="relative h-full w-full flex items-center justify-center px-10 space-x-5">
                    <h2 className="text-white text-4xl font-bold leading-tight text-center">
                        Bienvenido a
                    </h2>
                    <div className="bg-white">
                        <Logo />

                    </div>
                </div>
            </div>
        </div>
    );
}
