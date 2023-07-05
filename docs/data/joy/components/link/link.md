---
productId: joy-ui
title: React Link component
components: Link
githubLabel: 'component: link'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/link/
---

# Link

<p class="description">The Link component allows you to customize anchor tags with theme colors and typography styles.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Introduction

The Joy UI Link component replaces the native HTML `<a>` element, and accepts the same props as the [Typography](/joy-ui/react-typography/) component, as well as the system props.

{{"demo": "LinkUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Basics

```jsx
import Link from '@mui/joy/Link';
```

The Joy UI Link behaves similar to the native HTML `<a>`, so it renders by default with an underline and has no background color on hover.

The demo below shows the two basic states available to the Link: default and disabled.
Don't forget to always assign an `href` assigned to it.

{{"demo": "BasicsLink.js"}}

## Customization

### Variants

The Link component supports Joy UI's four global variants: plain (default), soft, outlined, and solid.

:::info
However, even though it has a default variant set, it will render, by default, without any variant. That is to adhere to stanrdard link visual design on the web (no background color on hover).
:::

{{"demo": "LinkVariants.js"}}

:::info
To learn how to add your own variants, check out [Themed components—Extend variants](/joy-ui/customization/themed-components/#extend-variants).
Note that you lose the global variants when you add custom variants.
:::

### Levels

The Link component comes with all the Typography levels to choose from.

{{"demo": "LinkLevels.js"}}

### Colors

Every palette included in the theme is available via the `color` prop.
Play around combining different colors with different variants.

{{"demo": "LinkColors.js"}}

### Underline

Use the `underline` prop to control how the underline behaves on the Link component.
It comes with three values: `hover`, `always`, and `none`.

{{"demo": "LinkUnderline.js"}}

### Disabled

Use the `disabled` prop to disable interaction and focus:

{{"demo": "LinkDisabled.js"}}

### Overlay prop

Use the `overlay` prop to make an entire component clickable as a link.
The demo below shows how to use that with the Card component, ensuring proper accessibility.

{{"demo": "LinkCard.js"}}

### As a button

To use the Link component as a button, assign the `button` value to the `component` prop.
That can be useful in two main situations:

1. The link doesn't have a meaningful href.
2. The design looks more like a button rather than a link.

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

The Link component can be used as a child of the [Typography](/joy-ui/react-typography/) component.
In that case, the Link will inherit the typographic level scale from its Typography parent, unless a value for the `level` prop is specified.

{{"demo": "LinkAndTypography.js"}}

## Third-party routing library

Here's how you can use the Link component with libraries that also provide their version of it.

### Next.js

Here is an example with the [Link component](https://nextjs.org/docs/api-reference/next/link) of Next.js:

```js
import NextLink from 'next/link';
import Link from '@mui/joy/Link';

<NextLink href="/docs" passHref>
  <Link>Read doc</Link>
</NextLink>;
```

### React Router

Here is an example with the [Link component](https://reactrouter.com/en/main/components/link) of React Router:

```js
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/joy/Link';

<Link component={RouterLink} to="/docs">
  Read doc
</Link>;
```

## Security

When using `target="_blank"` with links, it's [recommended](https://developers.google.com/web/tools/lighthouse/audits/noopener) to always set `rel="noopener"` or `rel="noreferrer"` when linking to a third-party content.

- `rel="noopener"` prevents the new page from being able to access the `window.opener` property and ensures it runs in a separate process.
  Without this, the target page can potentially redirect your page to a malicious URL.
- `rel="noreferrer"` has the same effect, but also prevents the _Referer_ header from being sent to a new page.
  ⚠️ Removing the referrer header will affect analytics.

## Accessibility

Here are a few tips for ensuring an accessible link component, based on [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/link/).

- **Copywriting**: Avoid generic words as call to action, such as "click here" or "go to".
  Instead, use [descriptive texts](https://developers.google.com/web/tools/lighthouse/audits/descriptive-link-text).
- **Design:** For a good user experience, links should stand out from the text on the page.
  Keeping the default `underline="always"` behavior is a safe bet.
- **Href:** If a link doesn't have a meaningful href, [it should be rendered using a `<button>` element](#as-button).

## Common examples

Examples showcasing how to compose designs with the `Link` component and others as decorators.

{{"demo": "DecoratorExamples.js"}}
