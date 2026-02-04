import { MapPin, Lock, CreditCard } from "lucide-react";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-sm tracking-wide text-black">
              ARTERIO
            </h3>
            <p className="text-xs leading-relaxed text-black/60">
              Suprimentos essenciais com excelência. Simplicidade, qualidade e agilidade em cada entrega.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm tracking-wide text-black">
              NAVEGAÇÃO
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-xs text-black/60 hover:text-black transition-colors">
                Home
              </Link>
              <Link to="/produtos" className="text-xs text-black/60 hover:text-black transition-colors">
                Produtos
              </Link>
              <Link to="/sobre" className="text-xs text-black/60 hover:text-black transition-colors">
                Sobre
              </Link>
              <Link to="/contato" className="text-xs text-black/60 hover:text-black transition-colors">
                Contato
              </Link>
            </nav>
          </div>

          {/* Help */}
          <div className="space-y-4">
            <h3 className="text-sm tracking-wide text-black">
              AJUDA
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/como-comprar" className="text-xs text-black/60 hover:text-black transition-colors">
                Como Comprar
              </Link>
              <Link to="/entrega" className="text-xs text-black/60 hover:text-black transition-colors">
                Entrega e Devoluções
              </Link>
              <Link to="/termos" className="text-xs text-black/60 hover:text-black transition-colors">
                Termos de Uso
              </Link>
              <Link to="/privacidade" className="text-xs text-black/60 hover:text-black transition-colors">
                Política de Privacidade
              </Link>
            </nav>
          </div>

          {/* Contact - moved to 4th column */}
          <div className="space-y-4">
            <h3 className="text-sm tracking-wide text-black">
              CONTATO
            </h3>
            <div className="space-y-2 text-xs text-black/60">
              <p>WhatsApp: (11) 99999-9999</p>
              <p>Email: contato@arterio.com.br</p>
              <p>Seg - Sex: 9h às 18h</p>
              <p className="pt-2">
                <MapPin size={12} strokeWidth={1.5} className="inline mr-1" />
                Rio de Janeiro - RJ
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment & Security Section */}
      <div className="border-t border-black/10">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            {/* Payment Methods */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs tracking-wide text-black/40">
                <CreditCard size={14} strokeWidth={1.5} />
                FORMAS DE PAGAMENTO
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-12 items-center justify-center border border-black/10 bg-white text-[8px] font-medium tracking-wide text-black/60">
                  VISA
                </div>
                <div className="flex h-8 w-12 items-center justify-center border border-black/10 bg-white text-[8px] font-medium tracking-wide text-black/60">
                  MASTER
                </div>
                <div className="flex h-8 w-12 items-center justify-center border border-black/10 bg-white text-[8px] font-medium tracking-wide text-black/60">
                  ELO
                </div>
                <div className="flex h-8 w-12 items-center justify-center border border-black/10 bg-white text-[8px] font-medium tracking-wide text-black/60">
                  AMEX
                </div>
                <div className="flex h-8 w-12 items-center justify-center border border-black/10 bg-white text-[8px] font-medium tracking-wide text-black/60">
                  PIX
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs tracking-wide text-black/40">
                <Lock size={14} strokeWidth={1.5} />
                SEGURANÇA
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 items-center gap-1.5 border border-black/10 bg-white px-3">
                  <Lock size={12} strokeWidth={1.5} className="text-black/60" />
                  <span className="text-[8px] font-medium tracking-wide text-black/60">
                    SSL SEGURO
                  </span>
                </div>
                <div className="flex h-8 items-center gap-1.5 border border-black/10 bg-white px-3">
                  <div className="h-2 w-2 rounded-full bg-black/60" />
                  <span className="text-[8px] font-medium tracking-wide text-black/60">
                    SITE SEGURO
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-black/10">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <p className="text-xs text-black/40">
              © {new Date().getFullYear()} Arterio. Todos os direitos reservados.
            </p>
            <div className="flex justify-center gap-6 text-xs text-black/40 md:justify-start">
              <Link to="/privacidade" className="hover:text-black transition-colors">
                Política de Privacidade
              </Link>
              <Link to="/termos" className="hover:text-black transition-colors">
                Termos de Uso
              </Link>
              <Link to="/entrega" className="hover:text-black transition-colors">
                Trocas e Devoluções
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}