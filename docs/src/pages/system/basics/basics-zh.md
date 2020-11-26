# @material-ui/system

<p class="description">风格化系统 & 风格化的功能，来构建强大的设计系统。</p>

## 快速上手

`@material-ui/system` 提供了一些底层辅助函数，我们称之为 "*style functions*"，它们可以用于建立强大的设计系统。 以下是一些关键的功能：

- ⚛️ 可以在组件的属性中直接获取主题（theme）的值。
- 🦋 鼓励 UI 保持一致性。
- 🌈 轻松地写入响应式的风格。
- 🦎 可以和任何主题对象 (theme object) 结合使用。
- 💅 使用广为流行的 CSS-in-JS 样式方案。
- 📦 小于 [4KB 的压缩包](https://bundlephobia.com/result?p=@material-ui/system)。
- 🚀 [足够快](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-benchmark/README.md#material-uisystem)不会成为运行时的瓶颈。

值得关注的是，整个库都提供了纯的样式函数(无副作用的)，它们拥有这样的类型签名： `({ theme, ...style })=> style`，**仅此而已**。

### 演示

在*快速开始*章节的余下部分，我们会使用 **styled-components** 作为参考案例（来强调这个包的普及性)。 另外一个方案就是 [使用 JSS](#interoperability)。 以下的例子也都基于 Material-UI 的 **默认** [主题对象（theme object）](/customization/default-theme/)。

{{"demo": "pages/system/basics/Demo.js", "defaultCodeOpen": true}}

### 安装

```jsx
// 使用 npm
npm install @material-ui/system

// 使用 yarn
yarn add @material-ui/system
```

### 创建一个组件

若想使用 `Box` 组件，您得先创建一个。 首先，请将一个 `spacing` 和 `palette` 函数加入样式的参数。

```jsx
import styled from 'styled-components';
import { spacing, palette } from '@material-ui/system';

const Box = styled.div`${spacing}${palette}`;

export default Box;
```

此 Box 组件已支持全新的 [间距属性](/system/spacing/#api) 和 [颜色属性](/system/palette/#api)。 例如，你可以提供一个间距属性：`p` ，以及一个颜色属性： `color`。

```jsx
<Box p="1rem" color="grey">给我一些空间！</Box>
```

您可以用任何有效的 CSS 值来装饰这个组件。

### 主题

大多数的时候，你会想通过一个主题的值来提高 UI 的一致性。 最好的情况是你已经预设了一组间距和颜色的值。 导入您样式解决方案的 theme provider。

```jsx
import React from 'react'
import { ThemeProvider } from 'styled-components'

const theme = {
  spacing: 4,
  palette: {
    primary: '#007bff',
  },
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* 子组件 */}
    </ThemeProvider>
  )
}
```

现在，你可以提供一个间距的乘值：

```jsx
<Box p={1}>4px</Box>
<Box p={2}>8px</Box>
<Box p={-1}>-4px</Box>
```

以及一个主要颜色（primary color）：

```jsx
<Box color="primary">蓝色</Box>
```

### 全部包含

为了使 Box 组件更实用，我们已预置了一套样式函数，下面是一个完整的列表：

- [borders](/system/borders/#api)
- [display](/system/display/#api)
- [flexbox](/system/flexbox/#api)
- [palette](/system/palette/#api)
- [positions](/system/positions/#api)
- [shadows](/system/shadows/#api)
- [sizing](/system/sizing/#api)
- [spacing](/system/spacing/#api)
- [typography](/system/typography/#api)

如果你已经在使用 `@material-ui/core`，那么你可以使用 [Box 组件](/components/box/)（使用内嵌的 JSS）：

```jsx
import Box from '@material-ui/core/Box';
```

## 互操作性

`@material-ui/system` 适用于大多数 CSS-in-JS 库，包括了 JSS，styled-components，还有 emotion。

如果你已经在使用 `@material-ui/core`，我们推荐你使用 **JSS** 方案来最小化捆绑包的大小。

### JSS

{{"demo": "pages/system/basics/JSS.js", "defaultCodeOpen": true}}

### Styled components

{{"demo": "pages/system/basics/StyledComponents.js", "defaultCodeOpen": true}}

### Emotion

{{"demo": "pages/system/basics/Emotion.js", "defaultCodeOpen": true}}

## 响应式（Responsive）

**所有** 的属性都是响应式的，我们支持了 3 种不同的 API。 如下使用了断点（breakpoints）的主题结构，这些是默认的值，但是你也可以自行定制。

```js
const values = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

const theme = {
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    up: key => `@media (min-width:${values[key]}px)`,
  },
};
```

### Array

```jsx
<Box p={[2, 3, 4]} />

/**
 * 输出:
 *
 * padding: 16px;
 * @media (min-width: 600px) {
 *   padding: 24px;
 * }
 * @media (min-width: 960px) {
 *   padding: 32px;
 * }
 */
```

### Object

```jsx
<Box p={{ xs: 2, sm: 3, md: 4 }} />

/**
 * 输出:
 *
 * padding: 16px;
 * @media (min-width: 600px) {
 *   padding: 24px;
 * }
 * @media (min-width: 960px) {
 *   padding: 32px;
 * }
 */
```

### 搭配

如果你想对断点值进行分组，可以使用 `breakpoints()` 助手。

```jsx
import { compose, spacing, palette, breakpoints } from '@material-ui/system';
import styled from 'styled-components';

const Box = styled.div`
  ${breakpoints(
    compose(
      spacing,
      palette,
    ),
  )}
`;

<Box
  p={2}
  sm={{ p: 3 }}
  md={{ p: 4 }}
/>

/**
 * 输出:
 *
 * padding: 16px;
 * @media (min-width: 600px) {
 *   padding: 24px;
 * }
 * @media (min-width: 960px) {
 *   padding: 32px;
 * }
 */
```

{{"demo": "pages/system/basics/CollocationApi.js"}}

## 定制样式属性

### `style(options) => style function`

你可以使用这个助手来创建你自己的样式函数。

不是所有的 CSS 属性都是被支持的。 若你有这个想法支持新的属性，这也是有可能的。 而改变主题的路径前缀也是有可能性的。

#### 参数

1. `options` (*Object*): 
  - `options.prop` (*String*)：能够触发样式函数的属性。
  - `options.cssProperty` (*String|Boolean* [optional])：默认值是 `options.prop`。 这使用了 CSS 属性。 你可以传入 `false` 来禁用此选项。 禁用的情况下，这个属性的值会被作为样式对象应用于其本身。 它可以用来 [渲染变体（rendering variants）](#variants)。
  - `options.themeKey` (*String* [optional])：主题的路径前缀。
  - `options.transform` (*Function* [optional])：在输出 CSS 值之前应用一个转换。

#### 返回结果

`style function`：被创建的样式函数。

#### 例子

你可以创建一个组件来支持一些如 `grid-gap` 的 CSS 网格属性。 若将 `spacing` 作为 `themeKey` 提供，你可以重用该逻辑，从而实现我们在其他 spacing 属性（如 `padding`）中定义的行为。

```jsx
import styled from 'styled-components';
import { style } from '@material-ui/system';
import { Box } from '@material-ui/core';

const gridGap = style({
  prop: 'gridGap',
  themeKey: 'spacing',
});

const Grid = styled(Box)`${gridGap}`;
const example = <Grid display="grid" gridGap={[2, 3]}>...</Grid>;
```

你还可以同时添加 `prop` 和 `cssProperty` 来自定义属性名称，并使用 `transform` 函数来转换值。

```jsx
import styled from 'styled-components';
import { style } from '@material-ui/system';

const borderColor = style({
  prop: 'bc',
  cssProperty: 'borderColor',
  themeKey: 'palette',
  transform: value => `${value} !important`,
});

const Colored = styled.div`${borderColor}`;
const example = <Colored bc="primary.main">...</Colored>;
```

### `compose(...style functions) => style function`

将多个不同的样式函数合为一体。

#### 返回结果

`style function`：被创建的样式函数。

#### 例子

```js
import { style, compose } from '@material-ui/system'

export const textColor = style({
  prop: 'color',
  themeKey: 'palette',
});

export const bgcolor = style({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette',
});

const palette = compose(textColor, bgcolor);
```

## 变体

在一个主题中，`style()` 助手还可将属性映射到样式对象中去。 在这个例子中， `variant` 属性支持了所有 `theme.typography` 中呈现的键。

{{"demo": "pages/system/basics/Variant.js", "defaultCodeOpen": true}}

## CSS 属性

如果您想要自定义 CSS 的值，您可以使用 `css()` 助手。 它将会处理 `css` 属性。

{{"demo": "pages/system/basics/CssProp.js", "defaultCodeOpen": true}}

## 它是如何工作的

styled-system 在 [解释它是如何工作的](https://github.com/jxnblk/styled-system/blob/master/docs/how-it-works.md#how-it-works) 方面做得很好 。 它可以协助为这种 “style function” 概念建立一个心理模型。

## 实际用例

在实践中，一个 Box 组件可以节省我们很多时间。 在这个例子中，我们演示了如何搭建一个 Banner 组件。

{{"demo": "pages/system/basics/RealWorld.js", "bg": true}}

## 现有技术

`@material-ui/system` 从不同地方借鉴了一些想法和 API：

- [Tachyons](https://tachyons.io/)是第一批（2014年）促进了 [原子化使用 CSS 模式（Atomic CSS pattern）](https://css-tricks.com/lets-define-exactly-atomic-css/) （或者 Functional CSS）的 CSS 库。
- 之后相继推出了 Tachyons（2017年）以及 [Tailwind CSS](https://tailwindcss.com/)。 他们让 Atomic CSS 更受欢迎。
- [Twitter Bootstrap](https://getbootstrap.com/docs/4.1/utilities/borders/) 在 v2，v3，和 v4 中一步步介绍了原子化的类名（atomic class names）。 这种对 “助手类” 分组方式让他们得到启发。
- 在 React 世界中， [Styled System](https://github.com/jxnblk/styled-system) （2017年）是第一批推动样式函数的（style functions）。 它可以做出一个通用的 Box 组件，这种方式可以替换创建一个新元素时原子化的 CSS 以及一些辅助类。
- Pinterest、GitHub 和 Segment.io 等大型公司都在使用不同风格的相同方法： 
  - [Evergreen Box](https://evergreen.segment.com/components/layout-primitives/)
  - [Gestalt Box](https://pinterest.github.io/gestalt/#/Box)
  - [Primer Box](https://primer.style/components/docs/Box)
- 实际的操作和对象响应 API（object responsive API）是受到 [Smooth-UI 的系统](https://smooth-ui.smooth-code.com/docs-basics-system) 的启发。