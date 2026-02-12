import { useState, useEffect } from 'react';
import { pageService, postService, stripHtmlTags, sanitizeHtml } from '../services/wordpress';
import type { WPPage, WPPost } from '../services/wordpress';

// Hook para buscar uma página por slug
export function useWordPressPage(slug: string | null) {
  const [page, setPage] = useState<WPPage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) {
      setPage(null);
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function fetchPage() {
      try {
        setLoading(true);
        setError(null);

        const wpPage = await pageService.getBySlug(slug);

        if (isMounted) {
          setPage(wpPage);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch page'));
          console.error(`Error fetching WordPress page "${slug}":`, err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchPage();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { page, loading, error };
}

// Hook para buscar múltiplas páginas
export function useWordPressPages(slugs?: string[]) {
  const [pages, setPages] = useState<WPPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPages() {
      try {
        setLoading(true);
        setError(null);

        let wpPages: WPPage[];

        if (slugs && slugs.length > 0) {
          // Buscar páginas específicas por slug
          const pagePromises = slugs.map(slug => pageService.getBySlug(slug));
          const results = await Promise.all(pagePromises);
          wpPages = results.filter((page): page is WPPage => page !== null);
        } else {
          // Buscar todas as páginas publicadas
          wpPages = await pageService.getAll({ 
            per_page: 100,
            status: 'publish' 
          });
        }

        if (isMounted) {
          setPages(wpPages);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch pages'));
          console.error('Error fetching WordPress pages:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchPages();

    return () => {
      isMounted = false;
    };
  }, [slugs?.join(',')]); // eslint-disable-line react-hooks/exhaustive-deps

  return { pages, loading, error };
}

// Hook para buscar posts
export function useWordPressPosts(params?: {
  perPage?: number;
  page?: number;
  search?: string;
}) {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { perPage = 10, page = 1, search } = params || {};

  useEffect(() => {
    let isMounted = true;

    async function fetchPosts() {
      try {
        setLoading(true);
        setError(null);

        const wpPosts = await postService.getAll({
          per_page: perPage,
          page,
          search,
        });

        if (isMounted) {
          setPosts(wpPosts);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch posts'));
          console.error('Error fetching WordPress posts:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, [perPage, page, search]);

  return { posts, loading, error };
}

// Helper hooks para processar conteúdo
export function usePageContent(page: WPPage | null) {
  if (!page) return { title: '', content: '', excerpt: '' };

  return {
    title: stripHtmlTags(page.title.rendered),
    content: sanitizeHtml(page.content.rendered),
    excerpt: stripHtmlTags(page.excerpt.rendered),
  };
}
