// WordPress/WooCommerce API Configuration
export const WP_CONFIG = {
  // Altere para a URL do seu WordPress
  siteUrl: process.env.REACT_APP_WP_URL || 'https://arterio.com.br/wp',
  
  // WooCommerce REST API credentials
  // Gere no WordPress: WooCommerce > Settings > Advanced > REST API
  consumerKey: process.env.REACT_APP_WC_CONSUMER_KEY || '',
  consumerSecret: process.env.REACT_APP_WC_CONSUMER_SECRET || '',
  
  // API endpoints
  apiUrl: process.env.REACT_APP_WP_URL 
    ? `${process.env.REACT_APP_WP_URL}/wp-json` 
    : 'https://arterio.com.br/wp/wp-json',
  wcApiUrl: process.env.REACT_APP_WP_URL 
    ? `${process.env.REACT_APP_WP_URL}/wp-json/wc/v3` 
    : 'https://arterio.com.br/wp/wp-json/wc/v3',
  
  // Checkout page URL (WooCommerce checkout)
  checkoutUrl: process.env.REACT_APP_WP_URL 
    ? `${process.env.REACT_APP_WP_URL}/checkout` 
    : 'https://arterio.com.br/wp/checkout',
};

// Helper para criar Basic Auth header
export const getWCAuthHeader = () => {
  const credentials = btoa(`${WP_CONFIG.consumerKey}:${WP_CONFIG.consumerSecret}`);
  return `Basic ${credentials}`;
};
