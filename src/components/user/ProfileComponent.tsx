import { useAuth } from "@/hooks/useAuth";

export default function ProfileComponent() {
    const { data } = useAuth();

    if (data) return (
        <>
            <h3 className="text-2xl font-bold text-blue-700">Información del perfil</h3>

            <div className="grid gap-4">
                <div className="bg-gray-100 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Nombre completo</p>
                    <p className="text-lg font-medium text-gray-700">{data.name}</p>
                </div>

                <div className="bg-gray-100 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Correo electrónico</p>
                    <p className="text-lg font-medium text-gray-700">{data.email}</p>
                </div>
            </div>
        </>
    )
}
