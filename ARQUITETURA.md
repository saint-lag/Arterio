# Arterio - Arquitetura e Estrutura do Projeto

## 📋 Índice
- [Visão Geral](#visão-geral)
- [Arquitetura Headless](#arquitetura-headless)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Fluxo de Dados](#fluxo-de-dados)
- [Integração WordPress/WooCommerce](#integração-wordpresswoocommerce)
- [Sistema de Navegação](#sistema-de-navegação)
- [Gerenciamento de Estado](#gerenciamento-de-estado)
- [Componentes Principais](#componentes-principais)
- [Como os Dados Fluem](#como-os-dados-fluem)

---

## 🎯 Visão Geral

**Arterio** é um e-commerce de suprimentos gerais construído com arquitetura **headless**, onde:

- **Backend**: WordPress + WooCommerce (API REST)
- **Frontend**: React + TypeScript + Tailwind CSS v4
- **Design**: Minimalista preto e branco com alta proporção de espaço em branco
- **Funcionalidades**: 9 categorias de produtos, carrinho de compras, integração WhatsApp, sistema de busca

---

## 🏗️ Arquitetura Headless

### Conceito

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                     │
│  - Interface do usuário                                 │
│  - Gerenciamento de estado (carrinho, navegação)       │
│  - Consumo de APIs REST                                 │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ HTTP/REST API
                 │
┌────────────────▼────────────────────────────────────────┐
│           BACKEND (WordPress + WooCommerce)             │
│  - Gerenciamento de produtos                            │
│  - Categorias e inventário                              │
│  - Processamento de pagamentos                          │
│  - API REST endpoints                                   │
└─────────────────────────────────────────────────────────┘
```

### Vantagens

- ✅ Frontend e backend desacoplados
- ✅ Melhor performance (React SPA)
- ✅ Flexibilidade de design total
- ✅ Escalabilidade independente
- ✅ Manutenção facilitada

---

## 📁 Estrutura de Pastas

```
arterio/
├── src/
│   ├── app/
│   │   ├── App.tsx                    # Componente principal e roteamento
│   │   │
│   │   ├── components/                # Componentes reutilizáveis
│   │   │   ├── Header.tsx            # Cabeçalho com busca e carrinho
│   │   │   ├── CategoryNav.tsx       # Navegação de categorias
│   │   │   ├── CategorySidebar.tsx   # Sidebar de filtros
│   │   │   ├── ProductCard.tsx       # Card de produto no grid
│   │   │   ├── ProductListing.tsx    # Lista de produtos com paginação
│   │   │   ├── Cart.tsx              # Modal do carrinho lateral
│   │   │   ├── Footer.tsx            # Rodapé
│   │   │   ├── Home.tsx              # Página inicial
│   │   │   ├── About.tsx             # Página sobre
│   │   │   ├── NotifyMeModal.tsx     # Modal "Avise-me"
│   │   │   ├── WhatsAppButton.tsx    # Botão flutuante WhatsApp
│   │   │   ├── Pagination.tsx        # Componente de paginação
│   │   │   ├── ApiStatusBanner.tsx   # Banner de status da API
│   │   │   └── WordPressPage.tsx     # Renderizador de páginas WP
│   │   │
│   │   ├── pages/                     # Páginas completas
│   │   │   ├── ProductDetailPage.tsx # Página de detalhes do produto
│   │   │   ├── ContactPage.tsx       # Página de contato
│   │   │   ├── HowToBuyPage.tsx      # Como comprar
│   │   │   ├── ShippingPage.tsx      # Envio e retirada
│   │   │   ├── TermsPage.tsx         # Termos de uso
│   │   │   └── PrivacyPage.tsx       # Política de privacidade
│   │   │
│   │   ├── services/                  # Camada de serviços API
│   │   │   ├── woocommerce.ts        # Serviço de produtos e categorias
│   │   │   ├── wordpress.ts          # Serviço de páginas e posts
│   │   │   └── cart.ts               # Serviço de carrinho
│   │   │
│   │   ├── hooks/                     # React Hooks customizados
│   │   │   ├── useProducts.ts        # Hook para buscar produtos
│   │   │   ├── useCategories.ts      # Hook para buscar categorias
│   │   │   ├── useCart.ts            # Hook para gerenciar carrinho
│   │   │   └── useWordPress.ts       # Hook para páginas WP
│   │   │
│   │   ├── types/                     # TypeScript Types
│   │   │   └── woocommerce.ts        # Tipos WC e Product
│   │   │
│   │   ├── data/                      # Dados estáticos/mock
│   │   │   ├── categories.ts         # 9 categorias do Arterio
│   │   │   └── products.ts           # Produtos mock (fallback)
│   │   │
│   │   └── config/                    # Configurações
│   │       └── wordpress.ts          # Config da API WP/WC
│   │
│   └── styles/
│       ├── theme.css                 # Variáveis CSS e tema
│       └── fonts.css                 # Importação de fontes
│
├── package.json
└── README.md
```

---

## 🔄 Fluxo de Dados

### 1. Produtos (WooCommerce → React)

```
┌──────────────┐
│  WooCommerce │
│   Database   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  WC REST API │  (wp-json/wc/v3/products)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ productService│  (services/woocommerce.ts)
│  .getAll()   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ useProducts  │  (hooks/useProducts.ts)
│   Hook       │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ProductListing│  (components/ProductListing.tsx)
│  Component   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ ProductCard  │  (components/ProductCard.tsx)
│  Component   │
└──────────────┘
```

### 2. Carrinho (Local + WooCommerce)

```
┌──────────────┐
│ ProductCard  │  onClick "Adicionar"
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ App.tsx      │  handleAddToCart()
│              │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ useCart Hook │  addToCart()
│              │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ cartService  │  addItem() → localStorage
│              │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Cart Modal   │  Exibe itens
│              │
└──────┬───────┘
       │ Checkout
       ▼
┌──────────────┐
│ WooCommerce  │  Página de checkout nativa
│  Checkout    │  (https://arterio.com.br/wp/checkout)
└──────────────┘
```

### 3. Navegação (React State-based)

```
┌──────────────┐
│   Header     │  onNavigate("products")
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  App.tsx     │  setCurrentPage("products")
│  (state)     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Renderiza    │  {currentPage === "products" && ...}
│ Componente   │
└──────────────┘
```

---

## 🔌 Integração WordPress/WooCommerce

### Configuração (`/src/app/config/wordpress.ts`)

```typescript
export const WP_CONFIG = {
  siteUrl: 'https://arterio.com.br/wp',
  consumerKey: process.env.REACT_APP_WC_CONSUMER_KEY,
  consumerSecret: process.env.REACT_APP_WC_CONSUMER_SECRET,
  apiUrl: 'https://arterio.com.br/wp/wp-json',
  wcApiUrl: 'https://arterio.com.br/wp/wp-json/wc/v3',
  checkoutUrl: 'https://arterio.com.br/wp/checkout',
};
```

### Autenticação

**Basic Auth**: Credenciais WooCommerce codificadas em Base64

```typescript
export const getWCAuthHeader = () => {
  const credentials = btoa(`${WP_CONFIG.consumerKey}:${WP_CONFIG.consumerSecret}`);
  return `Basic ${credentials}`;
};
```

### Endpoints Utilizados

#### WooCommerce REST API v3

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/wc/v3/products` | GET | Lista todos os produtos |
| `/wc/v3/products/{id}` | GET | Detalhes de um produto |
| `/wc/v3/products?slug={slug}` | GET | Buscar produto por slug |
| `/wc/v3/products?category={id}` | GET | Produtos por categoria |
| `/wc/v3/products?search={term}` | GET | Buscar produtos |
| `/wc/v3/products/categories` | GET | Lista categorias |
| `/wc/v3/products/categories/{id}` | GET | Detalhes de categoria |

#### WordPress REST API v2

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/wp/v2/pages` | GET | Lista páginas |
| `/wp/v2/pages/{id}` | GET | Detalhes de página |
| `/wp/v2/pages?slug={slug}` | GET | Buscar página por slug |
| `/wp/v2/posts` | GET | Lista posts |
| `/wp/v2/media/{id}` | GET | Buscar mídia |

### Serviços de API (`/src/app/services/`)

#### 1. WooCommerce Service

```typescript
// services/woocommerce.ts

// Buscar produtos
productService.getAll({ 
  per_page: 12, 
  category: 'Gelatinas',
  search: 'filtro',
  status: 'publish' 
});

// Buscar produto específico
productService.getById(123);

// Buscar por slug
productService.getBySlug('fita-gaffer-preta');

// Buscar categorias
categoryService.getAll({ per_page: 100 });
```

#### 2. WordPress Service

```typescript
// services/wordpress.ts

// Buscar páginas
pageService.getBySlug('sobre');

// Buscar posts
postService.getAll({ per_page: 10 });

// Buscar mídia
mediaService.getById(456);
```

#### 3. Cart Service

```typescript
// services/cart.ts

// Gerenciamento local (localStorage)
cartService.addItem(product, quantity);
cartService.removeItem(itemKey);
cartService.updateQuantity(itemKey, newQty);
cartService.getLocalCart();
cartService.clearCart();

// Redirecionamento para checkout WC
cartService.redirectToCheckout(cart);
```

### React Hooks (`/src/app/hooks/`)

#### 1. useProducts

```typescript
// Buscar produtos com filtros
const { products, loading, error } = useProducts({
  category: 'Gelatinas',
  search: 'filtro',
  perPage: 100,
  enabled: true
});
```

#### 2. useProduct

```typescript
// Buscar um produto específico
const { product, loading, error } = useProduct(productId);
```

#### 3. useCategories

```typescript
// Buscar categorias WooCommerce
const { categories, loading, error } = useCategories();
```

#### 4. useCart

```typescript
// Gerenciar carrinho
const {
  cart,           // Itens do carrinho
  total,          // Total em R$
  itemCount,      // Quantidade de itens
  isOpen,         // Modal aberto/fechado
  addToCart,      // Adicionar produto
  removeFromCart, // Remover produto
  updateQuantity, // Atualizar quantidade
  goToCheckout    // Ir para checkout WC
} = useCart();
```

---

## 🧭 Sistema de Navegação

### Navegação Baseada em Estado (App.tsx)

**Não usa React Router** - navegação via estado simples:

```typescript
// Estado de navegação
const [currentPage, setCurrentPage] = useState("home");
const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
const [selectedProductDetail, setSelectedProductDetail] = useState<WCProduct | null>(null);
const [searchTerm, setSearchTerm] = useState("");

// Função de navegação
const navigateTo = (page: string) => {
  setCurrentPage(page);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Renderização condicional
{currentPage === "home" && <Home />}
{currentPage === "products" && <ProductListing />}
{currentPage === "product-detail" && <ProductDetailPage />}
{currentPage === "about" && <About />}
```

### Páginas Disponíveis

| Página | Estado | Componente |
|--------|--------|------------|
| Home | `"home"` | `<Home />` |
| Produtos | `"products"` | `<ProductListing />` |
| Produto | `"product-detail"` | `<ProductDetailPage />` |
| Sobre | `"about"` | `<About />` |
| Contato | `"contact"` | `<ContactPage />` |
| Como Comprar | `"how-to-buy"` | `<HowToBuyPage />` |
| Envio | `"shipping"` | `<ShippingPage />` |
| Termos | `"terms"` | `<TermsPage />` |
| Privacidade | `"privacy"` | `<PrivacyPage />` |

### Fluxo de Navegação de Produtos

```
Home
  └─> Click categoria/busca
      └─> products (ProductListing)
          └─> Click produto
              └─> product-detail (ProductDetailPage)
                  └─> Click "Voltar"
                      └─> products (volta para listagem)
```

---

## 📦 Gerenciamento de Estado

### Estado Global (App.tsx)

```typescript
// Navegação
const [currentPage, setCurrentPage] = useState("home");

// Produtos
const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
const [selectedProductDetail, setSelectedProductDetail] = useState<WCProduct | null>(null);
const [searchTerm, setSearchTerm] = useState("");

// Modais
const [notifyModalOpen, setNotifyModalOpen] = useState(false);
const [selectedProduct, setSelectedProduct] = useState("");

// Carrinho (via useCart hook)
const { cart, total, itemCount, isOpen, ... } = useCart();
```

### Estado Local (localStorage)

**Carrinho de Compras**:
```javascript
localStorage.setItem('arterio_cart', JSON.stringify(cartItems));
```

### Fluxo de Props (Prop Drilling)

```
App.tsx
  ├─> Header
  │   └─> Recebe: cartItemCount, onCartClick, onNavigate, onSearch
  │
  ├─> CategoryNav
  │   └─> Recebe: onCategorySelect
  │
  ├─> ProductListing
  │   ├─> Recebe: selectedCategory, searchTerm, onAddToCart, onProductClick
  │   └─> ProductCard
  │       └─> Recebe: product data, onAddToCart, onProductClick, onNotifyMe
  │
  ├─> ProductDetailPage
  │   └─> Recebe: product, onBack, onAddToCart, onNotifyMe
  │
  └─> Cart
      └─> Recebe: cart, total, onUpdateQuantity, onRemoveItem, onCheckout
```

---

## 🧩 Componentes Principais

### 1. Header

**Localização**: `/src/app/components/Header.tsx`

**Responsabilidades**:
- Logo e navegação principal
- Sistema de busca em tempo real
- Contador do carrinho
- Menu hamburger (mobile)

**Props**:
```typescript
interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onNavigate: (page: string) => void;
  onSearch: (term: string) => void;
}
```

### 2. CategoryNav

**Localização**: `/src/app/components/CategoryNav.tsx`

**Responsabilidades**:
- Navegação de categorias horizontais (desktop)
- Accordion de categorias (mobile)
- Subcategorias em dropdown hover (desktop)
- 9 categorias principais do Arterio

**Props**:
```typescript
interface CategoryNavProps {
  onCategorySelect?: (category: string) => void;
}
```

**Categorias**:
1. Gelatinas (3 subcategorias)
2. Câmera (2 subcategorias)
3. Elétrica (4 subcategorias)
4. Fitas (6 subcategorias)
5. Pilhas (3 subcategorias)
6. Farmácia (3 subcategorias)
7. Papelaria (5 subcategorias)
8. Diversos (sem subcategorias)
9. Itens sob consulta (5 subcategorias)

### 3. ProductListing

**Localização**: `/src/app/components/ProductListing.tsx`

**Responsabilidades**:
- Grid de produtos (12 por página)
- Paginação funcional
- Filtro por categoria
- Busca por nome/categoria
- Estados vazios elegantes
- Sidebar de categorias

**Props**:
```typescript
interface ProductListingProps {
  onNotifyMe: (productName: string) => void;
  selectedCategory: string | null;
  onClearCategory: () => void;
  onCategorySelect: (category: string) => void;
  onAddToCart?: (product) => void;
  onProductClick?: (product: WCProduct) => void;
  searchTerm?: string;
}
```

### 4. ProductCard

**Localização**: `/src/app/components/ProductCard.tsx`

**Responsabilidades**:
- Exibir thumbnail do produto
- Nome, categoria, preço
- Botão "Adicionar ao Carrinho"
- Botão "Avise-me" (produtos esgotados)
- Click para abrir detalhes do produto
- Seleção de variantes (cores)

**Props**:
```typescript
interface ProductCardProps {
  id: string;
  name: string;
  price?: number;
  priceOnRequest?: boolean;
  category: string;
  inStock: boolean;
  variants?: { name: string; value: string }[];
  onNotifyMe: (productName: string) => void;
  onAddToCart?: (product) => void;
  onProductClick?: (product: WCProduct) => void;
}
```

### 5. ProductDetailPage

**Localização**: `/src/app/pages/ProductDetailPage.tsx`

**Responsabilidades**:
- Galeria de imagens do produto
- Informações detalhadas (nome, SKU, categoria)
- Preço ou "Preço sob consulta"
- Descrição completa
- Status de estoque visual
- Seletor de quantidade
- Botões de ação (Adicionar, Avise-me, WhatsApp)
- Especificações e atributos
- Botão "Voltar"

**Props**:
```typescript
interface ProductDetailPageProps {
  product: WCProduct;
  onBack: () => void;
  onAddToCart: (product) => void;
  onNotifyMe: (productName: string) => void;
}
```

### 6. Cart

**Localização**: `/src/app/components/Cart.tsx`

**Responsabilidades**:
- Modal lateral do carrinho
- Lista de itens adicionados
- Controle de quantidade (+/-)
- Remover itens
- Calcular subtotais e total
- Botão "Finalizar Compra" → redireciona para checkout WC

**Props**:
```typescript
interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
  onUpdateQuantity: (key: string, qty: number) => void;
  onRemoveItem: (key: string) => void;
  onCheckout: () => void;
}
```

---

## 🔁 Como os Dados Fluem

### Exemplo Completo: Adicionar Produto ao Carrinho

```
1. Usuário clica em "ADICIONAR" no ProductCard
   └─> ProductCard.tsx
       └─> onClick (com e.stopPropagation())

2. Chama onAddToCart passando dados do produto
   └─> Prop recebida do ProductListing

3. ProductListing repassa para App.tsx
   └─> handleAddToCart() em App.tsx

4. App.tsx usa o hook useCart
   └─> addToCart(product, quantity)

5. useCart chama cartService
   └─> cartService.addItem(product, 1)

6. cartService
   ├─> Verifica se produto já existe
   ├─> Atualiza quantidade ou adiciona novo item
   └─> Salva no localStorage

7. useCart atualiza estados
   ├─> cart (array de itens)
   ├─> itemCount (total de itens)
   └─> total (soma dos preços)

8. Header recebe novo itemCount
   └─> Atualiza badge do carrinho (número vermelho)

9. Cart Modal pode exibir os itens atualizados
   └─> Quando usuário abrir o carrinho lateral
```

### Exemplo: Buscar Produtos do WooCommerce

```
1. Usuário acessa a página de produtos
   └─> App.tsx renderiza <ProductListing />

2. ProductListing usa dados mock locais
   └─> import { products } from '../data/products'

3. (Opcional) Para usar dados reais do WooCommerce:
   └─> Adicionar hook useProducts

4. Hook useProducts em ProductListing.tsx:
   const { products, loading, error } = useProducts({
     category: selectedCategory,
     search: searchTerm,
     perPage: 100
   });

5. useProducts chama productService
   └─> productService.getAll({ category, search })

6. productService faz request HTTP
   ├─> URL: https://arterio.com.br/wp/wp-json/wc/v3/products
   ├─> Headers: Authorization (Basic Auth)
   └─> Params: ?category=X&search=Y&status=publish

7. WooCommerce retorna JSON com produtos
   └─> Array de WCProduct[]

8. productService mapeia para formato local
   └─> mapWCProductsToLocal(wcProducts)

9. useProducts atualiza estado
   └─> setProducts(localProducts)

10. ProductListing recebe produtos e renderiza
    └─> {products.map(product => <ProductCard />)}
```

### Exemplo: Navegar para Detalhes do Produto

```
1. Usuário clica no ProductCard (não nos botões)
   └─> onClick={handleCardClick}

2. ProductCard converte dados para WCProduct
   └─> const wcProduct: WCProduct = { ... }

3. Chama onProductClick(wcProduct)
   └─> Prop recebida do ProductListing

4. ProductListing repassa para App.tsx
   └─> handleProductClick(product)

5. App.tsx atualiza estados
   ├─> setSelectedProductDetail(product)
   ├─> setCurrentPage("product-detail")
   └─> window.scrollTo({ top: 0 })

6. App.tsx renderiza ProductDetailPage
   └─> {currentPage === "product-detail" && 
       <ProductDetailPage product={selectedProductDetail} />}

7. ProductDetailPage exibe:
   ├─> Galeria de imagens
   ├─> Detalhes completos
   ├─> Seletor de quantidade
   └─> Botões de ação

8. Usuário clica "VOLTAR"
   └─> onBack() → handleBackFromProduct()

9. App.tsx volta para listagem
   ├─> setSelectedProductDetail(null)
   ├─> setCurrentPage("products")
   └─> Mantém filtros/busca anteriores
```

---

## 🛒 Fluxo do Checkout

### Carrinho Local → Checkout WooCommerce

```
1. Usuário adiciona produtos ao carrinho
   └─> Salvos no localStorage (React frontend)

2. Usuário clica "FINALIZAR COMPRA" no Cart Modal
   └─> onCheckout() → useCart → cartService.redirectToCheckout()

3. cartService redireciona para WooCommerce
   └─> window.location.href = WP_CONFIG.checkoutUrl
   └─> URL: https://arterio.com.br/wp/checkout

4. Usuário chega na página nativa do WooCommerce
   └─> Página gerenciada pelo WordPress/WooCommerce

5. Checkout do WooCommerce
   ├─> Formulário de dados do cliente
   ├─> Endereço de entrega/retirada
   ├─> Método de pagamento (cartão, PIX)
   └─> Finalização do pedido

6. Após pagamento bem-sucedido
   └─> WooCommerce cria pedido no banco de dados
   └─> Email de confirmação enviado
   └─> Pode redirecionar de volta ao frontend (opcional)
```

**Nota**: Atualmente o carrinho é gerenciado apenas no frontend (localStorage). Para sincronizar com o WooCommerce antes do checkout, seria necessário implementar a **WooCommerce Store API** (comentado em `cart.ts`).

---

## 🎨 Design System

### Cores

```css
/* theme.css */
:root {
  --color-primary: #000000;      /* Preto */
  --color-secondary: #FFFFFF;    /* Branco */
  --color-border: rgba(0,0,0,0.1); /* Cinza claro */
  --color-text: #000000;
  --color-text-muted: rgba(0,0,0,0.6);
}
```

### Tipografia

- **Font**: Sistema (Tailwind default)
- **Estilo**: Limpa, minimalista
- **Tracking**: Amplo (tracking-wide)
- **Uppercase**: Utilizado para labels e botões

### Espaçamento

- **Alto espaço em branco**: Generoso uso de padding e margin
- **Grid**: 12 produtos por página
- **Containers**: max-w-7xl para conteúdo principal

### Componentes de UI

- **Botões**: Border preto, hover com inversão (bg-black + text-white)
- **Cards**: Border sutil, hover com border mais forte
- **Modais**: Slide-in lateral (carrinho), fade-in central (avise-me)

---

## 🔐 Segurança

### Credenciais WooCommerce

**Nunca commitar as chaves no código!**

```bash
# .env
REACT_APP_WP_URL=https://arterio.com.br/wp
REACT_APP_WC_CONSUMER_KEY=ck_xxxxxxxxxxxxx
REACT_APP_WC_CONSUMER_SECRET=cs_xxxxxxxxxxxxx
```

### Basic Auth

- Credenciais enviadas no header `Authorization`
- Codificadas em Base64
- HTTPS obrigatório em produção

### CORS

Configurar no WordPress (htaccess ou plugin):
```apache
Header set Access-Control-Allow-Origin "https://seu-frontend.com"
Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
Header set Access-Control-Allow-Headers "Authorization, Content-Type"
```

---

## 📱 Responsividade

### Breakpoints (Tailwind)

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Adaptações Mobile

- Header: Menu hamburger
- CategoryNav: Accordion vertical
- ProductListing: Grid 1-2 colunas
- ProductDetailPage: Layout vertical
- Cart: Modal fullscreen

---

## 🚀 Como Configurar

### 1. Configurar WordPress/WooCommerce

```bash
# No WordPress, instale:
- WooCommerce plugin
- Ative REST API em WooCommerce > Settings > Advanced > REST API
- Gere credenciais (Consumer Key + Secret)
```

### 2. Configurar Frontend

```bash
# Clone o repositório
git clone [repo-url]

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais
```

### 3. Atualizar Config

```typescript
// src/app/config/wordpress.ts
export const WP_CONFIG = {
  siteUrl: 'https://seu-site.com/wp',
  consumerKey: process.env.REACT_APP_WC_CONSUMER_KEY,
  consumerSecret: process.env.REACT_APP_WC_CONSUMER_SECRET,
  // ...
};
```

### 4. Executar

```bash
npm start
# Frontend roda em http://localhost:3000
# Consome API de https://seu-site.com/wp/wp-json
```

---

## 📊 Fluxo de Dados Completo (Diagrama)

```
┌─────────────────────────────────────────────────────────────┐
│                        USUÁRIO                              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   REACT FRONTEND                            │
│                                                             │
│  ┌──────────┐    ┌──────────┐    ┌──────────────┐         │
│  │ Header   │───▶│ App.tsx  │───▶│ ProductList  │         │
│  │ (busca)  │    │ (estado) │    │ (grid)       │         │
│  └──────────┘    └─────┬────┘    └──────┬───────┘         │
│                        │                  │                 │
│                        ▼                  ▼                 │
│  ┌──────────────────────────────────────────────┐          │
│  │         useProducts Hook                     │          │
│  │  ┌────────────────────────────────────────┐ │          │
│  │  │  productService.getAll()               │ │          │
│  │  │  ├─> Monta URL e headers               │ │          │
│  │  │  ├─> Faz fetch()                       │ │          │
│  │  │  └─> Retorna WCProduct[]               │ │          │
│  │  └────────────────────────────────────────┘ │          │
│  └──────────────────┬───────────────────────────┘          │
│                     │                                       │
└─────────────────────┼───────────────────────────────────────┘
                      │
                      │ HTTP GET
                      │ Authorization: Basic xxx
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              WORDPRESS + WOOCOMMERCE                        │
│                                                             │
│  ┌──────────────────────────────────────────────┐          │
│  │  WP REST API                                 │          │
│  │  /wp-json/wc/v3/products                     │          │
│  └──────────────────┬───────────────────────────┘          │
│                     │                                       │
│                     ▼                                       │
│  ┌──────────────────────────────────────────────┐          │
│  │  WooCommerce Core                            │          │
│  │  ├─> Valida autenticação                     │          │
│  │  ├─> Consulta banco de dados                 │          │
│  │  └─> Retorna JSON                            │          │
│  └──────────────────┬───────────────────────────┘          │
│                     │                                       │
│                     ▼                                       │
│  ┌──────────────────────────────────────────────┐          │
│  │  MySQL Database                              │          │
│  │  wp_posts, wp_postmeta, wp_woocommerce_*     │          │
│  └──────────────────────────────────────────────┘          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                      │
                      │ JSON Response
                      │ { id, name, price, ... }
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              REACT FRONTEND                                 │
│                                                             │
│  ┌──────────────────────────────────────────────┐          │
│  │  useProducts recebe dados                    │          │
│  │  └─> mapWCProductsToLocal()                  │          │
│  │      └─> Converte para formato React         │          │
│  └──────────────────┬───────────────────────────┘          │
│                     │                                       │
│                     ▼                                       │
│  ┌──────────────────────────────────────────────┐          │
│  │  ProductListing renderiza                    │          │
│  │  {products.map(p => <ProductCard />)}        │          │
│  └──────────────────┬───────────────────────────┘          │
│                     │                                       │
│                     ▼                                       │
│  ┌──────────────────────────────────────────────┐          │
│  │  Usuário vê produtos na tela                 │          │
│  └──────────────────────────────────────────────┘          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Próximos Passos (Roadmap)

### Implementações Futuras

1. **Sincronização de Carrinho**
   - Implementar WooCommerce Store API
   - Sincronizar carrinho React ↔ WooCommerce
   - Manter sessão entre frontend e backend

2. **Autenticação de Usuários**
   - Login/Registro via JWT
   - Área do cliente
   - Histórico de pedidos

3. **Imagens Reais**
   - Upload de imagens no WooCommerce
   - Exibir imagens reais nos ProductCards
   - Galeria funcional na página de detalhes

4. **Filtros Avançados**
   - Filtro por preço
   - Filtro por disponibilidade
   - Ordenação (preço, nome, mais recente)

5. **SEO e Performance**
   - Server-Side Rendering (Next.js)
   - Meta tags dinâmicas
   - Lazy loading de imagens
   - Cache de requisições

6. **Analytics**
   - Google Analytics
   - Track de eventos (adição ao carrinho, compras)

---

## 📝 Notas de Desenvolvimento

### Dados Mock vs API Real

Atualmente o projeto usa **dados mock locais** (`/src/app/data/products.ts`) para desenvolvimento e demonstração.

Para usar **dados reais do WooCommerce**:

1. Configure as credenciais em `.env`
2. Descomente os hooks `useProducts` nos componentes
3. Substitua `import { products } from '../data/products'` por `const { products } = useProducts()`

### Ambiente de Desenvolvimento

```bash
# Desenvolvimento local
npm start

# Build de produção
npm run build

# Preview de produção
npm run preview
```

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto é privado e pertence à Arterio.

---

## 📞 Contato

- **Site**: https://arterio.com.br
- **WhatsApp**: +55 11 99999-9999
- **Email**: contato@arterio.com.br

---

**Última atualização**: Fevereiro 2026
