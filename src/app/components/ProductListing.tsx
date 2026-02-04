import { CategorySidebar } from "./CategorySidebar";
import { ProductCard } from "./ProductCard";
import { products } from "../data/products";

interface ProductListingProps {
  onNotifyMe: (productName: string) => void;
  selectedCategory: string | null;
  onClearCategory: () => void;
  onCategorySelect: (category: string) => void;
  onAddToCart?: (product: { id: string; name: string; price?: number; category: string; inStock: boolean }) => void;
}

export function ProductListing({ onNotifyMe, selectedCategory, onClearCategory, onCategorySelect, onAddToCart }: ProductListingProps) {
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex gap-16">
        {/* Sidebar */}
        <CategorySidebar 
          onCategorySelect={onCategorySelect}
          selectedCategory={selectedCategory}
        />

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-12">
            <h2 className="mb-2 text-sm tracking-wide text-black/40">
              {selectedCategory ? selectedCategory.toUpperCase() : "TODOS OS PRODUTOS"}
            </h2>
            <p className="text-2xl tracking-tight text-black">
              {selectedCategory
                ? `${filteredProducts.length} produtos encontrados`
                : "Catálogo Completo"}
            </p>
            {selectedCategory && (
              <button
                onClick={onClearCategory}
                className="mt-4 text-xs tracking-wide text-black/60 underline hover:text-black transition-colors"
              >
                Limpar filtro
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} onNotifyMe={onNotifyMe} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}