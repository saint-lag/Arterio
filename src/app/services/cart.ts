import { WP_CONFIG } from '../config/wordpress';
import type { CartItem, Product } from '../types/woocommerce';

// Cart Service usando localStorage e WooCommerce Cart API
export const cartService = {
  // Chave para armazenar carrinho localmente
  CART_KEY: 'arterio_cart',
  
  // Obter carrinho local
  getLocalCart(): CartItem[] {
    try {
      const cart = localStorage.getItem(this.CART_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error reading cart:', error);
      return [];
    }
  },

  // Salvar carrinho local
  saveLocalCart(items: CartItem[]): void {
    try {
      localStorage.setItem(this.CART_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  },

  // Adicionar item ao carrinho
  addItem(product: Product, quantity: number = 1, variationId?: number): CartItem[] {
    const cart = this.getLocalCart();
    
    // Verificar se o produto já existe no carrinho
    const existingItemIndex = cart.findIndex(
      item => item.product_id === parseInt(product.id) && 
              item.variation_id === variationId
    );

    if (existingItemIndex > -1) {
      // Atualizar quantidade
      cart[existingItemIndex].quantity += quantity;
      cart[existingItemIndex].total = (
        parseFloat(cart[existingItemIndex].total) + 
        (product.price * quantity)
      ).toFixed(2);
    } else {
      // Adicionar novo item
      const newItem: CartItem = {
        key: `${product.id}_${variationId || 'simple'}_${Date.now()}`,
        product_id: parseInt(product.id),
        variation_id: variationId,
        quantity,
        product: product as any, // Simplified product data
        subtotal: (product.price * quantity).toFixed(2),
        total: (product.price * quantity).toFixed(2),
      };
      cart.push(newItem);
    }

    this.saveLocalCart(cart);
    return cart;
  },

  // Remover item do carrinho
  removeItem(itemKey: string): CartItem[] {
    const cart = this.getLocalCart();
    const updatedCart = cart.filter(item => item.key !== itemKey);
    this.saveLocalCart(updatedCart);
    return updatedCart;
  },

  // Atualizar quantidade de um item
  updateQuantity(itemKey: string, quantity: number): CartItem[] {
    const cart = this.getLocalCart();
    const itemIndex = cart.findIndex(item => item.key === itemKey);
    
    if (itemIndex > -1 && quantity > 0) {
      cart[itemIndex].quantity = quantity;
      const product = cart[itemIndex].product as any;
      const unitPrice = parseFloat(product.price);
      cart[itemIndex].total = (unitPrice * quantity).toFixed(2);
      cart[itemIndex].subtotal = (unitPrice * quantity).toFixed(2);
    } else if (quantity === 0) {
      // Remover item se quantidade for 0
      return this.removeItem(itemKey);
    }

    this.saveLocalCart(cart);
    return cart;
  },

  // Limpar carrinho
  clearCart(): void {
    localStorage.removeItem(this.CART_KEY);
  },

  // Calcular total do carrinho
  getCartTotal(cart: CartItem[]): number {
    return cart.reduce((total, item) => total + parseFloat(item.total), 0);
  },

  // Obter quantidade total de itens
  getItemCount(cart: CartItem[]): number {
    return cart.reduce((count, item) => count + item.quantity, 0);
  },

  // Redirecionar para checkout do WooCommerce
  async redirectToCheckout(cart: CartItem[]): Promise<void> {
    if (cart.length === 0) {
      alert('Seu carrinho está vazio');
      return;
    }

    try {
      // 1. Usar loop sequencial em vez de Promise.all para evitar 
      // Race Condition na criação da sessão PHP do WooCommerce
      for (const item of cart) {
        const response = await fetch(`${WP_CONFIG.storeApiUrl}/cart/add-item`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Nonce': 'prevent-cache',
          },
          credentials: 'include', // CRÍTICO: Mantém sessão do WooCommerce
          body: JSON.stringify({
            id: item.product_id,
            quantity: item.quantity,
          }),
        });

        if (!response.ok) {
          console.warn(`Falha ao adicionar o produto ${item.product_id} ao carrinho do servidor.`);
        }
      }

      // 2. Limpar o carrinho local (localStorage) para que o frontend 
      // não fique com itens "fantasmas" após o redirecionamento
      this.clearCart();

      // 3. Redirecionar para checkout após sincronização concluída
      window.location.href = WP_CONFIG.checkoutUrl;

    } catch (error) {
      console.error('Erro ao sincronizar carrinho com WooCommerce:', error);
      alert('Erro ao preparar checkout. Por favor, tente novamente.');
      throw error;
    }
  },

  // Sincronizar carrinho local com WooCommerce (usando Store API ou Session)
  async syncWithWooCommerce(cart: CartItem[]): Promise<void> {
    // Esta função pode ser implementada usando a WooCommerce Store API
    // Documentação: https://github.com/woocommerce/woocommerce/tree/trunk/plugins/woocommerce/src/StoreApi
    
    try {
      // Exemplo de implementação futura com Store API:
      /*
      const response = await fetch(`${WP_CONFIG.apiUrl}/wc/store/cart/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for session cookies
        body: JSON.stringify({
          items: cart.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            variation_id: item.variation_id,
          }))
        })
      });
      */
      
      console.log('Cart sync with WooCommerce would happen here');
    } catch (error) {
      console.error('Error syncing cart:', error);
    }
  },
};