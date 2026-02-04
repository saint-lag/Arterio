import { useState, useEffect, useCallback } from 'react';
import { cartService } from '../services/cart';
import type { CartItem, Product } from '../types/woocommerce';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Carregar carrinho do localStorage na montagem
  useEffect(() => {
    const localCart = cartService.getLocalCart();
    setCart(localCart);
  }, []);

  // Adicionar produto ao carrinho
  const addToCart = useCallback((product: Product, quantity: number = 1, variationId?: number) => {
    const updatedCart = cartService.addItem(product, quantity, variationId);
    setCart(updatedCart);
    setIsOpen(true); // Abrir carrinho automaticamente
  }, []);

  // Remover item do carrinho
  const removeFromCart = useCallback((itemKey: string) => {
    const updatedCart = cartService.removeItem(itemKey);
    setCart(updatedCart);
  }, []);

  // Atualizar quantidade
  const updateQuantity = useCallback((itemKey: string, quantity: number) => {
    const updatedCart = cartService.updateQuantity(itemKey, quantity);
    setCart(updatedCart);
  }, []);

  // Limpar carrinho
  const clearCart = useCallback(() => {
    cartService.clearCart();
    setCart([]);
  }, []);

  // Ir para checkout
  const goToCheckout = useCallback(async () => {
    await cartService.redirectToCheckout(cart);
  }, [cart]);

  // Calcular totais
  const total = cartService.getCartTotal(cart);
  const itemCount = cartService.getItemCount(cart);

  return {
    cart,
    total,
    itemCount,
    isOpen,
    setIsOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    goToCheckout,
  };
}
