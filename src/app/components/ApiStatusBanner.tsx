import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle, X } from "lucide-react";
import { WP_CONFIG } from "../config/wordpress";

export function ApiStatusBanner() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Verificar se as variáveis de ambiente estão configuradas
    const hasUrl = WP_CONFIG.siteUrl && !WP_CONFIG.siteUrl.includes('seu-site-wordpress');
    const hasKeys = WP_CONFIG.consumerKey && WP_CONFIG.consumerSecret;
    setIsConfigured(hasUrl && hasKeys);

    // Verificar se o banner foi dispensado anteriormente
    const dismissed = localStorage.getItem('api-banner-dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('api-banner-dismissed', 'true');
  };

  // Não mostrar se foi dispensado ou se está configurado
  if (isDismissed || isConfigured) {
    return null;
  }

  return (
    <div className="bg-black text-white px-4 sm:px-6 py-3">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <AlertCircle size={20} strokeWidth={1.5} className="flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm">
              <span className="font-medium">API WordPress não configurada.</span>
              {" "}
              <span className="hidden sm:inline">
                Configure suas credenciais no arquivo .env para carregar produtos e páginas reais.
              </span>
              {" "}
              <a 
                href="/WORDPRESS_API_SETUP.md" 
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80 transition-opacity"
              >
                Ver guia de configuração
              </a>
            </p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-white/80 hover:text-white transition-colors flex-shrink-0"
          aria-label="Dispensar"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

// Componente para mostrar status de conexão (opcional, para debug)
export function ApiDebugPanel() {
  const [testResult, setTestResult] = useState<{
    woocommerce: boolean | null;
    wordpress: boolean | null;
  }>({
    woocommerce: null,
    wordpress: null,
  });

  const testWooCommerceConnection = async () => {
    try {
      const response = await fetch(`${WP_CONFIG.wcApiUrl}/products?per_page=1`, {
        headers: {
          'Authorization': `Basic ${btoa(`${WP_CONFIG.consumerKey}:${WP_CONFIG.consumerSecret}`)}`,
        },
      });
      setTestResult(prev => ({ ...prev, woocommerce: response.ok }));
    } catch (error) {
      setTestResult(prev => ({ ...prev, woocommerce: false }));
    }
  };

  const testWordPressConnection = async () => {
    try {
      const response = await fetch(`${WP_CONFIG.apiUrl}/wp/v2/pages?per_page=1`);
      setTestResult(prev => ({ ...prev, wordpress: response.ok }));
    } catch (error) {
      setTestResult(prev => ({ ...prev, wordpress: false }));
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-black/10 p-4 shadow-lg max-w-xs z-50">
      <h3 className="text-sm font-medium tracking-wide text-black mb-3">
        API DEBUG PANEL
      </h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-black/60">WooCommerce:</span>
          {testResult.woocommerce === null ? (
            <button
              onClick={testWooCommerceConnection}
              className="text-xs px-2 py-1 border border-black/10 hover:bg-black/5"
            >
              Testar
            </button>
          ) : testResult.woocommerce ? (
            <CheckCircle size={16} className="text-green-600" />
          ) : (
            <AlertCircle size={16} className="text-red-600" />
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-black/60">WordPress:</span>
          {testResult.wordpress === null ? (
            <button
              onClick={testWordPressConnection}
              className="text-xs px-2 py-1 border border-black/10 hover:bg-black/5"
            >
              Testar
            </button>
          ) : testResult.wordpress ? (
            <CheckCircle size={16} className="text-green-600" />
          ) : (
            <AlertCircle size={16} className="text-red-600" />
          )}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-black/10">
        <p className="text-xs text-black/40">
          URL: {WP_CONFIG.siteUrl}
        </p>
      </div>
    </div>
  );
}
