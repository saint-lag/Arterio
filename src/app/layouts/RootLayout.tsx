import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { CategoryNav } from "../components/CategoryNav";
import { Footer } from "../components/Footer";
import { Cart } from "../components/Cart";
import { NotifyMeModal } from "../components/NotifyMeModal";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { useCart } from "../hooks/useCart";
import { useState } from "react";

export function RootLayout() {
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  
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

  return (
    <div className="min-h-screen bg-white">
      <Header
        cartItemCount={itemCount}
        onCartClick={() => setCartOpen(true)}
      />

      <CategoryNav />

      {/* Main content */}
      <Outlet context={{ handleNotifyMe, addToCart }} />

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
      <Footer />
    </div>
  );
}
