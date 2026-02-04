// WordPress/WooCommerce API Configuration
export const WP_CONFIG = {
  // Altere para a URL do seu WordPress
  siteUrl: process.env.REACT_APP_WP_URL || 'https://seu-site-wordpress.com.br',
  
  // WooCommerce REST API credentials
  // Gere no WordPress: WooCommerce > Settings > Advanced > REST API
  consumerKey: process.env.REACT_APP_WC_CONSUMER_KEY || '',
  consumerSecret: process.env.REACT_APP_WC_CONSUMER_SECRET || '',
  
  // API endpoints
  apiUrl: process.env.REACT_APP_WP_URL 
    ? `${process.env.REACT_APP_WP_URL}/wp-json` 
    : 'https://seu-site-wordpress.com.br/wp-json',
  wcApiUrl: process.env.REACT_APP_WP_URL 
    ? `${process.env.REACT_APP_WP_URL}/wp-json/wc/v3` 
    : 'https://seu-site-wordpress.com.br/wp-json/wc/v3',
  
  // Checkout page URL (WooCommerce checkout)
  checkoutUrl: process.env.REACT_APP_WP_URL 
    ? `${process.env.REACT_APP_WP_URL}/checkout` 
    : 'https://seu-site-wordpress.com.br/checkout',
};

// Helper para criar Basic Auth header
export const getWCAuthHeader = () => {
  const credentials = btoa(`${WP_CONFIG.consumerKey}:${WP_CONFIG.consumerSecret}`);
  return `Basic ${credentials}`;
};
