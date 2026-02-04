export function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      {/* Header */}
      <div className="mb-16">
        <h1 className="mb-4 text-4xl tracking-tight text-black">Política de Privacidade</h1>
        <p className="text-sm text-black/60">
          Última atualização: Fevereiro de 2026
        </p>
      </div>

      <div className="prose prose-sm max-w-none space-y-8">
        <section>
          <h2 className="mb-4 text-xl tracking-tight text-black">1. Informações que Coletamos</h2>
          <p className="text-sm leading-relaxed text-black/60 mb-3">
            Podemos coletar as seguintes informações:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-black/60 ml-4">
            <li>Nome completo e informações de contato, incluindo endereço de email</li>
            <li>Informações demográficas, como código postal e preferências</li>
            <li>Informações de pagamento para processar pedidos</li>
            <li>Histórico de compras e navegação no site</li>
            <li>Outras informações relevantes para pesquisas e ofertas</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl tracking-tight text-black">2. Como Usamos as Informações</h2>
          <p className="text-sm leading-relaxed text-black/60 mb-3">
            Utilizamos essas informações para entender suas necessidades e fornecer
            um melhor serviço, especialmente para:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-black/60 ml-4">
            <li>Processar e entregar seus pedidos</li>
            <li>Manter registros internos</li>
            <li>Melhorar nossos produtos e serviços</li>
            <li>Enviar emails promocionais sobre novos produtos e ofertas (com seu consentimento)</li>
            <li>Entrar em contato para pesquisas de mercado</li>
            <li>Personalizar o site de acordo com seus interesses</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl tracking-tight text-black">3. Segurança</h2>
          <p className="text-sm leading-relaxed text-black/60">
            Estamos comprometidos em garantir que suas informações estejam seguras.
            Para prevenir acesso não autorizado ou divulgação, implementamos procedimentos
            físicos, eletrônicos e gerenciais adequados para proteger as informações que
            coletamos online.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl tracking-tight text-black">4. Cookies</h2>
          <p className="text-sm leading-relaxed text-black/60 mb-3">
            Um cookie é um pequeno arquivo que pede permissão para ser colocado no
            disco rígido do seu computador. Uma vez que você concorda, o arquivo é
            adicionado e o cookie ajuda a analisar o tráfego da web ou permite que
            você saiba quando visita um site específico.
          </p>
          <p className="text-sm leading-relaxed text-black/60">
            Os cookies nos permitem adaptar nosso site às suas necessidades individuais.
            Você pode optar por aceitar ou recusar cookies. A maioria dos navegadores
            aceita cookies automaticamente, mas você geralmente pode modificar as
            configurações do seu navegador para recusar cookies, se preferir.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl tracking-tight text-black">5. Links para Outros Sites</h2>
          <p className="text-sm leading-relaxed text-black/60">
            Nosso site pode conter links para outros sites de interesse. No entanto,
            uma vez que você tenha usado esses links para sair do nosso site, você deve
            observar que não temos controle sobre esse outro site. Portanto, não podemos
            ser responsáveis pela proteção e privacidade de qualquer informação que você
            fornecer ao visitar esses sites, e esses sites não são regidos por esta
            declaração de privacidade.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl tracking-tight text-black">6. Controle de suas Informações Pessoais</h2>
          <p className="text-sm leading-relaxed text-black/60 mb-3">
            Você pode optar por restringir a coleta ou uso de suas informações pessoais
            das seguintes maneiras:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-black/60 ml-4">
            <li>Ao preencher um formulário no site, procure a caixa em que você pode
                clicar para indicar que não deseja que as informações sejam usadas para fins de marketing direto</li>
            <li>Se você concordou anteriormente que usássemos suas informações pessoais
                para fins de marketing direto, pode mudar de ideia a qualquer momento
                entrando em contato conosco</li>
          </ul>
          <p className="text-sm leading-relaxed text-black/60 mt-3">
            Não venderemos, distribuiremos ou alugaremos suas informações pessoais a
            terceiros, a menos que tenhamos sua permissão ou sejamos obrigados por lei
            a fazê-lo.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl tracking-tight text-black">7. Seus Direitos (LGPD)</h2>
          <p className="text-sm leading-relaxed text-black/60 mb-3">
            De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-black/60 ml-4">
            <li>Confirmação da existência de tratamento de dados pessoais</li>
            <li>Acesso aos dados pessoais</li>
            <li>Correção de dados incompletos, inexatos ou desatualizados</li>
            <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos</li>
            <li>Portabilidade dos dados</li>
            <li>Eliminação dos dados pessoais tratados com o consentimento do titular</li>
            <li>Revogação do consentimento</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl tracking-tight text-black">8. Alterações nesta Política</h2>
          <p className="text-sm leading-relaxed text-black/60">
            Podemos atualizar nossa Política de Privacidade periodicamente. Recomendamos
            que você revise esta página regularmente para quaisquer alterações. As
            alterações a esta Política de Privacidade são efetivas quando publicadas
            nesta página.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl tracking-tight text-black">9. Contato</h2>
          <p className="text-sm leading-relaxed text-black/60">
            Se você tiver alguma dúvida sobre esta Política de Privacidade ou sobre
            como tratamos seus dados pessoais, entre em contato conosco:
            <br /><br />
            Email: contato@arterio.com.br
            <br />
            WhatsApp: (11) 99999-9999
          </p>
        </section>
      </div>
    </main>
  );
}
