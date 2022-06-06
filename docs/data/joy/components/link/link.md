---
product: joy-ui
title: React Link component
githubLabel: 'component: link'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/link/
---

# Link

<p class="description">The Link component allows you to easily customize anchor elements with your theme colors and typography styles.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic

The Link represents the html anchor element. It accepts the same props as the [`Typography`](/joy-ui/react-typography/) component (the system props are also included).

{{"demo": "Links.js"}}

## Underline

The `underline` prop can be used to set the underline behavior. The default is `always`.

{{"demo": "UnderlineLink.js"}}

## As button

You might want to use this approach when:

- The link doesn't have a meaningful href.
- The design leans toward the link than the [`Button`](/joy-ui/react-button/).

```js
<Link
  component="button"
  onClick={() => {
    // ...process something
  }}
>
  Do something
</Link>
```

## Security

When you use `target="_blank"` with Links, it is [recommended](https://developers.google.com/web/tools/lighthouse/audits/noopener) to always set `rel="noopener"` or `rel="noreferrer"` when linking to third party content.

- `rel="noopener"` prevents the new page from being able to access the `window.opener` property and ensures it runs in a separate process.
  Without this, the target page can potentially redirect your page to a malicious URL.
- `rel="noreferrer"` has the same effect, but also prevents the _Referer_ header from being sent to the new page.
  ⚠️ Removing the referrer header will affect analytics.

## Third-party routing library

### [Next.js](https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag)

```js
import NextLink from 'next/link';
import JoyLink from '@mui/joy/Link';

<NextLink href="/docs" passHref>
  <JoyLink>Read doc</JoyLink>
</NextLink>;
```

### [React router](https://reactrouter.com/docs/en/v6/components/link)

```js
import { Link as RouterLink } from 'react-router-dom';
import JoyLink from '@mui/joy/Link';

<JoyLink component={RouterLink} to="/docs">
  Read doc
</JoyLink>;
```

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/link/)

- When providing the content for the link, avoid generic descriptions like "click here" or "go to".
  Instead, use [specific descriptions](https://developers.google.com/web/tools/lighthouse/audits/descriptive-link-text).
- For the best user experience, links should stand out from the text on the page. For instance, you can keep the default `underline="always"` behavior.
- If a link doesn't have a meaningful href, [it should be rendered using a `<button>` element](#as-button).
