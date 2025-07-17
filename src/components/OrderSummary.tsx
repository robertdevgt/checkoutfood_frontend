import { useAppStore } from "@/store";

export default function OrderSummary() {
    const cart = useAppStore((state) => state.cart);

    return (
        <div className="bg-white shadow-md rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Resumen de Pedido</h2>

            <ul className="space-y-4">
                {cart.map((item, index) => (
                    <li key={index} className="flex items-center gap-4">
                        <img
                            src={`${import.meta.env.VITE_UPLOADS_URL}/${item.img}`}
                            alt={`Imagen de ${item.product_name}`}
                            className="w-14 h-14 object-cover rounded-lg border"
                        />

                        <div className="flex-1">
                            <p className="text-base font-medium text-gray-900">{item.product_name}</p>
                            <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                            <p className="text-sm text-gray-500">Precio: Q{item.price}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
