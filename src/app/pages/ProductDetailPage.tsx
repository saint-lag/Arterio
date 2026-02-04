import { useParams, Link, useOutletContext } from "react-router";
import { ArrowLeft, ShoppingCart, Package } from "lucide-react";
import { getProductBySlug } from "../data/products";
import type { Product } from "../types/woocommerce";
import { useState } from "react";

interface OutletContext {
  handleNotifyMe: (productName: string) => void;
  addToCart: (product: Product, quantity: number) => void;
}

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { handleNotifyMe, addToCart } = useOutletContext<OutletContext>();
  const [quantity, setQuantity] = useState(1);
  
  const product = slug ? getProductBySlug(slug) : null;

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-32">
        <div className="text-center">
          <h1 className="mb-6 text-4xl tracking-tight text-black">
            Produto não encontrado
          </h1>
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors"
          >
            <ArrowLeft size={16} />
            Voltar para produtos
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    const productData: Product = {
      id: product.id,
      name: product.name,
      price: product.price || 0,
      category: product.category,
      inStock: product.inStock,
    };
    addToCart(productData, quantity);
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      {/* Breadcrumb */}
      <div className="mb-12">
        <Link
          to="/produtos"
          className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors"
        >
          <ArrowLeft size={16} />
          Voltar para produtos
        </Link>
      </div>

      <div className="grid gap-16 lg:grid-cols-2">
        {/* Product Image */}
        <div className="aspect-square bg-neutral-100 border border-black/5 flex items-center justify-center">
          <div className="text-center p-12">
            <p className="text-xs tracking-wider text-black/20">
              {product.category.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          {/* Category */}
          <div>
            <p className="text-xs tracking-wide text-black/40 mb-2">
              {product.category}
            </p>
            <h1 className="text-4xl tracking-tight text-black mb-4">
              {product.name}
            </h1>
          </div>

          {/* Price */}
          <div className="border-t border-b border-black/10 py-6">
            {product.priceOnRequest ? (
              <p className="text-xl tracking-wide text-black">
                PREÇO SOB CONSULTA
              </p>
            ) : (
              <p className="text-3xl tracking-tight text-black">
                R$ {product.price?.toFixed(2)}
              </p>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <div className="space-y-3">
              <h2 className="text-sm tracking-wide text-black">DESCRIÇÃO</h2>
              <p className="text-sm leading-relaxed text-black/60">
                {product.description}
              </p>
            </div>
          )}

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm tracking-wide text-black">VARIANTES</h2>
              <div className="flex items-center gap-3">
                {product.variants.map((variant) => (
                  <div
                    key={variant.value}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="h-10 w-10 border-2 border-black/20"
                      style={{ backgroundColor: variant.value }}
                    />
                    <span className="text-xs text-black/60">
                      {variant.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <Package size={16} strokeWidth={1.5} className="text-black/60" />
            {product.inStock ? (
              <span className="text-sm text-black">Em estoque</span>
            ) : (
              <span className="text-sm text-black/40">Esgotado</span>
            )}
          </div>

          {/* Quantity & Add to Cart */}
          {product.inStock ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-black/10">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-black/60 hover:text-black transition-colors"
                  >
                    −
                  </button>
                  <span className="w-12 text-center text-sm text-black">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-black/60 hover:text-black transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-black px-8 py-4 text-sm tracking-wide text-white hover:bg-black/90 transition-colors"
                >
                  <ShoppingCart size={18} strokeWidth={1.5} />
                  ADICIONAR AO CARRINHO
                </button>
              </div>

              <p className="text-xs text-black/40">
                Disponível para retirada na loja
              </p>
            </div>
          ) : (
            <button
              onClick={() => handleNotifyMe(product.name)}
              className="w-full border border-black px-8 py-4 text-sm tracking-wide text-black hover:bg-black hover:text-white transition-colors"
            >
              AVISE-ME QUANDO CHEGAR
            </button>
          )}

          {/* Additional Info */}
          <div className="space-y-3 border-t border-black/10 pt-8">
            <div className="flex justify-between text-sm">
              <span className="text-black/40">Categoria</span>
              <span className="text-black">{product.category}</span>
            </div>
            {product.id && (
              <div className="flex justify-between text-sm">
                <span className="text-black/40">Código</span>
                <span className="text-black">#{product.id}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
