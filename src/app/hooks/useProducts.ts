import { useState, useEffect } from 'react';
import { productService, mapWCProductsToLocal } from '../services/woocommerce';
import type { Product } from '../types/woocommerce';

interface UseProductsOptions {
  category?: string;
  search?: string;
  perPage?: number;
  enabled?: boolean; // Para controlar quando buscar
}

export function useProducts(options: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { category, search, perPage = 100, enabled = true } = options;

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const wcProducts = await productService.getAll({
          per_page: perPage,
          category,
          search,
        });

        if (isMounted) {
          const localProducts = mapWCProductsToLocal(wcProducts);
          setProducts(localProducts);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch products'));
          console.error('Error fetching products:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [category, search, perPage, enabled]);

  return { products, loading, error };
}

// Hook para buscar um produto específico
export function useProduct(productId: number | null) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!productId || typeof productId !== 'number') {
      setProduct(null);
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);

        const wcProduct = await productService.getById(productId as number);

        if (isMounted) {
          const localProduct = mapWCProductsToLocal([wcProduct])[0];
          setProduct(localProduct);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch product'));
          console.error('Error fetching product:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  return { product, loading, error };
}
