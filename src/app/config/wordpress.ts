// src/app/config/wordpress.ts

export const WP_CONFIG = {
  // 1. Usando o padrão correto do Vite (import.meta.env)
  siteUrl: import.meta.env.VITE_WP_URL || 'https://arterio.com.br/wp',
  
  // 2. Apontando para a Store API (Pública e segura para o React)
  storeApiUrl: import.meta.env.VITE_WP_URL 
    ? `${import.meta.env.VITE_WP_URL}/wp-json/wc/store/v1` 
    : 'https://arterio.com.br/wp/wp-json/wc/store/v1',
  
  // URL para onde o cliente vai na hora de pagar
  checkoutUrl: import.meta.env.VITE_WP_URL 
    ? `${import.meta.env.VITE_WP_URL}/checkout` 
    : 'https://arterio.com.br/wp/checkout',
};

// Removemos completamente o getWCAuthHeader e as chaves (Consumer Key/Secret).
// A Store API não precisa delas!