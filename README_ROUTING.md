# Sistema de Roteamento - Arterio

## ✅ Roteamento Implementado

O Arterio agora possui roteamento completo usando React Router v7, com URLs em português e navegação fluida.

## 🗺️ Estrutura de Rotas

### Páginas Principais

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/` | HomePage | Página inicial com hero, categorias e destaques |
| `/produtos` | ProductsPage | Listagem de produtos com filtros |
| `/produtos?categoria=nome` | ProductsPage | Produtos filtrados por categoria |
| `/produto/:slug` | ProductDetailPage | Página individual do produto |
| `/sobre` | AboutPage | Página sobre a empresa |
| `/contato` | ContactPage | Formulário de contato |

### Páginas Institucionais

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/como-comprar` | HowToBuyPage | Guia de como fazer compras |
| `/entrega` | ShippingPage | Informações sobre entrega e devoluções |
| `/termos` | TermsPage | Termos de uso |
| `/privacidade` | PrivacyPage | Política de privacidade |

### Página de Erro

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `*` (qualquer rota não encontrada) | NotFoundPage | Página 404 |

## 📂 Arquitetura

```
/src/app/
├── App.tsx                    # RouterProvider principal
├── routes.tsx                 # Configuração de rotas
├── layouts/
│   └── RootLayout.tsx         # Layout compartilhado (Header, Footer, etc.)
├── pages/
│   ├── HomePage.tsx
│   ├── ProductsPage.tsx
│   ├── ProductDetailPage.tsx
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   ├── HowToBuyPage.tsx
│   ├── ShippingPage.tsx
│   ├── TermsPage.tsx
│   ├── PrivacyPage.tsx
│   └── NotFoundPage.tsx
├── components/
│   ├── Header.tsx             # Com Links do React Router
│   ├── CategoryNav.tsx        # Navegação com useNavigate
│   ├── Footer.tsx             # Com Links do React Router
│   ├── ProductCard.tsx        # Links para páginas de produto
│   └── ...
└── data/
    ├── products.ts            # Lista de produtos com slugs
    └── categories.tsx         # Categorias
```

## 🎯 Funcionalidades

### 1. Navegação por Links

Todos os componentes de navegação usam `<Link>` do React Router:

```tsx
import { Link } from "react-router";

<Link to="/produtos">Produtos</Link>
<Link to="/produto/gaffer-tape-tecido-cinza-48mm">Ver Produto</Link>
```

### 2. Navegação Programática

Para navegação dinâmica (ex: CategoryNav):

```tsx
import { useNavigate } from "react-router";

const navigate = useNavigate();
navigate(`/produtos?categoria=${encodeURIComponent(subcategory)}`);
```

### 3. Parâmetros de URL

#### Query Params (Filtros)
```tsx
// ProductsPage.tsx
const [searchParams, setSearchParams] = useSearchParams();
const categoria = searchParams.get("categoria");

// Definir categoria
setSearchParams({ categoria: "Gaffer & Photo" });
```

#### Route Params (Slugs)
```tsx
// ProductDetailPage.tsx
const { slug } = useParams<{ slug: string }>();
const product = getProductBySlug(slug);
```

### 4. Layout Compartilhado (RootLayout)

O `RootLayout` envolve todas as páginas e fornece:
- Header com contador do carrinho
- CategoryNav
- Carrinho (sidebar)
- Modal "Avise-me"
- WhatsApp Button
- Footer

```tsx
<Outlet context={{ handleNotifyMe, addToCart }} />
```

### 5. Context entre Layout e Páginas

As páginas acessam funções do layout via `useOutletContext`:

```tsx
const { handleNotifyMe, addToCart } = useOutletContext<OutletContext>();
```

## 🔗 Navegação de Produtos

### 1. Card de Produto → Página Individual

```tsx
// ProductCard.tsx
<Link to={`/produto/${slug}`}>
  <h3>{product.name}</h3>
</Link>
```

### 2. Slugs de Produtos

Cada produto possui um slug único:

```ts
// data/products.ts
{
  id: "1",
  name: "Abraçadeira Hellermann 3,6mm x 150mm",
  slug: "abracadeira-hellermann-36mm-x-150mm",
  // ...
}
```

### 3. Breadcrumbs

