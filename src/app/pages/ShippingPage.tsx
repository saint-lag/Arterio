import { Truck, Package, ArrowLeftRight, AlertCircle } from "lucide-react";

export function ShippingPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl tracking-tight text-black">Entrega e Devoluções</h1>
        <p className="text-sm text-black/60">
          Informações sobre prazos, custos e políticas
        </p>
      </div>

      {/* Shipping */}
      <section className="mb-16">
        <div className="mb-8 flex items-center gap-3">
          <Truck size={24} strokeWidth={1.5} className="text-black/60" />
          <h2 className="text-2xl tracking-tight text-black">Entrega</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm tracking-wide text-black">MODALIDADES</h3>
            <div className="space-y-4">
              <div className="border-l-2 border-black/10 pl-4">
                <p className="text-sm text-black mb-1"><strong>Retirada na Loja</strong></p>
                <p className="text-sm text-black/60">
                  Grátis. Disponível no mesmo dia útil após confirmação do pagamento.
                  Segunda a Sexta: 9h às 18h | Sábado: 9h às 13h
                </p>
              </div>

              <div className="border-l-2 border-black/10 pl-4">
                <p className="text-sm text-black mb-1"><strong>Correios - PAC</strong></p>
                <p className="text-sm text-black/60">
                  Prazo: 8 a 15 dias úteis (dependendo da região)
                  <br />
                  Frete calculado no checkout
                </p>
              </div>

              <div className="border-l-2 border-black/10 pl-4">
                <p className="text-sm text-black mb-1"><strong>Correios - SEDEX</strong></p>
                <p className="text-sm text-black/60">
                  Prazo: 3 a 5 dias úteis (dependendo da região)
                  <br />
                  Frete calculado no checkout
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm tracking-wide text-black">PRAZO DE PROCESSAMENTO</h3>
            <p className="text-sm text-black/60">
              Após a confirmação do pagamento, seu pedido será processado em até 1 dia útil.
              O prazo de entrega começa a contar após o envio do produto.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm tracking-wide text-black">RASTREAMENTO</h3>
            <p className="text-sm text-black/60">
              Você receberá o código de rastreamento por email assim que o pedido for enviado.
              Acompanhe sua entrega diretamente no site dos Correios.
            </p>
          </div>
        </div>
      </section>

      {/* Returns */}
      <section className="mb-16">
        <div className="mb-8 flex items-center gap-3">
          <ArrowLeftRight size={24} strokeWidth={1.5} className="text-black/60" />
          <h2 className="text-2xl tracking-tight text-black">Trocas e Devoluções</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm tracking-wide text-black">DIREITO DE ARREPENDIMENTO</h3>
            <p className="text-sm text-black/60">
              Você tem até 7 dias corridos a partir do recebimento para solicitar
              a devolução do produto, conforme o Código de Defesa do Consumidor.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm tracking-wide text-black">PRODUTOS COM DEFEITO</h3>
            <p className="text-sm text-black/60 mb-3">
              Produtos com defeito de fabricação podem ser trocados em até 30 dias
              após o recebimento. Entre em contato conosco pelo WhatsApp ou email.
            </p>
            <p className="text-sm text-black/60">
              <strong className="text-black">Importante:</strong> O produto deve estar
              em sua embalagem original e sem sinais de uso indevido.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm tracking-wide text-black">COMO SOLICITAR</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-black/60 ml-4">
              <li>Entre em contato via WhatsApp: (11) 99999-9999</li>
              <li>Informe o número do pedido e o motivo da devolução</li>
              <li>Aguarde as instruções para envio</li>
              <li>Após recebermos e analisarmos o produto, faremos o reembolso ou troca</li>
            </ol>
          </div>

          <div>
            <h3 className="mb-3 text-sm tracking-wide text-black">CUSTOS DE DEVOLUÇÃO</h3>
            <p className="text-sm text-black/60">
              - Produto com defeito: frete de devolução por nossa conta
              <br />
              - Arrependimento: frete de devolução por conta do cliente
              <br />
              - Retirada na loja: sem custos adicionais
            </p>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section>
        <div className="mb-8 flex items-center gap-3">
          <AlertCircle size={24} strokeWidth={1.5} className="text-black/60" />
          <h2 className="text-2xl tracking-tight text-black">Informações Importantes</h2>
        </div>

        <div className="space-y-3 text-sm text-black/60">
          <p>
            • O prazo de entrega não inclui finais de semana e feriados
          </p>
          <p>
            • Em caso de ausência no momento da entrega, será deixado um aviso
            para retirada na agência dos Correios
          </p>
          <p>
            • Confira o endereço de entrega antes de finalizar o pedido
          </p>
          <p>
            • Para produtos frágeis ou de alto valor, recomendamos a opção SEDEX
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="mt-16 border-t border-black/10 pt-12 text-center">
        <h3 className="mb-4 text-2xl tracking-tight text-black">Dúvidas?</h3>
        <p className="mb-8 text-sm text-black/60">
          Nossa equipe está pronta para ajudar
        </p>
      </div>
    </main>
  );
}