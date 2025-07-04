import type { userAddress } from "@/type/userTypes"
import { TrashIcon } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { deleteAddress } from "@/api/UserAPI"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

type Props = {
    address: userAddress
}

export default function AddressComponent({ address }: Props) {
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: deleteAddress,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['getAddresses'] });
        }
    });
    return (
        <div className="bg-gray-100 rounded-lg p-4 flex justify-between items-center">
            <div>
                <p className="text-gray-700 font-medium">{address.label}</p>
                <p className="text-gray-500 text-sm">{address.formatted_address}</p>
            </div>
            <button className="text-red-500 hover:underline text-sm cursor-pointer hover:animate-bounce">
                <TrashIcon onClick={() => mutate({ id: address._id })} />
            </button>
        </div>
    )
}
