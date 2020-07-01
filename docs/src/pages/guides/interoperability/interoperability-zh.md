# 样式库的互通性

<p class="description">当您可以使用 Materal-UI 提供的基于 JSS 的样式解决方案来装饰应用程序，也可以用您已经熟知和喜欢的工具（从纯 CSS 到 styled-components）。 </p>

本指南旨在归档当前比较流行的一些替代方案，但是您会发现在这里运用的法则，也可以在其他库里适用。 我们为以下的样式方案提供了一些示例：

- [纯 CSS](#plain-css)
- [全局 CSS](#global-css)
- [Styled Components](#styled-components)
- [CSS Modules](#css-modules)
- [Emotion](#css-modules)
- [React JSS](#emotion)

## 纯 CSS

没有什么特别花哨的，只是纯 CSS。

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/plain-css-mtzri)

**PlainCssButton.css**

```css
.button {
  background-color: #6772e5;
  color: #fff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
}
.button:hover {
  background-color: #5469d4;
}
```

**PlainCssButton.js**

```jsx
import React from 'react';
import Button from '@material-ui/core/Button';
import './PlainCssButton.css';

export default function PlainCssButton() {
  return (
    <div>
      <Button>默认的按钮</Button>
      <Button className="button">自定义按钮</Button>
    </div>
  );
}
```

### 控制的优先权 ⚠️

**请注意：** JSS 在 `<head>` 底部注入其样式表。 如果您不想使用 **!important** 来标记样式属性的话，则需要更改 [CSS 的注入顺序](/styles/advanced/#css-injection-order)，如下所示：

```jsx
import { StylesProvider } from '@material-ui/core/styles';

<StylesProvider injectFirst>
  {/* 你的组件树。
      现在，您可以覆盖 Material-UI 的样式。 */}
</StylesProvider>
```

### 更深层的元素

如果您尝试赋予 Drawer（抽屉）组件以永久的变体的样式，这很可能会影响到抽屉组件的子纸张元素。 但是，纸张元素不是抽屉组件的根元素，因此上面的自定义 styled-components 将不起作用。 您则需要使用 Material-UI 的 [`classes`](/styles/advanced/#overriding-styles-classes-prop) API 来达到目的。

以下示例除了自定义按钮本身的样式外，还会覆盖 `Button` 的`标签（label）`的样式。

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

**PlainCssButtonDeep.css**

```css
.button {
  background-color: #6772e5;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
}
.button:hover {
  background-color: #5469d4;
}
.button-label {
  color: #fff;
}
```

**PlainCssButtonDeep.js**

```jsx
import React from 'react';
import Button from '@material-ui/core/Button';
import './PlainCssButtonDeep.css';

export default function PlainCssButtonDeep() {
  return (
    <div>
      <Button>默认的</Button>
      <Button classes={{ root: 'button', label: 'button-label' }}>
        自定义的
      </Button>
    </div>
  );
}
```

## 全局 CSS

明确向提组件提供类名是不是太大费周章了？ [您可以定位到由 Material-UI 生成的类名](/styles/advanced/#with-material-ui-core)。

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/global-css-bir9e)

**GlobalCssButton.css**

```css
.MuiButton-root {
  background-color: #6772e5;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
}
.MuiButton-root:hover {
  background-color: #5469d4;
}
.MuiButton-label {
  color: #fff;
}
```

**GlobalCssButton.js**

```jsx
import React from 'react';
import Button from '@material-ui/core/Button';
import './GlobalCssButton.css';

export default function GlobalCssButton() {
  return <Button>自定义的</Button>;
}
```

### 控制的优先权 ⚠️

**请注意：** JSS 在 `<head>` 底部注入其样式表。 如果您不想使用 **!important** 来标记样式属性的话，则需要更改 [CSS 的注入顺序](/styles/advanced/#css-injection-order)，如下所示：

```jsx
import { StylesProvider } from '@material-ui/core/styles';

<StylesProvider injectFirst>
  {/* 你的组件树。
      现在，您可以覆盖 Material-UI 的样式。 */}
</StylesProvider>
```

## Styled Components

![stars](https://img.shields.io/github/stars/styled-components/styled-components.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/styled-components.svg?)

`styled()` 方法完美适用于我们所有的组件。

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/styled-components-r1fsr)

```jsx
import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(Button)`
  background-color: #6772e5;
  color: #fff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  &:hover {
    background-color: #5469d4;
  }
`;

export default function StyledComponents() {
  return (
    <div>
      <Button>默认的</Button>
      <StyledButton>自定义的</StyledButton>
    </div>
  );
}

```

### 控制的优先权 ⚠️

**请注意：** styled-components 和 JSS 都在 `<head>` 的底部注入其样式表。 若想要 styled-components 的样式在最后加载，我们推荐的最佳方法是更改 [CSS 的注入顺序](/styles/advanced/#css-injection-order)，如下演示：

```jsx
import { StylesProvider } from '@material-ui/core/styles';

<StylesProvider injectFirst>
  {/* 你的组件树。
      Now, you can override Material-UI's styles. */}
</StylesProvider>
      现在，您可以覆盖 Material-UI 的样式。 */}
</StylesProvider>
```

另外一个在 styled-components 中使用 `&&` 字符的方案则是通过重复类名来 [增强其优先级](https://www.styled-components.com/docs/advanced#issues-with-specificity)。 您应该避免使用 `!imporant`。

### 更深层的元素

如果您尝试赋予Drawer（抽屉）组件以永久的变体的样式，您很可能会需要涉及抽屉组件的子纸张元素。 但是，这不是抽屉组件的根元素，因此上面的样式组件自定义将不起作用。 您则需要使用 Material-UI 的 API 中的 [`classes`](/styles/advanced/#overriding-styles-classes-prop) 来达到目的。

以下示例除了按钮本身的自定义样式外，还会覆盖 `label` 的 `Button` 样式。 通过“消费”不应该传递到底层的那些属性，它还解决了 [这个 styled-components 问题](https://github.com/styled-components/styled-components/issues/439)，

{{"demo": "pages/guides/interoperability/StyledComponentsDeep.js"}}

```jsx
import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(Button)`
  background-color: #6772e5;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  &:hover {
    background-color: #5469d4;
  }
  & .MuiButton-label {
    color: #fff;
  }
`;

export default function StyledComponentsDeep() {
  return (
    <div>
      <Button>Default</Button>
      <StyledButton>Customized</StyledButton>
    </div>
  );
}
```

以上的例子依赖于 [默认的`类`的值](/styles/advanced/#with-material-ui-core)，但是您也可以提供自定义的类名：`.label`。

```jsx
import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(({ color, ...other }) => (
  <Button classes={{ label: 'label' }} {...other} />
))`
  background-color: #6772e5;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  &:hover {
    background-color: #5469d4;
  }
  & .label {
    color: #fff;
  }
`;

export default function StyledComponentsDeep() {
  return (
    <div>
      <Button>Default</Button>
      <StyledButton>Customized</StyledButton>
    </div>
  );
}
```

### 主题

Material-UI 有着一个丰富的主题架构，而您可以利用它来做一些颜色的处理，过渡动画，媒体查询等等。

我们鼓励在 Materal-UI 和您的样式之间分享相同的主题对象（theme object）。

```jsx
const StyledButton = styled(Button)`
  ${({ theme }) => `
  background-color: ${theme.palette.primary.main};
  color: #fff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 4px 10px;
  font-size: 13px;
  &:hover {
    background-color: ${darken(theme.palette.primary.main, 0.2)};
  }
  ${theme.breakpoints.up('sm')} {
    font-size: 14px;
    padding: 7px 14px;
  }
  `}
`;
```

{{"demo": "pages/guides/interoperability/StyledComponentsTheme.js"}}

### Portals（传送门组件）

[传送门组件](/components/portal/)提供了一种一流的方法，它将子元素渲染在其父组件的 DOM 层次结构之外的 DOM 节点中。 当您使用这样的 styled-components 规范其 CSS 的方式时，可能会遇到一些无法附着样式的问题。

例如，若您尝试用 `MenuProps` 属性来样式化 [Select](/components/selects/) 组件的 [Menu](/components/menus/)，您将需要将 `className` 属性传递到它的 DOM 层次结构之外渲染的元素当中。 下面的示例演示了一个变通办法：

```jsx
import React from 'react';
import styled from 'styled-components';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const StyledMenu = styled(({ className, ...props }) => (
  <Menu {...props} classes={{ paper: className }} />
))`
  box-shadow: none;
  border: 1px solid #d3d4d5;

  li {
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;
```

{{"demo": "pages/guides/interoperability/StyledComponentsPortal.js"}}

## CSS Modules

![stars](https://img.shields.io/github/stars/css-modules/css-modules.svg?style=social&label=Star)

鉴于它全权依赖于大家使用的打包方案，我们很难得知 [此种样式方案](https://github.com/css-modules/css-modules) 的市场占有率。

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/css-modules-3j29h)

**CssModulesButton.css**

```css
.button {
  background-color: #6772e5;
  color: #fff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
}
.button:hover {
  background-color: #5469d4;
}
```

**CssModulesButton.js**

```jsx
import React from 'react';
// webpack，parcel 或者其他会将 CSS 注入页面
import styles from './CssModulesButton.css';
import Button from '@material-ui/core/Button';

export default function CssModulesButton() {
  return (
    <div>
      <Button>默认</Button>
      <Button className={styles.button}>自定义</Button>
    </div>
  );
}
```

### Controlling priority ⚠️

**请注意：** JSS 在 `<head>` 底部注入其样式表。 如果您不想使用 **!important** 来标记样式属性的话，则需要更改 [CSS 的注入顺序](/styles/advanced/#css-injection-order)，如下所示：

```jsx
import { StylesProvider } from '@material-ui/core/styles';

<StylesProvider injectFirst>
  {/* 你的组件树。
      Now, you can override Material-UI's styles. */}
</StylesProvider>
      现在，您可以覆盖 Material-UI 的样式。 */}
</StylesProvider>
```

### 更深层的元素

如果您尝试赋予Drawer（抽屉）组件以永久的变体的样式，您很可能会需要涉及抽屉组件的子纸张元素。 但是，这不是抽屉组件的根元素，因此上面的样式组件自定义将不起作用。 您则需要使用 Material-UI 的 API 中的 [`classes`](/styles/advanced/#overriding-styles-classes-prop) 来达到目的。

以下示例除了按钮本身的自定义样式外，还会覆盖 `label` 的 `Button` 样式。

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

**CssModulesButtonDeep.css**

```css
.root {
  background-color: #6772e5;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
}
.root:hover {
  background-color: #5469d4;
}
.label {
  color: #fff;
}
```

**CssModulesButtonDeep.js**

```jsx
import React from 'react';
// webpack, parcel or else will inject the CSS into the page
import styles from './CssModulesButtonDeep.css';
import Button from '@material-ui/core/Button';

export default function CssModulesButtonDeep() {
  return (
    <div>
      <Button>Default</Button>
      <Button classes={styles}>Customized</Button>
    </div>
  );
}
```

## Emotion

![stars](https://img.shields.io/github/stars/emotion-js/emotion.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/emotion.svg?)

### `css` 属性

Emotion的 **css()** 方法与 Material-UI 无缝协作。

{{"demo": "pages/guides/interoperability/EmotionCSS.js", "hideToolbar": true}}

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/emotion-bgfxj)

```jsx
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Button from '@material-ui/core/Button';

export default function EmotionCSS() {
  return (
    <div>
      <Button>Default</Button>
      <Button
        css={css`
          background-color: #6772e5;
          color: #fff;
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
          padding: 7px 14px;
          &:hover {
            background-color: #5469d4;
          }
        `}
      >
        Customized
      </Button>
    </div>
  );
}
```

### 控制的优先权 ⚠️

**请注意：** JSS 在 `<head>` 底部注入其样式表。 如果您不想使用 **!important** 来标记样式属性的话，则需要更改 [CSS 的注入顺序](/styles/advanced/#css-injection-order)，如下所示：

```jsx
import { StylesProvider } from '@material-ui/core/styles';

<StylesProvider injectFirst>
  {/* 你的组件树。
      现在，您可以覆盖 Material-UI 的样式。 */}
</StylesProvider>
```

### 主题

Material-UI 有着一个丰富的主题架构，而您可以利用它来做一些颜色的处理，过渡动画，媒体查询等等。

我们鼓励在 Materal-UI 和您的样式之间分享相同的主题对象（theme object）。

```jsx
<Button
  css={theme => css`
    background-color: ${theme.palette.primary.main};
    color: #fff;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    padding: 4px 10px;
    font-size: 13px;
    &:hover {
      background-color: ${darken(theme.palette.primary.main, 0.2)};
    }
    ${theme.breakpoints.up('sm')} {
      font-size: 14px;
      padding: 7px 14px;
    }
  `}
>
  Customized
</Button>
```

{{"demo": "pages/guides/interoperability/EmotionTheme.js"}}

### `styled()` API

它会像 styled components 一样起作用。 您可以 [使用相同的指南](/guides/interoperability/#styled-components) 。