import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-32">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="mb-4 text-6xl tracking-tight text-black">404</h1>
        <h2 className="mb-6 text-2xl tracking-tight text-black">
          Página não encontrada
        </h2>
        <p className="mb-12 max-w-md text-sm text-black/60">
          A página que você está procurando não existe ou foi removida.
        </p>
        <Link
          to="/"
          className="bg-black px-8 py-4 text-sm tracking-wide text-white hover:bg-black/90 transition-colors"
        >
          VOLTAR PARA HOME
        </Link>
      </div>
    </main>
  );
}
