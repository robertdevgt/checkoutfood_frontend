import DeliveryAddress from "@/components/DeliveryAddress";
import OrderSummary from "@/components/OrderSummary";
import PaymentMethod from "@/components/PaymentMethod";
import { useAppStore } from "@/store";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function FinishOrder() {
  const shipping = 5;
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const cart = useAppStore((state) => state.cart);
  const total = useAppStore((state) => state.total);

  const disabled = useMemo(() => !selectedAddress, [selectedAddress]);

  return (
    <div className="grid grid-cols-4 w-full mx-auto p-10">
      <div className="mx-auto py-8 space-y-8 col-span-3">
        {cart.length === 0 ? (
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-4">
              Explora los restaurantes cercanos y encuentra tu próxima comida favorita.
            </p>
            <Link
              to="/restaurants"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Ver restaurantes
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-800 text-center">Finalizar Pedido</h1>

            <div className="space-y-6">
              <section className="bg-white p-6 rounded-lg shadow-md">
                <OrderSummary />
              </section>

              <section className="bg-white p-6 rounded-lg shadow-md">
                <DeliveryAddress
                  selectedAddress={selectedAddress}
                  setSelectedAddress={setSelectedAddress}
                />
              </section>

              <section className="bg-white p-6 rounded-lg shadow-md">
                <PaymentMethod />
              </section>
            </div>
          </>
        )}
      </div>

      <div className="p-8 shadow-xl rounded-2xl bg-white max-w-xl mx-auto space-y-6 justify-between flex flex-col">
        <div className="space-y-5">
          <h2 className="font-bold text-3xl border-b pb-2">Resumen</h2>

          <div className="space-y-4">
            {cart.map((item) => (
              <div className="flex justify-between items-center border-b gap-10" key={item.product_id}>
                <div>
                  <p className="font-semibold text-lg">{item.product_name}</p>
                </div>
                <p className="text-green-500 font-medium">Q{item.sub_total.toFixed(2)}</p>
              </div>
            ))}

            <div className="flex justify-between items-center pt-4">
              <p className="text-gray-600 font-medium">Costo de envío</p>
              <p className="text-gray-700 font-semibold">Q{shipping}</p>
            </div>

            <div className="flex justify-between items-center border-t pt-4 mt-4">
              <p className="text-xl font-bold">Total</p>
              <p className="text-xl font-bold text-green-600">
                Q{(total + shipping).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <button
          disabled={disabled}
          className={`${disabled ? 'bg-indigo-600/40 cursor-not-allowed' : 'bg-indigo-600 cursor-pointer hover:bg-indigo-700 '} w-full  text-white font-semibold py-3 rounded-lg transition`}>
          Finalizar compra
        </button>
      </div>
    </div>
  );
}
