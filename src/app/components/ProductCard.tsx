import { useState } from "react";
import type { WCProduct } from "../types/woocommerce";

interface ProductCardProps {
  id: string;
  name: string;
  slug?: string;
  price?: number;
  priceOnRequest?: boolean;
  category: string;
  inStock: boolean;
  variants?: { name: string; value: string }[];
  onNotifyMe: (productName: string) => void;
  onAddToCart?: (product: { id: string; name: string; price?: number; category: string; inStock: boolean }) => void;
  onProductClick?: (product: WCProduct) => void;
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  priceOnRequest,
  category,
  inStock,
  variants,
  onNotifyMe,
  onAddToCart,
  onProductClick,
}: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState(variants?.[0]?.value || "");

  const handleCardClick = () => {
    if (onProductClick) {
      // Convert to WCProduct format
      const wcProduct: WCProduct = {
        id: parseInt(id),
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
        permalink: '',
        date_created: '',
        type: 'simple',
        status: 'publish',
        featured: false,
        catalog_visibility: 'visible',
        description: '',
        short_description: '',
        sku: id,
        price: price?.toString() || '0',
        regular_price: price?.toString() || '0',
        sale_price: '',
        on_sale: false,
        stock_status: inStock ? 'instock' : 'outofstock',
        stock_quantity: inStock ? 10 : 0,
        manage_stock: true,
        categories: [{ id: 1, name: category, slug: category.toLowerCase() }],
        images: [],
        attributes: [],
        variations: [],
        meta_data: priceOnRequest ? [{ id: 1, key: '_price_on_request', value: 'yes' }] : [],
      };
      onProductClick(wcProduct);
    }
  };

  return (
    <div className="group cursor-pointer" onClick={handleCardClick}>
      {/* Product Image Placeholder */}
      <div className="block">
        <div className="relative mb-4 aspect-square overflow-hidden bg-neutral-100 border border-black/5 hover:border-black/20 transition-colors">
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-center p-6">
              <p className="text-xs tracking-wider text-black/20">{category.toUpperCase()}</p>
            </div>
          </div>
          {!inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/90">
              <span className="text-xs tracking-wide text-black/60">ESGOTADO</span>
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div>
          <p className="mb-1 text-xs tracking-wide text-black/40">{category}</p>
          <h3 className="text-sm tracking-tight text-black group-hover:text-black/60 transition-colors">
            {name}
          </h3>
        </div>

        {/* Color Variants */}
        {variants && variants.length > 0 && (
          <div className="flex items-center gap-2">
            {variants.map((variant) => (
              <button
                key={variant.value}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVariant(variant.value);
                }}
                className={`h-6 w-6 border transition-all ${
                  selectedVariant === variant.value
                    ? "border-black scale-110"
                    : "border-black/20 hover:border-black/40"
                }`}
                style={{ backgroundColor: variant.value }}
                aria-label={variant.name}
              />
            ))}
          </div>
        )}

        {/* Price / Actions */}
        <div className="flex items-center justify-between pt-2">
          {priceOnRequest ? (
            <span className="text-xs tracking-wide text-black">PREÇO SOB CONSULTA</span>
          ) : (
            <span className="text-sm text-black">R$ {price?.toFixed(2)}</span>
          )}

          {!inStock ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNotifyMe(name);
              }}
              className="text-xs tracking-wide text-black/60 underline hover:text-black transition-colors"
            >
              AVISE-ME
            </button>
          ) : (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.({ id, name, price, category, inStock });
              }}
              className="text-xs tracking-wide text-black hover:text-black/60 transition-colors"
            >
              ADICIONAR
            </button>
          )}
        </div>

        {/* In-store Pickup */}
        {inStock && (
          <p className="text-xs text-black/40">Disponível para retirada na loja</p>
        )}
      </div>
    </div>
  );
}