# Usage

<p class="description">Learn the basics of working with Joy UI components.</p>

## Quickstart

After [installation](/joy-ui/getting-started/installation/), you can import any Joy UI component and start playing around.
For example, try changing the `variant` on the [Button](/joy-ui/react-button/) to `soft` to see how the style changes:

{{"demo": "ButtonUsage.js", "defaultCodeOpen": true}}

## Globals

Since Joy UI components are built to function in isolation, they don't require any kind of globally scoped styles.
For a better user experience and developer experience, we recommend adding the following globals to your app.

### Responsive meta tag

Joy UI is a _mobile-first_ component library—we write code for mobile devices first, and then scale up the components as necessary using CSS media queries.

To ensure proper rendering and touch zooming for all devices, add the responsive viewport meta tag to your `<head>` element:

```html
<meta name="viewport" content="initial-scale=1, width=device-width" />
```

### CssBaseline

Joy UI provides an optional [CssBaseline](/joy-ui/react-css-baseline/) component.
It fixes some inconsistencies across browsers and devices while providing resets that are better tailored to fit Joy UI than alternative global style sheets like [normalize.css](https://github.com/necolas/normalize.css/).

### CssVarsProvider

Joy UI provides an optional `<CssVarsProvider />` component that unlocks a whole host of customization options powered by CSS variables.
Visit the [Using CSS variables](/joy-ui/customization/using-css-variables/) guide to learn more.

### Default font

Joy UI uses the Inter font by default.
See [Installation—Inter font](/joy-ui/getting-started/installation/#inter-font) for complete details.
