"use client";

import { useState } from "react";
import { CartItem } from "@/types/products";
import { FaTimes, FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

type ModalCartProps = {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    total: number;
    onAddQuantity: (id: number) => void;
    onDecreaseQuantity: (id: number) => void;
    onRemoveItem: (id: number) => void;
    onClearCart: () => void;
};

export default function ModalCart({
    isOpen,
    onClose,
    cartItems,
    total,
    onAddQuantity,
    onDecreaseQuantity,
    onRemoveItem,
    onClearCart,
}: ModalCartProps) {
    const [address, setAddress] = useState("");

    if (!isOpen) return null;

    const notify = (message: string, bgColor = "#16a34a") => {
        Toastify({
            text: message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: bgColor,
            },
        }).showToast();
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleSendOrder = () => {
        if (cartItems.length === 0) {
            notify("Seu carrinho está vazio!", "#ef4444");
            return;
        }

        if (!address.trim()) {
            notify("Por favor, informe seu endereço.", "#ef4444");
            return;
        }

        const items = cartItems
            .map(
                (item) =>
                    `\n- ${item.name} (${item.quantity}x) - R$${item.price.toFixed(2)}`
            )
            .join("");

        const message = `
*Novo Pedido*${items}

*Total: R$${total.toFixed(2)}*

*Endereço de Entrega:*
${address}
    `;
        const phone = "5571996916197";
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");

        onClearCart();
        setAddress("");
        onClose();
        notify("Pedido enviado com sucesso!");
    };

    return (
        <div
            className="bg-black/60 w-full h-full fixed top-0 left-0 z-[99] flex items-center justify-center"
            onClick={handleBackdropClick}
        >
            <div className="bg-white p-5 rounded-md min-w-[90%] md:min-w-[600px]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-center font-bold text-2xl">Meu carrinho</h2>
                    <button onClick={onClose}>
                        <FaTimes className="text-2xl text-gray-700 hover:text-black" />
                    </button>
                </div>

                {cartItems.length === 0 ? (
                    <p className="text-center">Seu carrinho está vazio</p>
                ) : (
                    <div className="flex flex-col gap-4 max-h-[300px] overflow-auto">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center border-b pb-2"
                            >
                                <div>
                                    <p className="font-bold">{item.name}</p>
                                    <p className="text-sm">
                                        {item.quantity}x R$ {item.price.toFixed(2)}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onDecreaseQuantity(item.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        <FaMinus />
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => onAddQuantity(item.id)}
                                        className="bg-green-500 text-white px-2 py-1 rounded"
                                    >
                                        <FaPlus />
                                    </button>
                                    <button
                                        onClick={() => onRemoveItem(item.id)}
                                        className="text-red-600"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <p className="font-bold text-right">Total: R$ {total.toFixed(2)}</p>
                    </div>
                )}

                <div className="mt-4">
                    <p className="font-bold">Endereço de entrega:</p>
                    <input
                        type="text"
                        placeholder="Digite seu endereço completo..."
                        className="w-full border-2 p-2 rounded my-1"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="flex items-center justify-between mt-5">
                    <button onClick={onClose} className="text-red-600 font-bold">
                        Fechar
                    </button>

                    <button
                        onClick={handleSendOrder}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Finalizar pedido
                    </button>
                </div>
            </div>
        </div>
    );
}
