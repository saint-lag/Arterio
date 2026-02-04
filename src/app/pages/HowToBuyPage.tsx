import { ShoppingCart, CreditCard, Package, CheckCircle } from "lucide-react";

export function HowToBuyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl tracking-tight text-black">Como Comprar</h1>
        <p className="text-sm text-black/60">
          Processo simples e seguro para adquirir seus produtos
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-12">
        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center border border-black/10">
              <ShoppingCart size={20} strokeWidth={1.5} className="text-black/60" />
            </div>
          </div>
          <div>
            <h2 className="mb-3 text-xl tracking-tight text-black">1. Escolha seus Produtos</h2>
            <p className="text-sm leading-relaxed text-black/60">
              Navegue pelo nosso catálogo e adicione os produtos desejados ao carrinho.
              Você pode filtrar por categoria para encontrar exatamente o que precisa.
            </p>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center border border-black/10">
              <CreditCard size={20} strokeWidth={1.5} className="text-black/60" />
            </div>
          </div>
          <div>
            <h2 className="mb-3 text-xl tracking-tight text-black">2. Finalize o Pedido</h2>
            <p className="text-sm leading-relaxed text-black/60 mb-4">
              Clique em "Finalizar Compra" e você será direcionado para nosso checkout seguro.
              Preencha seus dados de entrega e escolha a forma de pagamento.
            </p>
            <div className="space-y-2 text-sm text-black/60">
              <p><strong className="text-black">Formas de Pagamento:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Cartões de Crédito (Visa, Master, Elo, Amex)</li>
                <li>PIX (aprovação instantânea)</li>
                <li>Boleto Bancário</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center border border-black/10">
              <Package size={20} strokeWidth={1.5} className="text-black/60" />
            </div>
          </div>
          <div>
            <h2 className="mb-3 text-xl tracking-tight text-black">3. Receba seu Pedido</h2>
            <p className="text-sm leading-relaxed text-black/60 mb-4">
              Escolha entre retirada na loja ou entrega pelos Correios:
            </p>
            <div className="space-y-3 text-sm text-black/60">
              <div>
                <p className="text-black mb-1"><strong>Retirada na Loja</strong></p>
                <p>Retire no mesmo dia útil após confirmação do pagamento.</p>
              </div>
              <div>
                <p className="text-black mb-1"><strong>Entrega pelos Correios</strong></p>
                <p>Prazo de 3 a 15 dias úteis, dependendo da sua região.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center border border-black/10">
              <CheckCircle size={20} strokeWidth={1.5} className="text-black/60" />
            </div>
          </div>
          <div>
            <h2 className="mb-3 text-xl tracking-tight text-black">4. Acompanhe seu Pedido</h2>
            <p className="text-sm leading-relaxed text-black/60">
              Você receberá um email de confirmação com o código de rastreamento
              (para entregas) ou instruções para retirada. Dúvidas? Entre em contato
              pelo WhatsApp.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 border-t border-black/10 pt-12 text-center">
        <h3 className="mb-4 text-2xl tracking-tight text-black">Pronto para Comprar?</h3>
        <p className="mb-8 text-sm text-black/60">
          Navegue por nosso catálogo e encontre os produtos que precisa
        </p>
        <a
          href="/produtos"
          className="inline-block bg-black px-8 py-4 text-sm tracking-wide text-white hover:bg-black/90 transition-colors"
        >
          VER CATÁLOGO
        </a>
      </div>
    </main>
  );
}
