# Right-to-left

<p class="description">Right-to-left languages such as Arabic, Persian, or Hebrew are supported. To change the direction of Material-UI components you must follow the following steps.</p>

## Steps

### 1. HTML

Make sure the `dir` attribute is set on the body, otherwise native components will break:

```html
<body dir="rtl"></body>
```

### 2. stylis-plugin-rtl

You need this stylis plugin to flip the styles: [stylis-plugin-rtl](https://github.com/styled-components/stylis-plugin-rtl).

```sh
npm install stylis-plugin-rtl@^1
```

Note: both emotion and styled-components currently work with the v1 of the plugin.

Having installed the plugin in your project, Material-UI components still require it to be loaded by the style engine instance that you use. Find bellow guides on how you can configure it for `@emotion` and `styled-components`

#### 2.1. configuring @emotion to use the stylis-plugin-rtl

If you use emotion as your style engine, you should create new cache instance that uses the `stylis-plugin-rtl` and provide that on the top of your application tree. The [CacheProvider](https://emotion.sh/docs/cache-provider) component enables this:

```jsx
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/core';
import createCache from '@emotion/cache';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
  speedy: true,
});

function RTL(props) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}
```

#### 2.2. configuring styled-components to use the stylis-plugin-rtl

If you use `styled-components` as your style engine, you can use the [StyleSheetManager](https://styled-components.com/docs/api#stylesheetmanager) and provide the stylis-plugin-rtl as an item in the `stylisPlugins` property:

```jsx
import { StyleSheetManager } from "styled-components";
import rtlPlugin from "stylis-plugin-rtl";

function RTL(props) {
  return (
    <StyleSheetManager stylisPlugins={[rtlPlugin]}>
      {props.children}
    </StyleSheetManager>
  );
}
```

## Demo

TODO

_Use the direction toggle button on the top right corner to flip the whole documentation_

{{"demo": "pages/guides/right-to-left/Direction.js"}}

## Opting out of rtl transformation

TODO

If you want to prevent a specific rule-set from being affected by the `rtl` transformation you can add `flip: false` at the beginning.

_Use the direction toggle button on the top right corner to see the effect._

{{"demo": "pages/guides/right-to-left/RtlOptOut.js", "hideEditButton": true}}
