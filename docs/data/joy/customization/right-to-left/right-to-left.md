# Right-to-left

<p class="description">Learn how to make Joy UI components support right-to-left languages such as Arabic, Persian, Hebrew, and others.</p>

## Introduction

Following the guide below, you'll learn how to turn text-based components in Joy UI to right-to-left.

<!-- {{"demo": "Direction.js"}} -->

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
This won't work with portaled elements, such as Dialogs, as they render outside of the element with the `dir` attribute.

To fix it, make sure to add the `dir` attribute directly to them:

```jsx
<Dialog dir="rtl">
  <MyComponent />
</Dialog>
```

:::

## Third-party plugin

To pull right-to-left entirely, you need to use the [`stylis-plugin-rtl`](https://github.com/styled-components/stylis-plugin-rtl), to help flip the text direction.
Its usage varies slightly depending if you're using Emotion or styled-components as your styled engine.

### Installation

Run one of the following commands to add `stylis-plugin-rtl` to your project:

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
If you're using [styled-components instead of Emotion](/joy-ui/customization/styled-components-setup/), make sure to install the correct version.
:::

### Emotion setup

If you're using Emotion, use the [CacheProvider](https://emotion.sh/docs/cache-provider) to create a new cache instance that uses the `stylis-plugin-rtl` (also include the default `prefixer` plugin to retain vendor prefixing) and add that to the top of your application tree.

```jsx
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { CssVarsProvider } from "@mui/joy/styles";

// Create rtl cache
const cacheRtl = createCache({
  key: "joy-ui-rtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function RTL(props) {
    return (
    <CssVarsProvider>
      <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
    </StyleSheetManager>
  );
}
```

### styled-components setup

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

## Locally opting out of rtl

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

<!-- {{"demo": "RtlOptOutStylis.js", "hideToolbar": true}} -->
