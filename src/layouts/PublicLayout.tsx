import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CartSidebar from "@/components/modals/CartSidebar";
import { useAppStore } from "@/store";

export default function PublicLayout() {
  const open = useAppStore((state) => state.modal);

  return (
    <div className="flex flex-col justify-between h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />

      <CartSidebar isOpen={open}/>
    </div>
  )
}
