import { useState, useEffect } from "react";
import { CategorySidebar } from "./CategorySidebar";
import { ProductCard } from "./ProductCard";
import { Pagination } from "./Pagination";
import { products } from "../data/products";
import type { WCProduct } from "../types/woocommerce";

interface ProductListingProps {
  onNotifyMe: (productName: string) => void;
  selectedCategory: string | null;
  onClearCategory: () => void;
  onCategorySelect: (category: string) => void;
  onAddToCart?: (product: { id: string; name: string; price?: number; category: string; inStock: boolean }) => void;
  onProductClick?: (product: WCProduct) => void;
  searchTerm?: string;
}

const PRODUCTS_PER_PAGE = 12;

export function ProductListing({ onNotifyMe, selectedCategory, onClearCategory, onCategorySelect, onAddToCart, onProductClick, searchTerm = "" }: ProductListingProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Filter by category
  let filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Filter by search term
  if (searchTerm.trim()) {
    const searchLower = searchTerm.toLowerCase().trim();
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower)
    );
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of product listing
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine heading text
  const getHeadingText = () => {
    if (searchTerm.trim()) {
      return `RESULTADOS PARA "${searchTerm.toUpperCase()}"`;
    }
    if (selectedCategory) {
      return selectedCategory.toUpperCase();
    }
    return "TODOS OS PRODUTOS";
  };

  const getSubheadingText = () => {
    if (searchTerm.trim()) {
      return filteredProducts.length === 0 
        ? "Nenhum produto encontrado"
        : `${filteredProducts.length} ${filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}`;
    }
    if (selectedCategory) {
      return `${filteredProducts.length} produtos encontrados`;
    }
    return "Catálogo Completo";
  };

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
      <div className="flex gap-8 lg:gap-16">
        {/* Sidebar - Hidden when searching */}
        {!searchTerm.trim() && (
          <CategorySidebar 
            onCategorySelect={onCategorySelect}
            selectedCategory={selectedCategory}
          />
        )}

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-8 sm:mb-12">
            <h2 className="mb-2 text-sm tracking-wide text-black/40">
              {getHeadingText()}
            </h2>
            <p className="text-xl sm:text-2xl tracking-tight text-black">
              {getSubheadingText()}
            </p>
            {(selectedCategory || searchTerm.trim()) && (
              <button
                onClick={() => {
                  onClearCategory();
                }}
                className="mt-4 text-xs tracking-wide text-black/60 underline hover:text-black transition-colors"
              >
                {searchTerm.trim() ? 'Limpar busca' : 'Limpar filtro'}
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-base text-black/60 mb-4">
                Nenhum produto encontrado.
              </p>
              <button
                onClick={onClearCategory}
                className="text-sm tracking-wide text-black/60 underline hover:text-black transition-colors"
              >
                Ver todos os produtos
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-8 sm:gap-y-16">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} {...product} onNotifyMe={onNotifyMe} onAddToCart={onAddToCart} onProductClick={onProductClick} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}