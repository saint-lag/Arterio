import { WP_CONFIG, getWCAuthHeader } from '../config/wordpress';
import type { WCProduct, WCCategory, Product } from '../types/woocommerce';

// Helper para fazer requests à API do WooCommerce
async function wcRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${WP_CONFIG.wcApiUrl}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': getWCAuthHeader(),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`WooCommerce API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('WooCommerce API Error:', error);
    throw error;
  }
}

// Serviço de Produtos
export const productService = {
  // Buscar todos os produtos
  async getAll(params?: {
    per_page?: number;
    page?: number;
    category?: string;
    search?: string;
    status?: string;
  }): Promise<WCProduct[]> {
    const queryParams = new URLSearchParams();
    
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.status) queryParams.append('status', params.status);
    
    queryParams.append('status', 'publish'); // Apenas produtos publicados
    
    const endpoint = `/products?${queryParams.toString()}`;
    return wcRequest<WCProduct[]>(endpoint);
  },

  // Buscar produto por ID
  async getById(id: number): Promise<WCProduct> {
    return wcRequest<WCProduct>(`/products/${id}`);
  },

  // Buscar produto por slug
  async getBySlug(slug: string): Promise<WCProduct[]> {
    return wcRequest<WCProduct[]>(`/products?slug=${slug}`);
  },

  // Buscar produtos por categoria
  async getByCategory(categoryId: number | string, perPage = 100): Promise<WCProduct[]> {
    return wcRequest<WCProduct[]>(`/products?category=${categoryId}&per_page=${perPage}&status=publish`);
  },
};

// Serviço de Categorias
export const categoryService = {
  // Buscar todas as categorias
  async getAll(params?: {
    per_page?: number;
    parent?: number;
    hide_empty?: boolean;
  }): Promise<WCCategory[]> {
    const queryParams = new URLSearchParams();
    
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params?.parent !== undefined) queryParams.append('parent', params.parent.toString());
    if (params?.hide_empty !== undefined) queryParams.append('hide_empty', params.hide_empty.toString());
    
    const endpoint = `/products/categories?${queryParams.toString()}`;
    return wcRequest<WCCategory[]>(endpoint);
  },

  // Buscar categoria por ID
  async getById(id: number): Promise<WCCategory> {
    return wcRequest<WCCategory>(`/products/categories/${id}`);
  },

  // Buscar categoria por slug
  async getBySlug(slug: string): Promise<WCCategory[]> {
    return wcRequest<WCCategory[]>(`/products/categories?slug=${slug}`);
  },
};

// Helper: Converter produto WooCommerce para formato local
export function mapWCProductToLocal(wcProduct: WCProduct): Product {
  return {
    id: wcProduct.id.toString(),
    name: wcProduct.name,
    price: parseFloat(wcProduct.price) || 0,
    category: wcProduct.categories[0]?.name || 'Sem Categoria',
    inStock: wcProduct.stock_status === 'instock',
    image: wcProduct.images[0]?.src,
    sku: wcProduct.sku,
    description: wcProduct.short_description || wcProduct.description,
    variants: wcProduct.attributes.map(attr => ({
      name: attr.name,
      value: attr.options.join(', ')
    })),
  };
}

// Helper: Converter produtos em lote
export function mapWCProductsToLocal(wcProducts: WCProduct[]): Product[] {
  return wcProducts.map(mapWCProductToLocal);
}
