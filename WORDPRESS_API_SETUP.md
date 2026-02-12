# Configuração da API WordPress/WooCommerce - Arterio

Este guia explica como configurar a integração com WordPress e WooCommerce no projeto Arterio.

## 📋 Pré-requisitos

1. Site WordPress instalado e funcionando
2. Plugin WooCommerce instalado e ativo
3. HTTPS habilitado (recomendado para produção)

## 🔧 Configuração do WordPress/WooCommerce

### 1. Gerar Chaves da API WooCommerce

1. Acesse o painel administrativo do WordPress
2. Vá para: **WooCommerce** → **Configurações** → **Avançado** → **REST API**
3. Clique em **Adicionar chave**
4. Configure:
   - **Descrição**: `Arterio Frontend`
   - **Usuário**: Selecione um usuário administrador
   - **Permissões**: `Leitura` (ou `Leitura/Escrita` se precisar criar pedidos)
5. Clique em **Gerar chave da API**
6. **IMPORTANTE**: Copie e salve as chaves geradas:
   - Consumer Key
   - Consumer Secret

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# URL do seu site WordPress (sem barra final)
REACT_APP_WP_URL=https://seu-site-wordpress.com.br

# Chaves da API WooCommerce
REACT_APP_WC_CONSUMER_KEY=ck_xxxxxxxxxxxxxxxxxxxxx
REACT_APP_WC_CONSUMER_SECRET=cs_xxxxxxxxxxxxxxxxxxxxx
```

**Substitua os valores pelos dados do seu WordPress!**

### 3. Criar Páginas no WordPress

As seguintes páginas devem ser criadas no WordPress com os slugs corretos:

| Página | Slug no WordPress |
|--------|-------------------|
| Sobre | `sobre` |
| Contato | `contato` |
| Como Comprar | `como-comprar` |
| Entrega | `entrega` |
| Termos de Uso | `termos-de-uso` |
| Privacidade | `privacidade` |

**Como criar páginas:**
1. WordPress Admin → **Páginas** → **Adicionar nova**
2. Adicione o título e conteúdo
3. No painel direito, em **Permalink**, defina o slug correto
4. Clique em **Publicar**

### 4. Configurar Produtos no WooCommerce

1. Acesse **Produtos** → **Adicionar novo**
2. Preencha as informações:
   - Nome do produto
   - Descrição
   - Descrição curta
   - Preço
   - SKU (opcional)
   - Status do estoque (Em estoque / Fora de estoque)
   - Imagens do produto
3. Atribua categorias aos produtos

### 5. Configurar Categorias

As 8 categorias principais do Arterio:

1. Organização e Fixação
2. Fitas Adesivas
3. Elétrica e Conectores
4. Pilhas e Baterias
5. Químicos e Sprays
6. Papelaria
7. Higiene e Proteção
8. Ferramentas e Set

**Como criar categorias:**
1. WooCommerce → **Produtos** → **Categorias**
2. Adicione o nome da categoria
3. Adicione subcategorias conforme necessário

## 🚀 Como Funciona

### Produtos (WooCommerce API)

O componente `ProductListing` agora consome dados reais:

```tsx
// Busca produtos da API
const { products, loading, error } = useProducts({
  category: selectedCategory || undefined,
  perPage: 100,
});
```

**Estados:**
- ✅ **Loading**: Mostra skeleton loaders
- ❌ **Error**: Mostra mensagem de erro com detalhes
- ✅ **Success**: Renderiza produtos reais do WooCommerce

### Páginas (WordPress REST API)

As páginas institucionais agora podem usar conteúdo do WordPress:

```tsx
// Busca página do WordPress por slug
const { page, loading } = useWordPressPage("sobre");
```

**Fallback automático:**
- Se a página não existir no WordPress, o sistema usa conteúdo estático como fallback
- Exemplo: `About.tsx` tem conteúdo estático caso a API falhe

## 📦 Estrutura de Arquivos

```
/src/app
├── config
│   └── wordpress.ts          # Configuração da API
├── services
│   ├── woocommerce.ts        # Serviços WooCommerce
│   └── wordpress.ts          # Serviços WordPress
├── hooks
│   ├── useProducts.ts        # Hook para produtos
│   ├── useCategories.ts      # Hook para categorias
│   └── useWordPress.ts       # Hook para páginas WordPress
├── types
│   └── woocommerce.ts        # TypeScript types
└── components
    ├── ProductListing.tsx    # Lista de produtos (usa API)
    ├── WordPressPage.tsx     # Componente genérico para páginas WP
    └── About.tsx             # Página Sobre (com fallback)
```

## 🔍 Testando a Integração

### 1. Testar Conexão com API

Abra o console do navegador e verifique:

```javascript
// Deve mostrar a URL da API
console.log(process.env.REACT_APP_WP_URL);
```

### 2. Verificar Produtos

1. Navegue até a página de produtos
2. Verifique no console se há erros de API
3. Os produtos devem carregar da API do WooCommerce

### 3. Verificar Páginas

1. Navegue até "Sobre" ou outras páginas
2. Se a página existir no WordPress, o conteúdo será carregado da API
3. Caso contrário, o conteúdo estático será mostrado

## 🐛 Solução de Problemas

### Erro: "WooCommerce API Error: 401"

- **Causa**: Credenciais incorretas
- **Solução**: Verifique as chaves no arquivo `.env`

### Erro: "WordPress API Error: 404"

- **Causa**: Página não existe no WordPress
- **Solução**: Crie a página com o slug correto

### Erro: CORS

- **Causa**: WordPress bloqueando requisições de outro domínio
- **Solução**: Adicione ao `wp-config.php`:

```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
```

### Produtos não aparecem

1. Verifique se os produtos estão publicados (não em rascunho)
2. Verifique se o status do estoque está definido
3. Abra o console do navegador para ver erros

## 🔐 Segurança

### ⚠️ IMPORTANTE:

1. **Nunca commite o arquivo `.env`** com suas chaves reais
2. Use diferentes chaves para desenvolvimento e produção
3. Em produção, use variáveis de ambiente do servidor
4. As chaves do WooCommerce devem ter apenas permissão de **Leitura** se você não precisa criar pedidos via API

## 📚 Recursos Adicionais

- [WooCommerce REST API Docs](https://woocommerce.github.io/woocommerce-rest-api-docs/)
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [React Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)

## ✅ Checklist de Configuração

- [ ] WordPress instalado e funcionando
- [ ] WooCommerce instalado e ativo
- [ ] Chaves da API WooCommerce geradas
- [ ] Arquivo `.env` criado com as variáveis
- [ ] Páginas criadas no WordPress com slugs corretos
- [ ] Produtos cadastrados no WooCommerce
- [ ] Categorias configuradas
- [ ] Testado em desenvolvimento
- [ ] Variáveis de ambiente configuradas em produção

---

**Pronto!** Sua integração WordPress/WooCommerce está configurada. 🎉
