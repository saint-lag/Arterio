# Guia de Configuração WordPress Headless + WooCommerce

## 1. Configuração do WordPress

### Plugins Necessários

Instale e ative os seguintes plugins no WordPress:

1. **WooCommerce** - Para e-commerce
2. **WP REST API Controller** (opcional) - Para controle adicional da API
3. **JWT Authentication for WP REST API** (opcional) - Para autenticação de usuários

### Configurar CORS (Cross-Origin Resource Sharing)

Adicione ao arquivo `wp-config.php` ou use um plugin como "WP CORS":

```php
// Adicionar headers CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
```

Ou adicione ao `.htaccess`:

```apache
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
</IfModule>
```

## 2. Configurar WooCommerce REST API

### Gerar Chaves da API

1. Acesse: **WordPress Admin > WooCommerce > Settings > Advanced > REST API**
2. Clique em **"Add Key"**
3. Configure:
   - **Description**: "Arterio Headless Frontend"
   - **User**: Selecione um usuário administrador
   - **Permissions**: **Read/Write**
4. Clique em **"Generate API Key"**
5. **IMPORTANTE**: Copie e guarde em local seguro:
   - **Consumer Key** (ck_...)
   - **Consumer Secret** (cs_...)

### Testar API

Teste se a API está funcionando:

```bash
# Substitua os valores
curl https://seu-site.com.br/wp-json/wc/v3/products \
  -u consumer_key:consumer_secret
```

## 3. Configurar Permalinks

1. Acesse: **WordPress Admin > Settings > Permalinks**
2. Selecione: **"Post name"** ou qualquer opção exceto "Plain"
3. Salve as alterações

Isso é necessário para que a REST API funcione corretamente.

## 4. Configurar Frontend (React)

### Variáveis de Ambiente

1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```

2. Preencha com suas credenciais:
   ```env
   REACT_APP_WP_URL=https://seu-site-wordpress.com.br
   REACT_APP_WC_CONSUMER_KEY=ck_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   REACT_APP_WC_CONSUMER_SECRET=cs_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

3. **NUNCA** commite o arquivo `.env` para o Git (já está no .gitignore)

## 5. Estrutura de Categorias no WooCommerce

Configure suas categorias no WordPress Admin seguindo esta estrutura:

### Categorias Principais:

1. **Organização e Fixação**
   - Abraçadeiras Nylon
   - Velcro
   - Acessórios

2. **Fitas Adesivas**
   - Gaffer & Photo
   - Crepe & Artística
   - Demarcação
   - Técnicas
   - Dupla Face
   - Embalagem
   - Saúde

3. **Elétrica e Conectores**
   - Plugs e Adaptadores
   - Bocais
   - Conectores BNC
   - Filtros de Linha

4. **Pilhas e Baterias**
   - AA
   - AAA
   - 9V
   - CR2032

5. **Químicos e Sprays**
   - Limpeza
   - Manutenção
   - Efeitos Especiais

6. **Papelaria**
   - Escrita
   - Marcadores
   - Corte e Grampo
   - Diversos

7. **Higiene e Proteção**
   - Higiene Pessoal
   - Proteção Solar
   - Outros

8. **Ferramentas e Set**
   - Garras e Travas
   - Infraestrutura
   - Câmera/Lente
   - Organização

## 6. Adicionar Produtos

### Informações Obrigatórias:

- **Nome do Produto**
- **Preço Regular**
- **Descrição Curta** (aparece no card)
- **Status de Estoque**: Em estoque / Fora de estoque
- **Categoria**: Selecione a categoria apropriada
- **Imagem do Produto** (recomendado: 800x800px, fundo branco)

### Campos Opcionais:

- SKU
- Descrição Completa
- Galeria de Imagens
- Atributos (para variações)
- Tags

## 7. Checkout do WooCommerce

O checkout será feito diretamente no WordPress/WooCommerce:

1. Configure sua página de checkout: **WooCommerce > Settings > Advanced > Page Setup**
2. Configure métodos de pagamento: **WooCommerce > Settings > Payments**
3. Configure envio: **WooCommerce > Settings > Shipping**

Quando o usuário clicar em "Finalizar Compra" no frontend React, ele será redirecionado para:
```
https://seu-site.com.br/checkout
```

## 8. Segurança

### Recomendações:

1. ✅ Use HTTPS (SSL) obrigatoriamente
2. ✅ Mantenha WordPress e plugins atualizados
3. ✅ Use senhas fortes para API keys
4. ✅ Limite permissões da API ao mínimo necessário
5. ✅ Monitore logs de acesso à API
6. ✅ Configure firewall (Cloudflare, Sucuri, etc.)

### Plugins de Segurança Recomendados:

- **Wordfence Security**
- **Sucuri Security**
- **iThemes Security**

## 9. Performance

### Otimizações Recomendadas:

1. **Cache**:
   - WP Super Cache ou W3 Total Cache
   - Cache de objetos (Redis/Memcached)

2. **CDN**:
   - Cloudflare (gratuito)
   - AWS CloudFront

3. **Imagens**:
   - Plugin de otimização (Smush, ShortPixel)
   - Formato WebP

4. **Database**:
   - WP-Optimize para limpar database

## 10. Desenvolvimento Local

Para testar localmente:

1. Use **Local by Flywheel** ou **XAMPP**
2. Configure o arquivo `hosts`:
   ```
   127.0.0.1 arterio.local
   ```
3. Ajuste `.env` para apontar para localhost:
   ```env
   REACT_APP_WP_URL=http://arterio.local
   ```

## 11. Deploy em Produção

### Frontend (React):

- Vercel, Netlify ou hospedagem própria
- Configure variáveis de ambiente na plataforma

### Backend (WordPress):

- Hospedagem WordPress (WP Engine, Kinsta, SiteGround)
- Configure SSL
- Configure backups automáticos

## 12. Troubleshooting

### API retorna 401 Unauthorized:
- Verifique se as credenciais estão corretas
- Confirme que o usuário tem permissões adequadas

### API retorna 404:
- Verifique os permalinks
- Confirme que o WooCommerce está ativo

### CORS errors:
- Configure headers CORS no WordPress
- Use plugin WP CORS

### Produtos não aparecem:
- Verifique se produtos estão "Publicados"
- Confirme que `stock_status` está configurado
- Verifique as categorias

## Suporte

- Documentação WooCommerce REST API: https://woocommerce.github.io/woocommerce-rest-api-docs/
- WordPress REST API: https://developer.wordpress.org/rest-api/
- WooCommerce Store API: https://github.com/woocommerce/woocommerce/tree/trunk/plugins/woocommerce/src/StoreApi
