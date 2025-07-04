import { useAuth } from "@/hooks/useAuth";
import { useAppStore } from "@/store";
import { UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddressesComponent from "@/components/user/AddressesComponent";
import ProfileComponent from "@/components/user/ProfileComponent";

const Components: { [key: number]: React.ReactElement } = {
  1: <ProfileComponent />,
  2: <AddressesComponent />
}

export default function Profile() {

  const [component, setComponent] = useState<number>(1);
  const navigate = useNavigate();

  const logout = useAppStore((state) => state.logout);
  const { data } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!data) return null;

  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full grid md:grid-cols-3">
        <aside className="bg-blue-100 rounded-l-2xl p-6 flex flex-col items-center space-y-4">
          <UserIcon className="w-20 h-20 text-blue-600" />
          <h2 className="text-xl font-semibold text-blue-800">{data.name}</h2>
          <p className="text-sm text-gray-600 text-center">{data.email}</p>

          <nav className="w-full mt-6 space-y-2">
            <button onClick={() => setComponent(1)} className={`${component === 1 && 'bg-blue-500/20'} w-full text-left px-4 py-2 rounded-md hover:bg-blue-200 text-blue-700 font-medium transition cursor-pointer`}>
              Mi perfil
            </button>

            <button onClick={() => setComponent(2)} className={`${component === 2 && 'bg-blue-500/20'} w-full text-left px-4 py-2 rounded-md hover:bg-blue-200 text-blue-700 font-medium transition cursor-pointer`}>
              Direcciones
            </button>

            <button className={`${component === 3 && 'bg-blue-500/20'} w-full text-left px-4 py-2 rounded-md hover:bg-blue-200 text-blue-700 font-medium transition cursor-pointer`}>
              Configuraciones
            </button>
            <button
              className="w-full text-left px-4 py-2 mt-4 rounded-md bg-red-100 hover:bg-red-200 text-red-600 font-medium transition"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </nav>
        </aside>

        <main className="md:col-span-2 p-8 space-y-6">
          {Components[component]}
        </main>
      </div>
    </div>
  );
}
