---
product: joy-ui
title: React Link component
githubLabel: 'component: link'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/link/
---

# Link

<p class="description">The <code>Link</code> component allows you to customize anchor tags with theme colors and typography styles.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

`Link` represents the HRML anchor element.

It accepts the same props as the [`Typography`](/joy-ui/react-typography/) component as well as the system props.

{{"demo": "LinkUsage.js", "hideToolbar": true}}

## As a button

It's possible to use the `Link` component as a button too.
You might want to use this approach when:

- The link doesn't have a meaningful href.
- The design looks more a link rather than the [`Button`](/joy-ui/react-button/).

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

## With Typography

`Link` can be used as a child of the [`Typography`](/joy-ui/react-typography/) component.
In that case, the link component will inherit the typographic level scale from its typography parent, unless a value for the `level` prop is specified.

{{"demo": "LinkAndTypography.js"}}

## With the Card

When creating a card that has a entirely clickable surface, in order to have it accessible, use the `Link` component as the card's title.
Then, specify the `overlay` prop to expand the clickable area to the whole card surface.

This way, you assure that the whole card can be focused and also preserves correct semantic.

{{"demo": "LinkCard.js"}}

## Security

When using `target="_blank"` with links, it's [recommended](https://developers.google.com/web/tools/lighthouse/audits/noopener) to always set `rel="noopener"` or `rel="noreferrer"` when linking to a third-party content.

- `rel="noopener"` prevents the new page from being able to access the `window.opener` property and ensures it runs in a separate process.
  Without this, the target page can potentially redirect your page to a malicious URL.
- `rel="noreferrer"` has the same effect, but also prevents the _Referer_ header from being sent to a new page.
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

- Avoid generic link call to action, such as "click here" or "go to".
  Instead, use [specific descriptions](https://developers.google.com/web/tools/lighthouse/audits/descriptive-link-text).
- For an optimal user experience, links should stand out from the text on the page.
  Keeping the default `underline="always"` behavior is a safe bet.
- If a link doesn't have a meaningful href, [it should be rendered using a `<button>` element](#as-button).

## Common examples

These are examples that demonstrate using the `Link` component together with other components as decorators.

{{"demo": "DecoratorExamples.js"}}
