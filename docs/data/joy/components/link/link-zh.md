---
product: joy-ui
title: React Link component
components: Link
githubLabel: 'component: link'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/link/
---

# Link

<p class="description">The <code>Link</code> component allows you to customize anchor tags with theme colors and typography styles.</p>

## Introduction

The `Link` component represents the HTML `<a>` element. It accepts the same props as the [`Typography`](/joy-ui/react-typography/) component, as well as the system props.

{{"demo": "LinkUsage.js", "hideToolbar": true}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Link from '@mui/joy/Link';

export default function MyApp() {
  return <Link>Hello world!</Link>;
}
```

### As a button

To use the `Link` as a button, assign the `button` value to the `component` prop. It's useful doing it in two main situations:

1. The link doesn't have a meaningful href.
2. The design looks more a link rather than a button.

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

### With a typography

`Link` can be used as a child of the [`Typography`](/joy-ui/react-typography/) component. In that case, the link component will inherit the typographic level scale from its typography parent, unless a value for the `level` prop is specified.

{{"demo": "LinkAndTypography.js"}}

### With a card

Using the `Link` component as a card title, with the `overlay` prop, ensures proper accessibility when the whole card is clickable.

{{"demo": "LinkCard.js"}}

## Security

When using `target="_blank"` with links, it's [recommended](https://developers.google.com/web/tools/lighthouse/audits/noopener) to always set `rel="noopener"` or `rel="noreferrer"` when linking to a third-party content.

- `rel="noopener"` prevents the new page from being able to access the `window.opener` property and ensures it runs in a separate process. Without this, the target page can potentially redirect your page to a malicious URL.
- `rel="noreferrer"` has the same effect, but also prevents the _Referer_ header from being sent to a new page. ⚠️ Removing the referrer header will affect analytics.

## Accessibility

Here are a few tips for ensuring an accessible link component, based on [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/link/).

- **Copywriting**: Avoid generic words as call to action, such as "click here" or "go to". Instead, use [descriptive texts](https://developers.google.com/web/tools/lighthouse/audits/descriptive-link-text).
- **Design:** For a good user experience, links should stand out from the text on the page. Keeping the default `underline="always"` behavior is a safe bet.
- **Href:** If a link doesn't have a meaningful href, [it should be rendered using a `<button>` element](#as-button).

## Third-party routing library

Here's how you can use the link component with libraries that also provide their version of it.

### Next.js

Based on the [Links API reference documentation](https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag).

```js
import NextLink from 'next/link';
import JoyLink from '@mui/joy/Link';

<NextLink href="/docs" passHref>
  <JoyLink>Read doc</JoyLink>
</NextLink>;
```

### React router

Based on the [Link found in React router's latets version](https://reactrouter.com/docs/en/v6/components/link).

```js
import { Link as RouterLink } from 'react-router-dom';
import JoyLink from '@mui/joy/Link';

<JoyLink component={RouterLink} to="/docs">
  Read doc
</JoyLink>;
```

## Common examples

Examples showcasing how to compose designs with the `Link` component and others as decorators.

{{"demo": "DecoratorExamples.js"}}
