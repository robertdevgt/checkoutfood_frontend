import { CoinsIcon, CreditCard, Nfc } from "lucide-react";
import { useState } from "react";

export default function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState<string>("cash");

  const handleSelect = (method: string) => {
    setSelectedMethod(method);
  };

  return (
    <div className="p-4 rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Método de Pago</h2>
      <div className="flex gap-2">
        <button
          onClick={() => handleSelect("credit_card")}
          className={`w-full text-left p-3 rounded-lg shadow flex justify-center items-center gap-2 ${selectedMethod === "credit_card"
            ? "bg-indigo-500 text-white"
            : "bg-white"
            } transition-colors`}
        >
          <CreditCard />
          Tarjeta
        </button>

        <button
          onClick={() => handleSelect("cash")}
          className={`w-full text-left p-3 rounded-lg shadow flex justify-center items-center gap-2 ${selectedMethod === "cash"
            ? "bg-indigo-500 text-white"
            : "bg-white"
            } transition-colors`}
        >
          <CoinsIcon />
          Efectivo
        </button>

        <button
          onClick={() => handleSelect("pos")}
          className={`w-full text-left p-3 rounded-lg shadow flex justify-center items-center gap-2 ${selectedMethod === "pos"
            ? "bg-indigo-500 text-white"
            : "bg-white"
            } transition-colors`}
        >
          <Nfc />
          POS
        </button>
      </div>

    </div>
  );
}
