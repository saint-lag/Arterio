import { Search, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router";

interface HeaderProps {
  onCartClick?: () => void;
  cartItemCount?: number;
}

export function Header({ onCartClick, cartItemCount = 0 }: HeaderProps) {
  return (
    <header className="border-b border-black/10 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-12">
            <Link to="/" className="text-2xl tracking-tight text-black hover:opacity-60 transition-opacity">
              ARTERIO
            </Link>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link 
                to="/"
                className="text-sm tracking-wide text-black/60 hover:text-black transition-colors"
              >
                HOME
              </Link>
              <Link 
                to="/produtos"
                className="text-sm tracking-wide text-black/60 hover:text-black transition-colors"
              >
                PRODUTOS
              </Link>
              <Link 
                to="/sobre"
                className="text-sm tracking-wide text-black/60 hover:text-black transition-colors"
              >
                SOBRE
              </Link>
              <Link 
                to="/contato"
                className="text-sm tracking-wide text-black/60 hover:text-black transition-colors"
              >
                CONTATO
              </Link>
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <button className="text-black/60 hover:text-black transition-colors">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button className="text-black/60 hover:text-black transition-colors">
              <User size={20} strokeWidth={1.5} />
            </button>
            <button 
              onClick={onCartClick}
              className="relative text-black/60 hover:text-black transition-colors"
            >
              <ShoppingCart size={20} strokeWidth={1.5} />
              {cartItemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] text-white">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}