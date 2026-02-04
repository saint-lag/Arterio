export function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      {/* Header */}
      <div className="mb-16">
        <h1 className="mb-4 text-4xl tracking-tight text-black">Termos de Uso</h1>
        <p className="text-sm text-black/60">
          Última atualização: Fevereiro de 2026
        </p>
      </div>

      <div className="prose prose-sm max-w-none space-y-8">
        <section>
          <h2 className="mb-4 text-xl tracking-tight text-black">1. Aceitação dos Termos</h2>
          <p className="text-sm leading-relaxed text-black/60">
            Ao acessar e usar este site, você aceita e concorda em ficar vinculado aos
            termos e condições deste acordo. Se você não concorda com qualquer parte
            destes termos, não deve usar nosso site.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl tracking-tight text-black">2. Uso do Site</h2>
          <p className="text-sm leading-relaxed text-black/60 mb-3">
            O conteúdo deste site é para sua informação geral e uso. Está sujeito
            a alterações sem aviso prévio.
          </p>
          <p className="text-sm leading-relaxed text-black/60">
            Você concorda em usar o site apenas para fins legais e de maneira
            que não infrinja os direitos ou restrinja o uso e aproveitamento
            deste site por terceiros.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl tracking-tight text-black">3. Produtos e Serviços</h2>
          <p className="text-sm leading-relaxed text-black/60 mb-3">
            Todos os produtos e preços estão sujeitos a alterações sem aviso prévio.
            Fazemos todos os esforços para garantir que as descrições e imagens dos
            produtos sejam precisas, mas não garantimos que sejam completas ou
            livres de erros.
          </p>
          <p className="text-sm leading-relaxed text-black/60">
            Reservamo-nos o direito de recusar ou cancelar qualquer pedido por
            qualquer motivo, incluindo limitações de quantidade ou erros no preço
            ou descrição do produto.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl tracking-tight text-black">4. Preços e Pagamento</h2>
          <p className="text-sm leading-relaxed text-black/60">
            Todos os preços estão em Reais (R$) e incluem impostos, a menos que
            especificado de outra forma. O pagamento deve ser feito no momento da
            compra através dos métodos de pagamento aceitos.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl tracking-tight text-black">5. Propriedade Intelectual</h2>
          <p className="text-sm leading-relaxed text-black/60">
            Este site contém material que é de nossa propriedade ou licenciado para nós.
            Este material inclui, mas não se limita a, design, layout, aparência e gráficos.
            A reprodução é proibida, exceto de acordo com o aviso de direitos autorais,
            que faz parte destes termos e condições.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl tracking-tight text-black">6. Links para Outros Sites</h2>
          <p className="text-sm leading-relaxed text-black/60">
            Nosso site pode conter links para outros sites de interesse. No entanto,
            uma vez que você tenha usado esses links para sair do nosso site, você deve
            observar que não temos controle sobre esse outro site. Portanto, não podemos
            ser responsáveis pela proteção e privacidade de qualquer informação que você
            fornecer ao visitar esses sites.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl tracking-tight text-black">7. Limitação de Responsabilidade</h2>
          <p className="text-sm leading-relaxed text-black/60">
            Nem nós nem terceiros fornecemos qualquer garantia quanto à precisão,
            pontualidade, desempenho, integridade ou adequação das informações e
            materiais encontrados ou oferecidos neste site para qualquer finalidade específica.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl tracking-tight text-black">8. Alterações nos Termos</h2>
          <p className="text-sm leading-relaxed text-black/60">
            Reservamo-nos o direito de revisar estes termos de uso a qualquer momento.
            Ao usar este site, você concorda em revisar regularmente estes termos e
            condições e estar ciente de quaisquer modificações.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl tracking-tight text-black">9. Lei Aplicável</h2>
          <p className="text-sm leading-relaxed text-black/60">
            Estes termos e condições são regidos e interpretados de acordo com as
            leis do Brasil, e você se submete irrevogavelmente à jurisdição exclusiva
            dos tribunais brasileiros.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl tracking-tight text-black">10. Contato</h2>
          <p className="text-sm leading-relaxed text-black/60">
            Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato
            conosco através do email: contato@arterio.com.br
          </p>
        </section>
      </div>
    </main>
  );
}
