import { useState } from "react";
import { Header } from "./components/Header";
import { CategoryNav } from "./components/CategoryNav";
import { Footer } from "./components/Footer";
import { Cart } from "./components/Cart";
import { NotifyMeModal } from "./components/NotifyMeModal";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { Home } from "./components/Home";
import { ProductListing } from "./components/ProductListing";
import { About } from "./components/About";
import { ContactPage } from "./pages/ContactPage";
import { HowToBuyPage } from "./pages/HowToBuyPage";
import { ShippingPage } from "./pages/ShippingPage";
import { TermsPage } from "./pages/TermsPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { useCart } from "./hooks/useCart";
import type { Product } from "./types/woocommerce";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Cart hook
  const {
    cart,
    total,
    itemCount,
    isOpen: cartOpen,
    setIsOpen: setCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    goToCheckout,
  } = useCart();

  const handleNotifyMe = (productName: string) => {
    setSelectedProduct(productName);
    setNotifyModalOpen(true);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchTerm(""); // Clear search when selecting category
    setCurrentPage("products");
  };

  const handleClearCategory = () => {
    setSelectedCategory(null);
    setSearchTerm(""); // Clear search when clearing category
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim()) {
      setSelectedCategory(null); // Clear category when searching
      setCurrentPage("products");
    }
  };

  const handleAddToCart = (product: {
    id: string;
    name: string;
    price?: number;
    category: string;
    inStock: boolean;
  }) => {
    const productData: Product = {
      id: product.id,
      name: product.name,
      price: product.price || 0,
      category: product.category,
      inStock: product.inStock,
    };
    addToCart(productData, 1);
  };

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    if (page !== "products") {
      setSelectedCategory(null);
      setSearchTerm(""); // Clear search when navigating away from products
    }
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        cartItemCount={itemCount} 
        onCartClick={() => setCartOpen(true)}
        onNavigate={navigateTo}
        onSearch={handleSearch}
      />

      <CategoryNav onCategorySelect={handleCategorySelect} />

      {/* Main content */}
      <main>
        {currentPage === "home" && (
          <Home onNavigate={navigateTo} onCategorySelect={handleCategorySelect} />
        )}
        {currentPage === "products" && (
          <ProductListing
            onNotifyMe={handleNotifyMe}
            selectedCategory={selectedCategory}
            onClearCategory={handleClearCategory}
            onCategorySelect={handleCategorySelect}
            onAddToCart={handleAddToCart}
            searchTerm={searchTerm}
          />
        )}
        {currentPage === "about" && <About />}
        {currentPage === "contact" && <ContactPage />}
        {currentPage === "how-to-buy" && <HowToBuyPage />}
        {currentPage === "shipping" && <ShippingPage />}
        {currentPage === "terms" && <TermsPage />}
        {currentPage === "privacy" && <PrivacyPage />}
      </main>

      {/* Persistent WhatsApp Button */}
      <WhatsAppButton />

      {/* Cart Sidebar */}
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        total={total}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={goToCheckout}
      />

      {/* Notify Me Modal */}
      <NotifyMeModal
        isOpen={notifyModalOpen}
        onClose={() => setNotifyModalOpen(false)}
        productName={selectedProduct}
      />

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}