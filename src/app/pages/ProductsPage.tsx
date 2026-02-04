import { useState, useEffect } from "react";
import { useOutletContext, useSearchParams } from "react-router";
import { ProductListing } from "../components/ProductListing";
import type { Product } from "../types/woocommerce";

interface OutletContext {
  handleNotifyMe: (productName: string) => void;
  addToCart: (product: Product, quantity: number) => void;
}

export function ProductsPage() {
  const { handleNotifyMe, addToCart } = useOutletContext<OutletContext>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("categoria")
  );

  // Update selected category when URL params change
  useEffect(() => {
    const categoria = searchParams.get("categoria");
    setSelectedCategory(categoria);
  }, [searchParams]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchParams({ categoria: category });
  };

  const handleClearCategory = () => {
    setSelectedCategory(null);
    setSearchParams({});
  };

  const handleAddToCart = (product: { id: string; name: string; price?: number; category: string; inStock: boolean }) => {
    const productData: Product = {
      id: product.id,
      name: product.name,
      price: product.price || 0,
      category: product.category,
      inStock: product.inStock,
    };
    addToCart(productData, 1);
  };

  return (
    <ProductListing
      onNotifyMe={handleNotifyMe}
      selectedCategory={selectedCategory}
      onClearCategory={handleClearCategory}
      onCategorySelect={handleCategorySelect}
      onAddToCart={handleAddToCart}
    />
  );
}