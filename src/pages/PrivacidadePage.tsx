import { Link } from "react-router-dom";

export default function PrivacidadePage() {
  const updated = "11 de junho de 2026";
  const email = "rhaianepimenta@gmail.com";
  const site = "rhaiane.com.br";

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e7eb] font-sans antialiased">
      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10 border-b border-[#c4a34f]/20 pb-6">
          <Link to="/" className="text-[#c4a34f] text-xs uppercase tracking-widest hover:text-[#e7c279] transition-colors">
            ← Voltar
          </Link>
          <h1 className="mt-4 font-serif text-2xl sm:text-3xl text-[#f0ead8] font-bold leading-tight">
            Política de Privacidade
          </h1>
          <p className="text-xs text-gray-500 mt-1">Última atualização: {updated}</p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-gray-300">

          <section>
            <h2 className="font-serif text-[#c4a34f] text-base font-semibold mb-2">1. Quem somos</h2>
            <p>
              Este site é operado por <strong className="text-[#f0ead8]">Rhaiane Pimenta</strong>, responsável pelos
              treinamentos e conteúdos educativos disponíveis em <strong className="text-[#f0ead8]">{site}</strong>.
              Para dúvidas sobre esta política, entre em contato pelo e-mail{" "}
              <a href={`mailto:${email}`} className="text-[#c4a34f] underline hover:text-[#e7c279]">{email}</a>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-[#c4a34f] text-base font-semibold mb-2">2. Dados coletados</h2>
            <p>Coletamos os seguintes dados quando você acessa nosso site ou realiza uma compra:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-gray-400">
              <li>Dados de navegação: endereço IP, tipo de navegador, páginas visitadas, tempo de acesso</li>
              <li>Dados de compra: nome, e-mail e dados de pagamento (processados pela Kiwify)</li>
              <li>Dados de interação: cliques, eventos de visualização de página e de checkout</li>
              <li>Cookies de rastreamento: conforme detalhado na seção 5</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-[#c4a34f] text-base font-semibold mb-2">3. Finalidade do uso</h2>
            <p>Os dados coletados são utilizados para:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-gray-400">
              <li>Processar e entregar os produtos adquiridos</li>
              <li>Melhorar a experiência de navegação e o conteúdo do site</li>
              <li>Exibir anúncios relevantes em plataformas como Meta (Facebook e Instagram)</li>
              <li>Analisar o desempenho de campanhas de marketing</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-[#c4a34f] text-base font-semibold mb-2">4. Compartilhamento de dados</h2>
            <p>Seus dados podem ser compartilhados com os seguintes terceiros:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-gray-400">
              <li>
                <strong className="text-gray-300">Meta Platforms (Facebook/Instagram)</strong> — para veiculação
                de anúncios e mensuração de campanhas via Meta Pixel
              </li>
              <li>
                <strong className="text-gray-300">Kiwify</strong> — plataforma de pagamento e entrega dos produtos
              </li>
              <li>
                <strong className="text-gray-300">YouTube (Google LLC)</strong> — hospedagem dos vídeos do curso (política de privacidade: google.com/policies/privacy)
              </li>
            </ul>
            <p className="mt-2">Não vendemos seus dados a terceiros.</p>
          </section>

          <section>
            <h2 className="font-serif text-[#c4a34f] text-base font-semibold mb-2">5. Cookies e Meta Pixel</h2>
            <p>
              Este site utiliza o <strong className="text-gray-300">Meta Pixel</strong>, uma ferramenta de
              análise da Meta Platforms que nos ajuda a mensurar a eficácia de anúncios e a entender como
              você interage com o site. O Meta Pixel coleta informações sobre suas ações no site (como
              visualizações de página e cliques em botões de compra) e as envia para a Meta.
            </p>
            <p className="mt-2">
              O carregamento do Meta Pixel ocorre apenas após seu consentimento expresso por meio do aviso
              de cookies exibido na primeira visita.
            </p>
            <p className="mt-2">
              Para mais informações sobre como a Meta usa esses dados, consulte a{" "}
              <a
                href="https://www.facebook.com/privacy/policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c4a34f] underline hover:text-[#e7c279]"
              >
                Política de Privacidade da Meta
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-serif text-[#c4a34f] text-base font-semibold mb-2">6. Prazo de retenção</h2>
            <p>
              Os dados de navegação são retidos por até <strong className="text-gray-300">12 meses</strong>.
              Dados relacionados a compras podem ser retidos pelo prazo legal aplicável (até 5 anos,
              conforme o Código de Defesa do Consumidor).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-[#c4a34f] text-base font-semibold mb-2">7. Seus direitos (LGPD)</h2>
            <p>Nos termos da Lei Geral de Proteção de Dados (Lei 13.709/2018), você tem direito a:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-gray-400">
              <li>Confirmar a existência de tratamento dos seus dados</li>
              <li>Acessar os dados que mantemos sobre você</li>
              <li>Solicitar a correção de dados incompletos ou desatualizados</li>
              <li>Solicitar a exclusão dos seus dados</li>
              <li>Revogar o consentimento a qualquer momento</li>
              <li>Solicitar a portabilidade dos seus dados</li>
            </ul>
            <p className="mt-2">
              Para exercer qualquer um desses direitos, entre em contato pelo e-mail{" "}
              <a href={`mailto:${email}`} className="text-[#c4a34f] underline hover:text-[#e7c279]">{email}</a>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-[#c4a34f] text-base font-semibold mb-2">8. Alterações nesta política</h2>
            <p>
              Esta política pode ser atualizada periodicamente. A data da última atualização está indicada
              no topo desta página. O uso continuado do site após alterações implica concordância com a
              nova versão.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-[#c4a34f] text-base font-semibold mb-2">9. Contato</h2>
            <p>
              Dúvidas, solicitações ou reclamações relacionadas a esta política:{" "}
              <a href={`mailto:${email}`} className="text-[#c4a34f] underline hover:text-[#e7c279]">{email}</a>
            </p>
          </section>

        </div>

        <div className="mt-12 pt-6 border-t border-[#c4a34f]/10 text-center">
          <Link to="/" className="text-xs text-gray-600 hover:text-[#c4a34f] transition-colors uppercase tracking-widest">
            ← Voltar ao site
          </Link>
        </div>

      </div>
    </div>
  );
}
