import { Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function ProtectedLayout() {
    const { data } = useAuth();

    if (data) return (
        <div className="flex flex-col justify-between h-screen">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
