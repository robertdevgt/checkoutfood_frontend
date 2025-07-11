import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";
import { useAppStore } from "@/store";

type Props = {
    isOpen: boolean;
};

export default function CartSidebar({ isOpen }: Props) {
    const changeModal = useAppStore((state) => state.changeModal);
    const cart = useAppStore((state) => state.cart);
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={changeModal}>
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
                        </Transition.Child>

                        <div className="fixed inset-y-0 right-0 max-w-full flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-300"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-300"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <div className="w-screen max-w-md bg-white shadow-xl border-l border-gray-200 flex flex-col">
                                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                        <Dialog.Title className="text-lg font-semibold text-gray-800">
                                            Carrito de compras
                                        </Dialog.Title>
                                        <button onClick={changeModal} className="text-gray-500 hover:text-gray-700">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                        {cart.length === 0 ? (
                                            <p className="text-gray-500">El carrito está vacío.</p>
                                        ) : (
                                            cart.map((item) => (
                                                <div
                                                    key={item.product_id}
                                                    className="border border-gray-200 rounded-lg p-4 shadow-sm"
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <img
                                                            src={`${import.meta.env.VITE_UPLOADS_URL}/${item.img}`}
                                                            alt={`Imagen de ${item.product_name}`}
                                                            className="w-18 h-18 object-cover rounded-xl"
                                                        />

                                                        <div>
                                                            <p className="font-semibold text-gray-800">{item.product_name}</p>
                                                            <p className="text-sm text-gray-500">
                                                                Cantidad: {item.quantity} x Q{item.price.toFixed(2)}
                                                            </p>
                                                        </div>
                                                        <p className="font-bold text-indigo-600">
                                                            Q{item.sub_total.toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    <div className="border-t border-gray-200 p-6">
                                        <button className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition">
                                            Finalizar compra
                                        </button>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
