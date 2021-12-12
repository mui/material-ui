# 样式库的互通性

<p class="description">虽然您可以使用 Material-UI 提供的基于 emotion 的样式解决方案来自定义您的程序，但也可以使用您喜欢的其他方案（从普通的 CSS 到 styled-components）。</p>

本指南旨在归档当前比较流行的一些替代方案，但是您会发现在这里运用的法则，也可以在其他库里适用。 我们为以下的样式方案提供了一些示例：

- [纯 CSS](#plain-css)
- [全局 CSS](#global-css)
- [Styled Components](#styled-components)
- [CSS Modules](#css-modules)
- [Emotion](#css-modules)

## Plain CSS

没有什么特别花哨的，只是纯 CSS。

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/plain-css-fdue7)

**PlainCssSlider.css**

```css
.slider {
  color: #20b2aa;
}

.slider:hover {
  color: #2e8b57;
}
```

**PlainCssSlider.js**

```jsx
import * as React from 'react';
import Slider from '@mui/material/Slider';
import './PlainCssSlider.css';

export default function PlainCssSlider() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider defaultValue={30} className="slider" />
    </div>
  );
}
```

### CSS 注入顺序⚠️

**Note:** Most CSS-in-JS solutions inject their styles at the bottom of the HTML `<head>`, which gives MUI precedence over your custom styles. 如果你有移除 **!important** 的需求，那么就需要改变 CSS 注入顺序。 Here's a demo of how it can be done in MUI:

```jsx
import * as React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

export default function GlobalCssPriority() {
  return (
    <StyledEngineProvider injectFirst>
      {/* 您的组件树。 现在您可以覆盖 Material-UI 的样式。 */}
    </StyledEngineProvider>
  );
}
```

**注意：** 如果您使用的是 emotion 并且在您的程序中自定义了缓存，那么这将会覆盖 MUI 的缓存。 为了使注入顺序仍然正确，您需要添加前缀选项。 下面是一个示例：

```jsx
import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function PlainCssPriority() {
  return (
    <CacheProvider value={cache}>
      {这里编写你的组件树。 Now you can override MUI's styles. */}
    </CacheProvider>
  );
}
```

**Note:** If you are using styled-components and have `StyleSheetManager` with a custom `target`, make sure that the target is the first element in the HTML `<head>`. If you are curious to see how it can be done, you can take a look on the `StylesProvider` implementation in the `@mui/styled-engine-sc` package.

### 更深层的元素

如果你试图自定义滑块的样式，那么很可能会影响到滑块的一些子元素，例如滚动条的箭头（thumb）。 In MUI, all child elements have an increased specificity of 2: `.parent .child {}`. 所以在编写覆盖样式的时候，你也需要这样做。

以下示例除了覆盖滑块本身的自定义样式外，还覆盖了滑块的 `thumb` 样式。

{{"demo": "pages/guides/interoperability/StyledComponentsDeep.js", "hideToolbar": true}}

**PlainCssSliderDeep1.css**

```css
.slider {
  color: #20b2aa;
}

.slider:hover {
  color: #2e8b57;
}

.slider .MuiSlider-thumb {
  border-radius: 1px;
}
```

**PlainCssSliderDeep1.js**

```jsx
import * as React from 'react';
import Slider from '@mui/material/Slider';
import './PlainCssSliderDeep1.css';

export default function PlainCssSliderDeep1() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider defaultValue={30} className="slider" />
    </div>
  );
}
```

上面的演示依赖于 [默认的` className `值](/styles/advanced/#with-material-ui-core)，但是你也可以使用 `componentsProps` API 来提供你自己的类名。

**PlainCssSliderDeep2.css**

```css
.slider {
  color: #20b2aa;
}

.slider:hover {
  color: #2e8b57;
}

.slider .thumb {
  border-radius: 1px;
}
```

**PlainCssSliderDeep2.js**

```jsx
import * as React from 'react';
import Slider from '@mui/material/Slider';
import './PlainCssSliderDeep2.css';

export default function PlainCssSliderDeep2() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider
        defaultValue={30}
        className="slider"
        componentsProps={{ thumb: { className: 'thumb' } }}
      />
    </div>
  );
}
```

## Global CSS

明确向提组件提供类名是不是太大费周章了？ [您可以定位到由 Material-UI 生成的类名](/styles/advanced/#with-material-ui-core)。

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/global-classnames-dho8k)

**GlobalCssSlider.css**

```css
.MuiSlider-root {
  color: #20b2aa;
}

.MuiSlider-root:hover {
  color: #2e8b57;
}
```

**GlobalCssSlider.js**

```jsx
import * as React from 'react';
import Slider from '@mui/material/Slider';
import './GlobalCssSlider.css';

export default function GlobalCssSlider() {
  return <Slider defaultValue={30} />;
}
```

### CSS injection order ⚠️

**Note:** Most CSS-in-JS solutions inject their styles at the bottom of the HTML `<head>`, which gives MUI precedence over your custom styles. To remove the need for **!important**, you need to change the CSS injection order. Here's a demo of how it can be done in MUI:

```jsx
import * as React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

export default function GlobalCssPriority() {
  return (
    <StyledEngineProvider injectFirst>
      {/* Your component tree. Now you can override MUI's styles. */}
    </StyledEngineProvider>
  );
}
```

**Note:** If you are using emotion and have a custom cache in your app, that one will override the one coming from MUI. In order for the injection order to still be correct, you need to add the prepend option. Here is an example:

```jsx
import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function GlobalCssPriority() {
  return (
    <CacheProvider value={cache}>
      {/* 这里编写你的组件树。 Now you can override MUI's styles. */}
    </CacheProvider>
  );
}
```

**Note:** If you are using styled-components and have `StyleSheetManager` with a custom `target`, make sure that the target is the first element in the HTML `<head>`. If you are curious to see how it can be done, you can take a look on the `StylesProvider` implementation in the `@mui/styled-engine-sc` package.

### Deeper elements

If you attempt to style the Slider, you will likely need to affect some of the Slider's child elements, for example the thumb. In MUI, all child elements have an increased specificity of 2: `.parent .child {}`. When writing overrides, you need to do the same.

以下示例除了覆盖滑块本身的自定义样式外，还覆盖了滑块的 `thumb` 样式。

{{"demo": "pages/guides/interoperability/StyledComponentsDeep.js", "hideToolbar": true}}

**GlobalCssSliderDeep.css**

```css
.MuiSlider-root {
  color: #20b2aa;
}

.MuiSlider-root:hover {
  color: #2e8b57;
}

.MuiSlider-root .MuiSlider-thumb {
  border-radius: 1px;
}
```

**GlobalCssSliderDeep.js**

```jsx
import * as React from 'react';
import Slider from '@mui/material/Slider';
import './GlobalCssSliderDeep.css';

export default function GlobalCssSliderDeep() {
  return <Slider defaultValue={30} />;
}
```

## Styled Components

![stars](https://img.shields.io/github/stars/styled-components/styled-components.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/styled-components.svg)

### 改变默认的样式引擎

By default, MUI components come with emotion as their style engine. If, however, you would like to use `styled-components`, you can configure your app by following the [styled engine guide](/guides/styled-engine/#how-to-switch-to-styled-components) or starting with one of the example projects:

<!-- #default-branch-switch -->

- [Create React App with styled-components](https://github.com/mui-org/material-ui/tree/master/examples/create-react-app-with-styled-components)
- [Create React App with styled-components and typescript](https://github.com/mui-org/material-ui/tree/master/examples/create-react-app-with-styled-components-typescript)

Following this approach reduces the bundle size, and removes the need to configure the CSS injection order.

After the style engine is configured properly, you can use the [`styled()`](/system/styled/) utility from `@mui/material/styles` and have direct access to the theme.

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/styled-components-interoperability-w9z9d)

```jsx
import * as React from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const CustomizedSlider = styled(Slider)`
  color: #20b2aa;

  :hover {
    color: #2e8b57;
  }
`;

export default function StyledComponents() {
  return <CustomizedSlider defaultValue={30} />;
}
```

### Deeper elements

If you attempt to style the Slider, you will likely need to affect some of the Slider's child elements, for example the thumb. In MUI, all child elements have an increased specificity of 2: `.parent .child {}`. When writing overrides, you need to do the same.

The following examples override the slider's `thumb` style in addition to the custom styles on the slider itself.

{{"demo": "pages/guides/interoperability/StyledComponentsDeep.js", "defaultCodeOpen": true}}

The above demo relies on the [default `className` values](/styles/advanced/#with-material-ui-core), but you can provide your own class name with the `componentsProps` API.

```jsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';

const CustomizedSlider = styled((props) => (
  <Slider componentsProps={{ thumb: { className: 'thumb' } }} {...props} />
))`
  color: #20b2aa;

  :hover {
    color: #2e8b57;
  }

  & .thumb {
    border-radius: 1px;
  }
`;

export default function StyledComponentsDeep2() {
  return (
    <div>
      <Slider defaultValue={30} />
      <CustomizedSlider defaultValue={30} />
    </div>
  );
}
```

### Theme

By using the MUI theme provider, the theme will be available in the theme context of the styled engine too (emotion or styled-components, depending on your configuration).

> ⚠️ If you are **already** using a custom theme with styled-components or emotion, it might not be compatible with MUI's theme specification. If it's not compatible, you need to render MUI's ThemeProvider <b>first</b>. 这样做就可以确保主题结构的隔离。 This is ideal for the progressive adoption of MUI's components in the codebase.

You are encouraged to share the same theme object between MUI and the rest of your project.

```jsx
const CustomizedSlider = styled(Slider)(
  ({ theme }) => `
  color: ${theme.palette.primary.main};

  :hover {
    color: ${darken(theme.palette.primary.main, 0.2)};
  }
`,
);
```

{{“demo”：“pages/guides/interoperability/StyledComponentsTheme.js”}}

### Portals（传送门组件）

[传送门组件](/components/portal/)提供了一种一流的方法，它将子元素渲染在其父组件的 DOM 层次结构之外的 DOM 节点中。 当您使用这样的 styled-components 规范其 CSS 的方式时，可能会遇到一些无法附着样式的问题。

For example, if you attempt to style the `tooltip` generated by the [Tooltip](/components/tooltips/) component, you will need to pass along the `className` property to the element being rendered outside of it's DOM hierarchy. 下面的示例演示了一个变通办法：

```jsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))`
  & .MuiTooltip-tooltip {
    background: navy;
  }
`;
```

{{"demo": "pages/guides/interoperability/StyledComponentsPortal.js"}}

## CSS Modules

![stars](https://img.shields.io/github/stars/css-modules/css-modules.svg?style=social&label=Star)

鉴于它全权依赖于大家使用的打包方案，我们很难得知[此种样式方案](https://github.com/css-modules/css-modules)的市场占有率。

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/css-modules-nuyg8)

**CssModulesSlider.module.css**

```css
.slider {
  color: #20b2aa;
}

.slider:hover {
  color: #2e8b57;
}
```

**CssModulesSlider.js**

```jsx
import * as React from 'react';
import Slider from '@mui/material/Slider';
// webpack, parcel or else will inject the CSS into the page
import styles from './CssModulesSlider.module.css';

export default function CssModulesSlider() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider defaultValue={30} className={styles.slider} />
    </div>
  );
}
```

### CSS injection order ⚠️

**Note:** Most CSS-in-JS solutions inject their styles at the bottom of the HTML `<head>`, which gives MUI precedence over your custom styles. To remove the need for **!important**, you need to change the CSS injection order. Here's a demo of how it can be done in MUI:

```jsx
import * as React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

export default function GlobalCssPriority() {
  return (
    <StyledEngineProvider injectFirst>
      {/* Your component tree. Now you can override MUI's styles. */}
    </StyledEngineProvider>
  );
}
```

**Note:** If you are using emotion and have a custom cache in your app, that one will override the one coming from MUI. In order for the injection order to still be correct, you need to add the prepend option. Here is an example:

```jsx
import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function CssModulesPriority() {
  return (
    <CacheProvider value={cache}>
      {/* 这里编写你的组件 Now you can override MUI's styles. */}
    </CacheProvider>
  );
}
```

**Note:** If you are using styled-components and have `StyleSheetManager` with a custom `target`, make sure that the target is the first element in the HTML `<head>`. If you are curious to see how it can be done, you can take a look on the `StylesProvider` implementation in the `@mui/styled-engine-sc` package.

### Deeper elements

If you attempt to style the Slider, you will likely need to affect some of the Slider's child elements, for example the thumb. In MUI, all child elements have an increased specificity of 2: `.parent .child {}`. When writing overrides, you need to do the same.

The following examples override the slider's `thumb` style in addition to the custom styles on the slider itself.

{{"demo": "pages/guides/interoperability/StyledComponentsDeep.js", "hideToolbar": true}}

**CssModulesSliderDeep1.module.css**

```css
.slider {
  color: #20b2aa;
}

.slider:hover {
  color: #2e8b57;
}

.slider .MuiSlider-thumb {
  border-radius: 1px;
}
```

**CssModulesSliderDeep1.js**

```jsx
import * as React from 'react';
// webpack, parcel or else will inject the CSS into the page
import styles from './CssModulesSliderDeep1.module.css';
import Slider from '@mui/material/Slider';

export default function CssModulesSliderDeep1() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider defaultValue={30} className={styles.slider} />
    </div>
  );
}
```

The above demo relies on the [default `className` values](/styles/advanced/#with-material-ui-core), but you can provide your own class name with the `componentsProps` API.

**CssModulesSliderDeep2.module.css**

```css
.slider {
  color: #20b2aa;
}

.slider:hover {
  color: #2e8b57;
}

.slider .thumb {
  border-radius: 1px;
}
```

**CssModulesSliderDeep2.js**

```jsx
import * as React from 'react';
// webpack, parcel or else will inject the CSS into the page
import styles from './CssModulesSliderDeep2.module.css';
import Slider from '@mui/material/Slider';

export default function CssModulesSliderDeep2() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider
        defaultValue={30}
        className={styles.slider}
        componentsProps={{ thumb: { className: styles.thumb } }}
      />
    </div>
  );
}
```

## Emotion

![stars](https://img.shields.io/github/stars/emotion-js/emotion.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/@emotion/react.svg)

### `css` 属性

Emotion's **css()** method works seamlessly with MUI.

{{"demo": "pages/guides/interoperability/EmotionCSS.js", "defaultCodeOpen": true}}

### Theme

它会像 styled components 一样起作用。 您可以 [使用相同的指南](/guides/interoperability/#styled-components) 。

### `styled()` API

It works exactly like styled components. You can [use the same guide](/guides/interoperability/#styled-components).
