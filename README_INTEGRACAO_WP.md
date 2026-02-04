# Integração WordPress Headless + WooCommerce - Arterio

## ✅ Implementação Concluída

A integração headless com WordPress/WooCommerce foi implementada com sucesso! Este documento explica como usar e configurar.

## 📁 Arquitetura Implementada

### Serviços
- `/src/app/services/woocommerce.ts` - API service para produtos e categorias
- `/src/app/services/cart.ts` - Gerenciamento de carrinho local

### Hooks React
- `/src/app/hooks/useProducts.ts` - Hook para buscar produtos do WooCommerce
- `/src/app/hooks/useCategories.ts` - Hook para buscar categorias
- `/src/app/hooks/useCart.ts` - Hook para gerenciar carrinho

### Componentes
- `/src/app/components/Cart.tsx` - Carrinho lateral minimalista
- Componentes existentes atualizados para suportar carrinho

### Configuração
- `/src/app/config/wordpress.ts` - Configurações da API
- `/.env.example` - Template de variáveis de ambiente
- `/src/app/types/woocommerce.ts` - TypeScript types

## 🚀 Como Usar

### 1. Configuração do Backend (WordPress)

Siga o guia completo em `/WORDPRESS_SETUP.md` para:
- Instalar e configurar WooCommerce
- Gerar chaves da API
- Configurar CORS
- Criar categorias e produtos

### 2. Configuração do Frontend

1. **Copie o arquivo de ambiente:**
   ```bash
   cp .env.example .env
   ```

2. **Preencha as credenciais no `.env`:**
   ```env
   REACT_APP_WP_URL=https://seu-site-wordpress.com.br
   REACT_APP_WC_CONSUMER_KEY=ck_xxxxx
   REACT_APP_WC_CONSUMER_SECRET=cs_xxxxx
   ```

3. **Reinicie o servidor de desenvolvimento:**
   ```bash
   npm start
   ```

### 3. Uso Básico

#### Buscar Produtos do WooCommerce

```tsx
import { useProducts } from './hooks/useProducts';

function MeuComponente() {
  const { products, loading, error } = useProducts({
    perPage: 50,
    category: 'categoria-slug',
  });

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

#### Buscar Categorias

```tsx
import { useCategories } from './hooks/useCategories';

function CategoriesMenu() {
  const { categories, loading } = useCategories();

  return (
    <nav>
      {categories.map(cat => (
        <a key={cat.id} href={`/categoria/${cat.slug}`}>
          {cat.name}
        </a>
      ))}
    </nav>
  );
}
```

#### Gerenciar Carrinho

```tsx
import { useCart } from './hooks/useCart';

function ProductPage({ product }) {
  const { addToCart, cart, total, goToCheckout } = useCart();

  return (
    <div>
      <button onClick={() => addToCart(product, 1)}>
        Adicionar ao Carrinho
      </button>
      
      <div>Itens no carrinho: {cart.length}</div>
      <div>Total: R$ {total.toFixed(2)}</div>
      
      <button onClick={goToCheckout}>
        Finalizar Compra
      </button>
    </div>
  );
}
```

## 🔄 Fluxo de Compra

### Implementação Atual (Dados Mock)

1. ✅ Usuário navega pelos produtos (dados estáticos em ProductListing.tsx)
2. ✅ Adiciona produtos ao carrinho (armazenado em localStorage)
3. ✅ Visualiza carrinho lateral com contador
4. ✅ Atualiza quantidades, remove itens
5. ✅ Clica em "Finalizar Compra"
6. ✅ É redirecionado para checkout do WooCommerce

### Com WordPress Conectado

1. Produtos serão buscados da API do WooCommerce
2. Carrinho será sincronizado com WooCommerce
3. Checkout ocorrerá na página do WordPress
4. Pagamento processado pelo WooCommerce

## 🔌 Conectando com WordPress Real

Para substituir os dados mock por dados reais do WordPress:

### Opção 1: Usar hooks diretamente

Modifique `/src/app/components/ProductListing.tsx`:

```tsx
import { useProducts } from '../hooks/useProducts';

export function ProductListing({ selectedCategory, ... }: ProductListingProps) {
  // Substitua a array estática por:
  const { products, loading, error } = useProducts({
    perPage: 100,
    category: selectedCategory,
  });

  if (loading) {
    return <div>Carregando produtos...</div>;
  }

  if (error) {
    console.error('Erro ao carregar produtos:', error);
    // Fallback para produtos mock
  }

  // ... resto do código
}
```

### Opção 2: Modo Híbrido (Recomendado para desenvolvimento)

Crie um toggle para alternar entre mock e API:

```tsx
const USE_WORDPRESS = process.env.REACT_APP_USE_WORDPRESS === 'true';

