// Configuração Limpa para WooCommerce Store API
export const WP_CONFIG = {
  // O Vite exige import.meta.env e o prefixo VITE_
  siteUrl: import.meta.env.VITE_WP_URL || 'https://arterio.com.br/wp',
  
  // Store API v1 (Pública, segura e feita para Frontends)
  storeApiUrl: import.meta.env.VITE_WP_URL 
    ? `${import.meta.env.VITE_WP_URL}/wp-json/wc/store/v1` 
    : 'https://arterio.com.br/wp/wp-json/wc/store/v1',
  
  checkoutUrl: import.meta.env.VITE_WP_URL 
    ? `${import.meta.env.VITE_WP_URL}/checkout` 
    : 'https://arterio.com.br/wp/checkout',
};

// A função getWCAuthHeader foi completamente removida.
// A Store API não precisa de chaves (Consumer Key/Secret) para ler produtos!