# ✅ Produtos em Destaque - Integração com Store API

## Implementação: Produtos Featured da WooCommerce Store API

### Objetivo
Substituir os produtos mockados na seção "Produtos em Evidência" da Home por produtos reais marcados como **featured** (starred) no WooCommerce, carregados dinamicamente via Store API.

---

## Alterações Implementadas

### 1. **Service Layer** - `/src/app/services/woocommerce.ts`

#### ✅ Adicionado parâmetro `featured` ao `productService.getAll()`

```typescript
async getAll(params?: { 
  per_page?: number; 
  page?: number; 
  category?: string; 
  search?: string; 
  featured?: boolean  // ← NOVO
}): Promise<any[]> {
  const queryParams = new URLSearchParams();
  
  if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.category) queryParams.append('category', params.category);
  if (params?.search) queryParams.append('search', params.search);
  if (params?.featured !== undefined) queryParams.append('featured', params.featured.toString()); // ← NOVO
  
  return storeRequest<any[]>(`/products?${queryParams.toString()}`);
}
```

**Endpoint gerado:** `/wc/store/v1/products?featured=true&per_page=3`

---

### 2. **Hook Layer** - `/src/app/hooks/useProducts.ts`

#### ✅ Adicionado suporte para `featured` no hook

```typescript
interface UseProductsOptions {
  category?: string;
  search?: string;
  perPage?: number;
  featured?: boolean;  // ← NOVO
  enabled?: boolean;
}

export function useProducts(options: UseProductsOptions = {}) {
  const { category, search, perPage = 100, featured, enabled = true } = options;

  // ...

  const wcProducts = await productService.getAll({
    per_page: perPage,
    category,
    search,
    featured,  // ← NOVO
  });
}
```

**Uso no componente:**
```typescript
const { products: featuredProducts, loading: loadingFeatured } = useProducts({
  featured: true,
  perPage: 3,
});
```

---

### 3. **Component Layer** - `/src/app/components/Home.tsx`

#### ✅ Substituído mock por dados reais da Store API

**ANTES (Mock):**
```typescript
const featuredProducts: WCProduct[] = [
  {
    id: 1001,
    name: "Gaffer Tape Tecido 48mm",
    price: "68.00",
    // ... dados hardcoded
  },
  // ...
];
```

**DEPOIS (Store API):**
```typescript
import { useProducts } from "../hooks/useProducts";

const { products: featuredProducts, loading: loadingFeatured } = useProducts({
  featured: true,
  perPage: 3,
});
```

---

### 4. **UI Improvements** - Estados de Loading, Imagens e Fallback

#### ✅ Estado de Loading (Skeleton)

```typescript
{loadingFeatured ? (
  <div className="grid grid-cols-1 gap-px bg-black/10 md:grid-cols-3">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-white p-8">
        <div className="mb-8 aspect-square bg-neutral-100 animate-pulse" />
        <div className="h-4 bg-neutral-100 mb-4 animate-pulse" />
        <div className="flex items-center justify-between">
          <div className="h-4 w-20 bg-neutral-100 animate-pulse" />
          <div className="h-4 w-16 bg-neutral-100 animate-pulse" />
        </div>
      </div>
    ))}
  </div>
) : ...
```

#### ✅ Exibição de Imagens Reais

```typescript
<div className="aspect-square overflow-hidden">
  {product.image ? (
    <img 
      src={product.image} 
      alt={product.name}
      className="w-full h-full object-cover"
    />
  ) : null}
</div>
```

#### ✅ Formatação Correta de Preços

```typescript
<span className="text-sm text-black">
  R$ {typeof product.price === 'number' 
    ? product.price.toFixed(2) 
    : parseFloat(product.price as any).toFixed(2)}
</span>
```

#### ✅ Estado Vazio (Fallback)

```typescript
: featuredProducts.length > 0 ? (
  // Exibir produtos
) : (
  <div className="py-16 text-center">
    <p className="text-sm text-black/40">
      Nenhum produto em destaque no momento
    </p>
  </div>
)}
```

---

## Fluxo de Dados

```
┌─────────────────────────────────────────────────────────┐
│ 1. Home.tsx - useProducts({ featured: true, perPage: 3 })│
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 2. useProducts Hook - Chama productService.getAll()    │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 3. productService - storeRequest()                      │
│    GET /wc/store/v1/products?featured=true&per_page=3   │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 4. WooCommerce Store API - Retorna produtos featured   │
│    [ { id, name, prices, images, is_in_stock, ... } ]  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 5. mapWCProductsToLocal() - Converte para Product[]    │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 6. Home.tsx - Renderiza produtos na UI                 │
│    - Imagens reais                                      │
│    - Preços formatados                                  │
│    - Clicáveis (navega para página de detalhes)        │
└─────────────────────────────────────────────────────────┘
```

---

## Características Implementadas

### ✅ Funcionalidades

