import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import AuthenticationLayout from "@/layouts/AuthenticationLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";

const Index = lazy(() => import("@/views/public/Index"));
const Restaurants = lazy(() => import("@/views/public/Restaurants"));
const Restaurant = lazy(() => import("@/views/public/Restaurant"));

const Register = lazy(() => import("@/views/auth/Register"));
const ConfirmAccount = lazy(() => import("@/views/auth/ConfirmAccount"));
const RequestConfirmationCode = lazy(() => import("@/views/auth/RequestConfirmationCode"));
const Login = lazy(() => import("@/views/auth/Login"));

const Profile = lazy(() => import("@/views/user/Profile"));
const RestaurantDetails = lazy(() => import("@/views/user/RestaurantDetails"));

export default function Router() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Cargando...</div>}>
                <Routes>
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<Index />} />
                        <Route path="/restaurants" element={<Restaurants />} />
                        <Route path="/restaurants/:id" element={<Restaurant />} />
                    </Route>

                    <Route element={<AuthenticationLayout />}>
                        <Route path="/register" element={<Register />} />
                        <Route path="/confirm-account" element={<ConfirmAccount />} />
                        <Route path="/request-code" element={<RequestConfirmationCode />} />
                        <Route path="/login" element={<Login />} />
                    </Route>

                    <Route element={<ProtectedLayout />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/restaurant/administrate/:id" element={<RestaurantDetails />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
