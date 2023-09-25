# Right-to-left

<p class="description">Learn how to make Material UI components support right-to-left languages such as Arabic, Persian, Hebrew, and others.</p>

## Introduction

Following the guide below, you'll learn how to turn text-based components in Material UI to right-to-left.

{{"demo": "Direction.js"}}

## Basic setup

### Global approach

Set the `dir` attribute on the `html` tag to `rtl` as the first step to support right-to-left languages.

```html
<html dir="rtl"></html>
```

If your React app doesn't control the root HTML element and you want to change the text direction at runtime, use the JavaScript API.

```js
document.dir = 'rtl';
```

### Local approach

To only make part of your app support right-to-left, use the `dir` attribute in that part's specific wrapper as an alternative to the global approach above.

:::warning
This won't work with portaled elements, such as Dialos, as they render outside of the element with the `dir` attribute.

To fix it, make sure to add the `dir` attribute directly to them:

```jsx
<Dialog dir="rtl">
  <MyComponent />
</Dialog>
```

:::

### Theme setup

Set the text direction in your theme with the `createTheme` API.

```js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  direction: 'rtl',
});
```

## Third-party plugins

Depending on the style engine you're using with Material UI, you'll need the support of different plugins to pull right-to-left off entirely.

### stylis-plugin-rtl

If you're using Emotion, Material UI's default style engine, or styled-component, install the [`stylis-plugin-rtl`](https://github.com/styled-components/stylis-plugin-rtl) to help flip the text direction.

<codeblock storageKey="package-manager">

```bash npm
npm install stylis stylis-plugin-rtl
```

```bash yarn
yarn add stylis stylis-plugin-rtl
```

```bash pnpm
pnpm add stylis stylis-plugin-rtl
```

</codeblock>

:::warning
Only Emotion is compatible with version 2 of the plugin.
styled-components requires version 1.
If you're using [styled-components instead of Emotion](/material-ui/guides/styled-components/), make sure to install the correct version.
:::

#### Emotion setup

If you're using Emotion, use the [CacheProvider](https://emotion.sh/docs/cache-provider) to create a new cache instance that uses the `stylis-plugin-rtl` (also include the default `prefixer` plugin to retain vendor prefixing) and add that to the top of your application tree.

```jsx
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

function RTL(props) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}
```

#### styled-components setup

If you're using styled-components, use the [StyleSheetManager](https://styled-components.com/docs/api#stylesheetmanager) and provide the stylis-plugin-rtl as an item to the `stylisPlugins` property.

```jsx
import { StyleSheetManager } from 'styled-components';
import rtlPlugin from 'stylis-plugin-rtl';

function RTL(props) {
  return (
    <StyleSheetManager stylisPlugins={[rtlPlugin]}>
      {props.children}
    </StyleSheetManager>
  );
}
```

### jss-rtl

In case you are using `jss` (up to v4) or with the legacy `@mui/styles` package, you need [`jss-rtl`](https://github.com/alitaheri/jss-rtl) to flip the styles.

<codeblock storageKey="package-manager">

```bash npm
npm install jss-rtl
```

```bash yarn
yarn add jss-rtl
```

```bash pnpm
pnpm add jss-rtl
```

</codeblock>

:::info
The `withStyles` API is internally using this plugin whtn `direction: rtl` is set on the theme.
:::

#### JSS setup

Start by configuring a JSS instance to load the plugin.
Then, make it available to all components by using the [`StylesProvider`](/system/styles/api/#stylesprovider) component.

```jsx
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@mui/styles';

// Configure JSS
const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

function RTL(props) {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
}
```

## Locally opting out of rtl

To opt out of right-to-left text in specific and local instances, follow the guides below for your styled engine.

### Emotion & styled-components

Use the template literal syntax and add the `/* @noflip */` directive before the rule or property for which you want to turn off the right-to-left styles.

```jsx
const AffectedText = styled('div')`
  text-align: left;
`;

const UnaffectedText = styled('div')`
  /* @noflip */
  text-align: left;
`;
```

{{"demo": "RtlOptOutStylis.js", "hideToolbar": true}}

### JSS

Use the `flip: false` at the beginning of a rule set.

```jsx
const useStyles = makeStyles(
  (theme) => ({
    affected: {
      textAlign: 'right',
    },
    unaffected: {
      flip: false,
      textAlign: 'right',
    },
  }),
  { defaultTheme },
);
```