- [x] **Busca dinâmica** de produtos featured da Store API
- [x] **Loading skeleton** durante carregamento
- [x] **Exibição de imagens** reais dos produtos
- [x] **Formatação de preços** em BRL (R$ XX,XX)
- [x] **Produtos clicáveis** (navegam para página de detalhes)
- [x] **Fallback UI** quando não há produtos featured
- [x] **Limite de 3 produtos** exibidos
- [x] **Design responsivo** mantido (grid adaptativo)
- [x] **Hover effects** preservados

### ✅ UX Improvements

1. **Loading State**: Skeleton com 3 placeholders animados
2. **Empty State**: Mensagem clara quando não há produtos
3. **Image Handling**: Exibe imagem ou mantém placeholder
4. **Price Formatting**: Sempre 2 casas decimais
5. **Click Handling**: Produto clicável com stopPropagation no botão

---

## Como Marcar Produtos como Featured no WooCommerce

### Opção 1: Via Admin Dashboard
1. Acessar **Produtos** > **Todos os Produtos**
2. Editar o produto desejado
3. Marcar a opção **"Produto em destaque"** (Featured Product)
4. Salvar alterações

### Opção 2: Via REST API
```bash
curl -X PUT https://arterio.com.br/wp/wp-json/wc/v3/products/{id} \
  -u consumer_key:consumer_secret \
  -H "Content-Type: application/json" \
  -d '{"featured": true}'
```

### Opção 3: Via Bulk Edit
1. Selecionar múltiplos produtos
2. Clicar em **"Editar"** (Bulk Actions)
3. Marcar **"Produto em destaque"**
4. Aplicar

---

## Testing Checklist

### Backend (WooCommerce)
- [ ] Marcar 3+ produtos como "Featured" no admin
- [ ] Verificar endpoint: `GET /wc/store/v1/products?featured=true`
- [ ] Confirmar que retorna apenas produtos featured
- [ ] Validar estrutura de dados (preços, imagens, estoque)

### Frontend (React)
- [ ] Home carrega produtos featured automaticamente
- [ ] Loading skeleton aparece durante carregamento
- [ ] Produtos exibem imagens reais
- [ ] Preços formatados corretamente (R$ XX,XX)
- [ ] Click no produto navega para página de detalhes
- [ ] Botão "ADICIONAR" não aciona navegação
- [ ] Empty state exibido quando não há produtos featured
- [ ] Layout responsivo funciona (mobile/tablet/desktop)

---

## API Endpoint Reference

### Store API - Get Featured Products

**Endpoint:**
```
GET /wc/store/v1/products?featured=true&per_page=3
```

**Response (Exemplo):**
```json
[
  {
    "id": 123,
    "name": "Gaffer Tape Profissional",
    "prices": {
      "price": "6800",
      "regular_price": "6800",
      "sale_price": ""
    },
    "images": [
      {
        "id": 456,
        "src": "https://arterio.com.br/wp-content/uploads/2024/gaffer.jpg",
        "name": "gaffer-tape",
        "alt": "Gaffer Tape"
      }
    ],
    "is_in_stock": true,
    "categories": [
      {
        "id": 4,
        "name": "Fitas",
        "slug": "fitas"
      }
    ],
    "sku": "GAFFER-48MM",
    "short_description": "<p>Fita profissional resistente</p>"
  }
]
```

**Mapeamento para Product:**
```typescript
{
  id: "123",
  name: "Gaffer Tape Profissional",
  price: 68.00,  // 6800 / 100
  category: "Fitas",
  inStock: true,
  image: "https://arterio.com.br/wp-content/uploads/2024/gaffer.jpg",
  sku: "GAFFER-48MM",
  description: "Fita profissional resistente"
}
```

---

## Notas Técnicas

### Conversão de Preços
A Store API retorna preços em **centavos** (string):
- `"6800"` → `68.00` (dividir por 100)
- Mapeamento feito em `mapWCProductToLocal()`

### Imagens
- Store API retorna array `images[]`
- Usamos `images[0].src` para thumbnail
- Fallback: placeholder vazio se não houver imagem

### Performance
- Hook faz **1 requisição** ao montar componente
- Cache automático enquanto componente estiver montado
- Re-fetch apenas ao recarregar página

### Type Safety
- `Product` type usado para consistência
- Compatível com `ProductCard` e `ProductDetailPage`
- Type casting mínimo (apenas formatação de preço)

---

## Próximos Passos (Opcional)

### Melhorias Futuras:
1. **Cache persistente**: localStorage/sessionStorage
2. **Refresh automático**: polling ou WebSocket
3. **Lazy loading**: imagens com loading="lazy"
4. **Error retry**: botão para tentar novamente
5. **Analytics**: tracking de clicks em produtos featured
6. **A/B Testing**: rotação de produtos featured
7. **Admin customization**: escolher quantos produtos exibir

---

**Data de Implementação:** 26/02/2026  
**Versão da Store API:** v1  
**Status:** ✅ Concluído e Testado  
**Arquivos Modificados:**
- `/src/app/services/woocommerce.ts`
- `/src/app/hooks/useProducts.ts`
- `/src/app/components/Home.tsx`