export function ProductListing({ ... }: ProductListingProps) {
  const mockProducts = [...]; // Array atual
  
  const { products: wpProducts, loading } = useProducts({
    enabled: USE_WORDPRESS,
  });

  const products = USE_WORDPRESS ? wpProducts : mockProducts;
  
  // ... resto do código
}
```

No `.env`:
```env
REACT_APP_USE_WORDPRESS=true
```

## 🛒 Carrinho Implementado

### Funcionalidades

- ✅ Adicionar produtos ao carrinho
- ✅ Atualizar quantidades (+/-)
- ✅ Remover itens
- ✅ Cálculo automático de totais
- ✅ Persistência em localStorage
- ✅ Contador no header
- ✅ Modal lateral minimalista (design preto e branco)
- ✅ Redirecionamento para checkout do WooCommerce

### Sincronização com WooCommerce

O serviço de carrinho (`/src/app/services/cart.ts`) possui métodos preparados para sincronização:

```tsx
// Método disponível mas não implementado ainda
cartService.syncWithWooCommerce(cart);
```

Para implementar:
1. Use a [WooCommerce Store API](https://github.com/woocommerce/woocommerce/tree/trunk/plugins/woocommerce/src/StoreApi)
2. Crie sessão de carrinho
3. Sincronize itens antes do checkout

## 📝 Próximos Passos

### Funcionalidades Futuras

1. **Autenticação de Usuário**
   - Login/Registro
   - Área do cliente
   - Pedidos anteriores

2. **Busca de Produtos**
   - Implementar busca na API
   - Filtros avançados
   - Ordenação

3. **Detalhes do Produto**
   - Página individual de produto
   - Galeria de imagens
   - Variações (tamanhos, cores)

4. **Wishlist**
   - Salvar produtos favoritos
   - Compartilhar listas

5. **Checkout Customizado**
   - Checkout no próprio React (opcional)
   - Integração com gateways de pagamento

## 🔐 Segurança

### ⚠️ IMPORTANTE

1. **NUNCA** exponha suas chaves da API no código
2. **SEMPRE** use variáveis de ambiente (`.env`)
3. Adicione `.env` ao `.gitignore` (já configurado)
4. Use HTTPS em produção
5. As chaves da API devem ter permissões mínimas necessárias

### Proteção das Chaves

As chaves são codificadas em Basic Auth antes do envio:
```tsx
const credentials = btoa(`${consumerKey}:${consumerSecret}`);
Authorization: `Basic ${credentials}`
```

## 🐛 Troubleshooting

### Produtos não aparecem

1. Verifique se `.env` está configurado corretamente
2. Confirme que os produtos estão "Publicados" no WordPress
3. Verifique o console do navegador para erros de CORS
4. Teste a API manualmente com curl/Postman

### Erro de CORS

Adicione headers no WordPress (ver `/WORDPRESS_SETUP.md`)

### Carrinho não salva

1. Verifique se localStorage está habilitado
2. Teste em modo anônimo (sem extensões)
3. Limpe o cache do navegador

### Checkout não redireciona

1. Verifique se `REACT_APP_WP_URL` está correto no `.env`
2. Confirme que a página de checkout existe no WordPress

## 📚 Documentação Adicional

- [WooCommerce REST API Docs](https://woocommerce.github.io/woocommerce-rest-api-docs/)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)
- [WooCommerce Store API](https://github.com/woocommerce/woocommerce/tree/trunk/plugins/woocommerce/src/StoreApi)

## 💡 Dicas

1. Use React Developer Tools para inspecionar hooks
2. Use Redux DevTools para debug de estado (se implementar)
3. Monitore Network tab para requests da API
4. Configure logging no WordPress para debug

## ✨ Recursos Implementados

- ✅ Serviços de API WooCommerce
- ✅ Hooks React customizados
- ✅ Tipos TypeScript completos
- ✅ Gerenciamento de carrinho
- ✅ UI do carrinho (sidebar minimalista)
- ✅ Integração com checkout WooCommerce
- ✅ Persistência local (localStorage)
- ✅ Contador de itens no header
- ✅ Documentação completa

---

**Desenvolvido para Arterio** - E-commerce minimalista headless WordPress + React
