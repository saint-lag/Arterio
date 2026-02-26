/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Aqui você mapeia as suas variáveis para o TypeScript te ajudar com autocompletar!
  readonly VITE_WP_URL: string;
  // adicione outras variáveis aqui no futuro, se precisar
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}