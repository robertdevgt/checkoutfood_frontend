import type { CartItem, Product } from "@/type/productTypes";
import type { Restaurant } from "@/type/restaurantTypes";
import toast from "react-hot-toast";
import type { StateCreator } from "zustand";

export interface CartSlice {
    cart: CartItem[];
    modal: boolean;
    total: number;
    active_restaurant: string | null;
    changeModal: () => void;
    addToCart: (product: Product, restaurantId: Restaurant['_id']) => void;
    deleteItem: (productId: CartItem['product_id']) => void;
    addQuantity: (productId: CartItem['product_id']) => void;
    reduceQuantity: (productId: CartItem['product_id']) => void;
    clearCart: () => void;
}

const MAX_ITEMS = 5;
const MIN_ITEMS = 1;

const storedCart = localStorage.getItem('cart');
const activeRestaurant = localStorage.getItem('restaurant');

export const createCartSlice: StateCreator<CartSlice, [], []> = (set, get) => ({
    cart: storedCart ? JSON.parse(storedCart) : [],
    modal: false,
    total: localStorage.getItem('total') ? Number(localStorage.getItem('total')) : 0,
    active_restaurant: activeRestaurant ?? null,
    addToCart: (product, restaurantId) => {
        const cart = get().cart;
        const active_restaurant = get().active_restaurant;

        if (active_restaurant && (active_restaurant !== restaurantId)) {
            toast.error('Solamente puede pedir un pedido por restaurante, termine el pedido o vacie el carrito');
            return;
        }

        const itemExists = cart.find(item => item.product_id === product._id);
        let updatedCart: CartItem[];

        if (itemExists) {
            updatedCart = cart.map(item => {
                if (item.product_id === product._id) {
                    const newQuantity = item.quantity + 1;
                    return {
                        ...item,
                        quantity: newQuantity,
                        sub_total: newQuantity * item.price
                    }
                }

                return item;
            })
        } else {
            const item: CartItem = {
                product_id: product._id,
                product_name: product.name,
                quantity: 1,
                price: product.price,
                sub_total: 1 * product.price,
                img: product.img
            }

            updatedCart = [...cart, item];
        }

        const total = updatedCart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        set(() => ({
            cart: updatedCart,
            total: total,
            modal: true,
            active_restaurant: restaurantId
        }))

        localStorage.setItem('cart', JSON.stringify(updatedCart));
        localStorage.setItem('activeRestaurant', restaurantId);
        localStorage.setItem('total', total.toString());
    },
    deleteItem: (productId) => {
        const cart = get().cart;

        const updatedCart = cart.filter(item => item.product_id != productId);

        const total = updatedCart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        set({
            cart: updatedCart,
            total
        });
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        localStorage.setItem('total', total.toString());

    },
    addQuantity: (productId) => {
        const cart = get().cart;

        const updatedCart = cart.map(item => {
            if (item.product_id === productId) {
                const newQuantity = item.quantity + 1;
                if (newQuantity <= MAX_ITEMS) {
                    return {
                        ...item,
                        quantity: newQuantity,
                        sub_total: item.price * (newQuantity)
                    }
                } else {
                    return item
                }
            }
            return item
        });

        const total = updatedCart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        set({
            cart: updatedCart,
            total
        })
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        localStorage.setItem('total', total.toString());
    },
    reduceQuantity: (productId) => {
        const cart = get().cart;

        const updatedCart = cart.map(item => {
            if (item.product_id === productId) {
                const newQuantity = item.quantity - 1;
                if (newQuantity >= MIN_ITEMS) {
                    return {
                        ...item,
                        quantity: newQuantity,
                        sub_total: item.price * (newQuantity)
                    }

                } else {
                    return item;
                }
            }
            return item
        });

        const total = updatedCart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        set({
            cart: updatedCart,
            total
        })
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        localStorage.setItem('total', total.toString());
    },
    changeModal: () => {
        const modal = get().modal;
        set({
            modal: !modal
        })
    },
    clearCart: () => {
        set({
            cart: [],
            total: 0
        })

        localStorage.removeItem('cart');
        localStorage.removeItem('total');
        localStorage.removeItem('activeRestaurant');
    }
});