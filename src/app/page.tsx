"use client";

import { useState } from "react";
import Header from "./_components/header/header";
import Footer from "./_components/footer/footer";
import Menu from "./_components/menu/menu";
import ModalCart from "./_components/modalCart/modalCart";
import { Product, CartItem } from "@/types/products";
import { toastSuccess } from "@/lib/toast";

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  function addToCart(product: Product) {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        toastSuccess(`Quantidade de ${product.name} aumentada!`);
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toastSuccess(`${product.name} adicionado ao carrinho!`);
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }

  function handleAddQuantity(productId: number) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    toastSuccess(`Quantidade aumentada.`);
  }

  function handleDecreaseQuantity(productId: number) {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
    toastSuccess(`Quantidade reduzida.`);
  }

  function handleRemoveItem(productId: number) {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
    toastSuccess(`Item removido do carrinho.`);
  }

  function handleClearCart() {
    setCartItems([]);
    toastSuccess("Carrinho limpo com sucesso!");
  }

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Header />

      <Menu onAddToCart={addToCart} />

      <Footer
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />

      <ModalCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        total={getTotal()}
        onAddQuantity={handleAddQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </>
  );
}
