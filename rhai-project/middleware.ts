export const config = { matcher: ['/quiz'] };

export default async function middleware(request: Request): Promise<Response> {
  const origin = new URL(request.url).origin;
  const res = await fetch(`${origin}/index.html`);
  const html = await res.text();

  const modified = html
    .replace(
      '<title>Porque Eles Perdem o Interesse — Rhaiane Pimenta</title>',
      '<title>Começar o Quiz</title>'
    )
    .replace(
      '<link rel="canonical" href="https://rhaiane.com.br/">',
      '<link rel="canonical" href="https://rhaiane.com.br/quiz">'
    )
    .replace(
      '<meta property="og:url" content="https://rhaiane.com.br/">',
      '<meta property="og:url" content="https://rhaiane.com.br/quiz">'
    )
    .replace(
      '<meta property="og:title" content="Rhaiane Pimenta">',
      '<meta property="og:title" content="Começar o Quiz">'
    )
    .replace(
      '<meta property="og:description" content="Conteúdo educativo sobre desenvolvimento pessoal e relacionamentos. Entenda os padrões, erros invisíveis e viradas de chave.">',
      '<meta property="og:description" content="Teste gratuito. Responda 8 perguntas rápidas e receba um diagnóstico personalizado sobre o que pode estar sabotando suas chances de viver um relacionamento saudável e recíproco.">'
    )
    .replace(
      '<meta property="og:image" content="https://rhaiane.com.br/assets/og-image.jpg">',
      '<meta property="og:image" content="https://rhaiane.com.br/og-quiz.png">'
    );

  return new Response(modified, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}
