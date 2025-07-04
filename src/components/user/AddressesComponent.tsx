import { getAddresses } from "@/api/UserAPI";
import { useQuery } from "@tanstack/react-query";
import AddressComponent from "./AddressComponent";
import ModalAddAddress from "../modals/ModalAddAddress";
import { useNavigate } from "react-router-dom";

export default function AddressesComponent() {
    const navigate = useNavigate();

    const { data } = useQuery({
        queryKey: ['getAddresses'],
        queryFn: getAddresses
    });

    if (data) return (
        <>
            <h2 className="text-2xl font-bold text-blue-600 text-center">Mis Direcciones</h2>

            <div className="space-y-4">
                {data.length === 0 ? (
                    <p className="text-center text-gray-600 text-xl">¡Agrega tu primera dirección para empezar a realizar pedidos!</p>
                ) : (
                    <>
                        {data.map(address => (
                            <AddressComponent key={address._id} address={address} />
                        ))}
                    </>
                )}

            </div>

            <ModalAddAddress />

            <div className="text-center">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition cursor-pointer" onClick={() => navigate(location.pathname+'?addAdress=true')}>
                    Agregar nueva dirección
                </button>
            </div>


        </>
    );
}
