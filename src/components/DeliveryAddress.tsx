import { getAddresses } from "@/api/UserAPI";
import { useQuery } from "@tanstack/react-query";
import { type Dispatch, type SetStateAction } from "react";

type Props = {
    selectedAddress: string;
    setSelectedAddress: Dispatch<SetStateAction<string>>;
}


export default function DeliveryAddress({ selectedAddress, setSelectedAddress }: Props) {
    const { data } = useQuery({
        queryKey: ['getAddresses'],
        queryFn: getAddresses
    });

    if (data) return (
        <div className="flex gap-2">
            {data.map(address => (
                <button onClick={() => setSelectedAddress(address._id)} key={address._id} className={`${selectedAddress === address._id ? 'bg-indigo-500 text-white' : 'bg-white'}  shadow rounded-xl p-4 transition-colors`}>
                    <h2 className="font-semibold text-lg mb-2">{address.label}</h2>
                    <p className="text-sm">{address.formatted_address}</p>
                </button>
            ))}
        </div>
    );
}