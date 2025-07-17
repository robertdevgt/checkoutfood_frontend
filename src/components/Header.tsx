import { useAppStore } from "@/store";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { ShoppingCart } from "lucide-react";

export default function Header() {
  const logedIn = useAppStore((state) => state.logedIn);
  const changeModal = useAppStore((state) => state.changeModal);

  return (
    <div className="w-full shadow-md top-0 sticky bg-white z-50 flex justify-between items-center px-6 py-3 border-b border-gray-200">
      <Logo />

      <nav className="flex items-center gap-4">
        {logedIn && (
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors px-4 py-2 rounded-md ${isActive
                ? "text-indigo-600 bg-indigo-50"
                : "text-gray-600 hover:text-indigo-600 hover:bg-gray-100"
              }`
            }
          >
            Mi perfil
          </NavLink>
        )}

        <NavLink
          to="/restaurants"
          className={({ isActive }) =>
            `text-sm font-medium transition-colors px-4 py-2 rounded-md ${isActive
              ? "text-indigo-600 bg-indigo-50"
              : "text-gray-600 hover:text-indigo-600 hover:bg-gray-100"
            }`
          }
        >
          Restaurantes
        </NavLink>

        <button
          onClick={changeModal}
          className="relative w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:text-indigo-600 transition"
        >
          <ShoppingCart
            className={`w-5 h-5`}
          />
        </button>
      </nav>
    </div>

  )
}