A página de detalhes do produto inclui navegação de retorno:

```tsx
<Link to="/produtos">
  <ArrowLeft /> Voltar para produtos
</Link>
```

## 🎨 Navegação por Categorias

### Fluxo do CategoryNav:

1. Usuário passa o mouse sobre categoria
2. Subcategorias aparecem em dropdown
3. Clique na subcategoria:
   ```tsx
   navigate(`/produtos?categoria=${encodeURIComponent(subcategory)}`);
   ```
4. ProductsPage lê o parâmetro e filtra os produtos

### URL Resultante:
```
/produtos?categoria=Gaffer%20%26%20Photo
```

## 🛒 Integração com Carrinho

O carrinho permanece acessível em todas as páginas via RootLayout:

```tsx
// RootLayout.tsx
const { cart, addToCart, ... } = useCart();

// Passa para páginas via context
<Outlet context={{ addToCart }} />
```

## 📱 Mobile-Friendly

Todas as rotas são responsivas e funcionam perfeitamente em dispositivos móveis.

## 🔍 SEO-Friendly URLs

URLs semânticas e em português:
- ✅ `/produto/gaffer-tape-tecido-cinza-48mm`
- ✅ `/produtos?categoria=Fitas%20Adesivas`
- ✅ `/como-comprar`
- ❌ `/product/1` (evitado)
- ❌ `/products?cat=123` (evitado)

## 🚀 Como Adicionar Nova Página

### 1. Criar o componente da página

```tsx
// /src/app/pages/MinhaNovaPage.tsx
export function MinhaNovaPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-4xl tracking-tight text-black">
        Minha Nova Página
      </h1>
    </main>
  );
}
```

### 2. Adicionar rota em routes.tsx

```tsx
import { MinhaNovaPage } from "./pages/MinhaNovaPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      // ... outras rotas
      { path: "minha-pagina", Component: MinhaNovaPage },
    ],
  },
]);
```

### 3. Adicionar link na navegação

```tsx
// Header.tsx ou Footer.tsx
<Link to="/minha-pagina">Minha Página</Link>
```

## 🎯 Como Adicionar Novo Produto

### 1. Adicionar produto ao data/products.ts

```ts
{
  id: "35",
  name: "Novo Produto Incrível",
  slug: "novo-produto-incrivel", // importante: único e kebab-case
  price: 99.00,
  category: "Categoria",
  inStock: true,
  description: "Descrição completa do produto...",
}
```

### 2. O produto automaticamente terá:
- Card na listagem de produtos
- Página individual em `/produto/novo-produto-incrivel`
- Funcionalidade de adicionar ao carrinho
- Filtro por categoria

## 🔄 Scroll Behavior

Por padrão, React Router mantém a posição do scroll. Para scroll ao topo em navegações:

```tsx
// Adicionar em RootLayout se necessário
import { useEffect } from "react";
import { useLocation } from "react-router";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
```

## 📊 Estado Global via RootLayout

O RootLayout gerencia estados globais:
- Carrinho (via useCart)
- Modal "Avise-me"
- Produto selecionado para notificação

Páginas filhas acessam via `useOutletContext`.

## 🎭 Páginas com Formulários

Exemplo: ContactPage

```tsx
const [formData, setFormData] = useState({ ... });

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Lógica de envio
  // Pode incluir navegação após sucesso:
  // navigate('/obrigado');
};
```

## 💡 Dicas

1. **Use Link para navegação interna:**
   ```tsx
   <Link to="/produtos">Produtos</Link>
   ```

2. **Use <a> apenas para links externos:**
   ```tsx
   <a href="https://instagram.com/arterio">Instagram</a>
   ```

3. **Slugs devem ser únicos e kebab-case:**
   ```ts
   slug: "produto-nome-123mm"
   ```

4. **Query params para filtros temporários:**
   ```
   /produtos?categoria=Fitas&ordem=preco
   ```

5. **Route params para recursos únicos:**
   ```
   /produto/slug-unico
   /usuario/123
   ```

## 🔗 Links Úteis

- [React Router Docs](https://reactrouter.com/)
- [React Router Hooks](https://reactrouter.com/en/main/hooks/hooks)

---

**Sistema implementado e funcionando!** Todas as rotas estão ativas e navegáveis.
