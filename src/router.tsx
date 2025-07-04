import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import AuthLayout from "@/layouts/AuthLayout";

const Index = lazy(() => import("@/views/public/Index"));
const Register = lazy(() => import("@/views/auth/Register"));
const ConfirmAccount = lazy(() => import("@/views/auth/ConfirmAccount"));
const RequestConfirmationCode = lazy(() => import("@/views/auth/RequestConfirmationCode"));

export default function Router() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Cargando...</div>}>
                <Routes>
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<Index />} />
                    </Route>

                    <Route element={<AuthLayout />}>
                        <Route path="/register" element={<Register />} />
                        <Route path="/confirm-account" element={<ConfirmAccount />} />
                        <Route path="/request-code" element={<RequestConfirmationCode />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
