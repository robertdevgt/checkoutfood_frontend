import { useAppStore } from "@/store";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { ShoppingCart } from "lucide-react";

export default function Header() {
  const logedIn = useAppStore((state) => state.logedIn);
  return (
    <div className="w-full shadow top-0 sticky bg-white z-50 flex justify-between items-center">
      <Logo />

      {logedIn && (
        <nav className="p-10 flex lg:flex-row flex-col">
          <NavLink to={'/profile'}
            className={({ isActive }) =>
              `flex items-center gap-2 transition-colors w-full p-2 ${isActive ? "text-gray-500" : "hover:text-gray-700"}`
            }
          >
            Mi perfil
          </NavLink>

          <NavLink to={'/restaurants'}
            className={({ isActive }) =>
              `flex items-center gap-2 transition-colors w-full p-2 ${isActive ? "text-gray-500" : "hover:text-gray-700"}`
            }
          >
            Restaurantes
          </NavLink>

          <NavLink to={'/cart'}
            className={({ isActive }) =>
              `flex items-center gap-2 transition-colors w-full p-2 ${isActive ? "text-gray-500" : "hover:text-gray-700"}`
            }
          >
            <ShoppingCart />
            Carrito
          </NavLink>
        </nav>
      )}
    </div>
  )
}
