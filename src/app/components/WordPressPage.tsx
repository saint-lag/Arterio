import { useWordPressPage, usePageContent } from "../hooks/useWordPress";

interface WordPressPageProps {
  slug: string;
}

export function WordPressPage({ slug }: WordPressPageProps) {
  const { page, loading, error } = useWordPressPage(slug);
  const { title, content } = usePageContent(page);

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
        <div className="animate-pulse">
          <div className="h-10 bg-black/5 mb-8 w-1/2" />
          <div className="space-y-4">
            <div className="h-4 bg-black/5" />
            <div className="h-4 bg-black/5" />
            <div className="h-4 bg-black/5 w-3/4" />
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
        <div className="p-6 border border-black/10 bg-black/5">
          <h1 className="text-2xl tracking-tight text-black mb-4">
            Erro ao Carregar Página
          </h1>
          <p className="text-sm text-black/60 mb-2">
            Não foi possível carregar o conteúdo desta página.
          </p>
          <p className="text-xs text-black/40">
            {error.message}
          </p>
        </div>
      </main>
    );
  }

  if (!page) {
    return (
      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
        <div className="text-center">
          <h1 className="text-2xl tracking-tight text-black mb-4">
            Página Não Encontrada
          </h1>
          <p className="text-sm text-black/60">
            A página que você está procurando não existe.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
      <article>
        {/* Title */}
        <h1 className="mb-8 sm:mb-12 text-3xl sm:text-4xl lg:text-5xl tracking-tight text-black">
          {title}
        </h1>

        {/* Content */}
        <div 
          className="prose prose-sm sm:prose-base lg:prose-lg max-w-none
            prose-headings:font-normal prose-headings:tracking-tight prose-headings:text-black
            prose-p:text-black/80 prose-p:leading-relaxed
            prose-a:text-black prose-a:underline prose-a:transition-opacity hover:prose-a:opacity-60
            prose-ul:text-black/80 prose-ol:text-black/80
            prose-strong:text-black prose-strong:font-medium
            prose-img:rounded-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </main>
  );
}
