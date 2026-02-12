import { WP_CONFIG } from '../config/wordpress';

// Types para WordPress REST API
export interface WPPage {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  slug: string;
  status: 'publish' | 'draft' | 'pending' | 'private';
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  template: string;
}

export interface WPPost {
  id: number;
  date: string;
  slug: string;
  status: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
}

export interface WPMedia {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: 'image' | 'file' | 'video';
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: Record<string, {
      file: string;
      width: number;
      height: number;
      mime_type: string;
      source_url: string;
    }>;
  };
  source_url: string;
}

// Helper para fazer requests à API REST do WordPress
async function wpRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${WP_CONFIG.apiUrl}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`WordPress API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('WordPress API Error:', error);
    throw error;
  }
}

// Serviço de Páginas
export const pageService = {
  // Buscar todas as páginas
  async getAll(params?: {
    per_page?: number;
    page?: number;
    search?: string;
    status?: string;
  }): Promise<WPPage[]> {
    const queryParams = new URLSearchParams();
    
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.status) queryParams.append('status', params.status);
    
    const endpoint = `/wp/v2/pages?${queryParams.toString()}`;
    return wpRequest<WPPage[]>(endpoint);
  },

  // Buscar página por ID
  async getById(id: number): Promise<WPPage> {
    return wpRequest<WPPage>(`/wp/v2/pages/${id}`);
  },

  // Buscar página por slug
  async getBySlug(slug: string): Promise<WPPage | null> {
    const pages = await wpRequest<WPPage[]>(`/wp/v2/pages?slug=${slug}`);
    return pages.length > 0 ? pages[0] : null;
  },
};

// Serviço de Posts
export const postService = {
  // Buscar todos os posts
  async getAll(params?: {
    per_page?: number;
    page?: number;
    categories?: number[];
    tags?: number[];
    search?: string;
  }): Promise<WPPost[]> {
    const queryParams = new URLSearchParams();
    
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.categories?.length) {
      queryParams.append('categories', params.categories.join(','));
    }
    if (params?.tags?.length) {
      queryParams.append('tags', params.tags.join(','));
    }
    
    const endpoint = `/wp/v2/posts?${queryParams.toString()}`;
    return wpRequest<WPPost[]>(endpoint);
  },

  // Buscar post por ID
  async getById(id: number): Promise<WPPost> {
    return wpRequest<WPPost>(`/wp/v2/posts/${id}`);
  },

  // Buscar post por slug
  async getBySlug(slug: string): Promise<WPPost | null> {
    const posts = await wpRequest<WPPost[]>(`/wp/v2/posts?slug=${slug}`);
    return posts.length > 0 ? posts[0] : null;
  },
};

// Serviço de Media
export const mediaService = {
  // Buscar mídia por ID
  async getById(id: number): Promise<WPMedia> {
    return wpRequest<WPMedia>(`/wp/v2/media/${id}`);
  },

  // Buscar múltiplas mídias por IDs
  async getByIds(ids: number[]): Promise<WPMedia[]> {
    if (ids.length === 0) return [];
    const endpoint = `/wp/v2/media?include=${ids.join(',')}`;
    return wpRequest<WPMedia[]>(endpoint);
  },
};

// Helpers para processar conteúdo HTML
export function stripHtmlTags(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

export function sanitizeHtml(html: string): string {
  // Remove scripts e iframes potencialmente perigosos
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
}
