# @material-ui/system

<p class="description">Styled system & style functions for building powerful design systems.</p>

## 开始

`@material-ui/system` 提供了一些底层工具函数，我们称之为 "*style functions*"，它们可以用于建立强大的设计系统。 以下是这个库的一些特点：

- ⚛️可以在组件的 props 上直接访问主题属性
- 🦋使得 UI 具有一致性
- 🌈可以方便的书写的响应式 (reponsive) 样式
- 🦎可以和任何主题对象 (theme object) 配合
- 💅使用广为流行的 CSS-in-JS 样式方案
- 📦体积小 [4KB gzipped](https://bundlephobia.com/result?p=@material-ui/system)
- 🚀 [快速](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-benchmark/README.md#material-uisystem)，性能不是运行时问题

值得关注的是，整个仓库的函数都是无副作用的(side-effect free)，它们拥有这样的类型签名： `({ theme, ...style })=> style<、0>。</p>

<h3>演示</h3>

<p>在<em>开始</em>章节的余下部分，我们会配合<strong>styled-components</strong> 作为演示例子(因为这个库具有普遍性)。 或者，你也可以使用 <a href="#interoperability">JSS</a>。
另外，以下的例子都直接使用了 Material-UI 的 <strong>默认</strong> <a href="/customization/default-theme/">主题对象</a>。</p>

<p>{{"demo": "pages/system/basics/Demo.js", "defaultCodeOpen": true}}</p>

<h3>安装</h3>

<pre><code class="jsx">// 使用 npm
npm install @material-ui/system

// 使用 yarn
yarn add @material-ui/system
`</pre> 

### 创建组件

首先我们来创建一个 `Box` 组件。 一开始，我们给他增加 `间距(spacing)` 和 `颜色(palette)` 两个样式参数。

```jsx
import styled from 'styled-components';
import { spacing, palette } from '@material-ui/system';

const Box = styled.div`${spacing}${palette}`;

export default Box;
```

这个 Box 组件现在就支持了 [间距属性](/system/spacing/#api) 和 [颜色属性](/system/palette/#api)。 例如，你可以提供一个间距属性：`p` 和一个颜色属性： `color`。

```jsx
<Box p="1rem" color="grey">Give me some space!</Box>
```

这个组件可以接受任何有效的CSS值作为样式。

### 主题

大部分时候，你会需要使用主题来保持 UI 的一致性， 那你会需要有一组预设好的间距和颜色值。 你可以使用主题提供者(theme provider) 来注入你的定制方案。

```jsx
import React from 'react'
import { ThemeProvider } from 'styled-components'

const theme = {
  spacing: 4,
  palette: {
    primary: '#007bff',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* children */}
    </ThemeProvider>
  )
}

export default App
```

现在，你可以提供一个乘数来乘上你预设的间距作为实际间距:

```jsx
<Box p={1}>4px</Box>
<Box p={2}>8px</Box>
<Box p={-1}>-4px</Box>
```

同时你也可以使用主色(primary color)：

```jsx
<Box color="primary">blue</Box>
```

### 其他

为了使 Box 组件更实用，我们已预置了一些样式函数，下面是完整列表：

- [borders](/system/borders/#api)
- [display](/system/display/#api)
- [flexbox](/system/flexbox/#api)
- [palette](/system/palette/#api)
- [positions](/system/positions/#api)
- [shadows](/system/shadows/#api)
- [sizing](/system/sizing/#api)
- [spacing](/system/spacing/#api)
- [typography](/system/typography/#api)

如果你已经在使用 `@material-ui/core`，你可以用我们 [预写好的 Box ](/components/box/)组件 (内部使用了 JSS)：

```jsx
import Box from '@material-ui/core/Box';
```

## 互操作性

`@material-ui/system` 适用于大多数 CSS-in-JS 库，包括 JSS, styled-components, 还有 emotion。

如果你已经在使用 `@material-ui/core`，我们推荐你使用 **JSS** 方案，这样有助于减少包大小。

### JSS

{{"demo": "pages/system/basics/JSS.js", "defaultCodeOpen": true}}

### Styled components

{{"demo": "pages/system/basics/StyledComponents.js", "defaultCodeOpen": true}}

### Emotion

{{"demo": "pages/system/basics/Emotion.js", "defaultCodeOpen": true}}

## 响应式(Responsive)

**所有** 的属性都是响应式的，我们支持3种不同的 Api。 如下的配置是默认断点(breakpoints) 配置，不过同时它们是可定制的。

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

### Collocation

如果你想要聚合一组断点值，可以使用我们的工具函数 `breakpoints()` 。

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
  sm={{ p: 3 } }
  md={{ p: 4 } }
/>

/**
 * Outputs:
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

## 定制样式属性

### `style(options) => style function`

你可以使用这个函数来创建你自己的样式工具。

我们没有支持所有CSS属性。 不过如果你想，你可以支持一个新的属性。 改变的主题路径的前缀也是可以的。

#### 参数

1. `options` (*Object*): 
  - `options.prop` (*String*)：指定样式函数会被什么属性触发
  - `options.cssProperty` (*String|Boolean* [optional]):默认是 `options.prop`。 使用 CSS 属性。 你可以传递`false`禁用它。 禁用的情况下，这个属性会被作为样式对象应用于本身。 它可以用来 [渲染变体(rendering variants)](#variants)。
  - `options.themeKey` (*String* [optional])：主题路径的前缀。
  - `options.transform` (*Function* [optional])：指定在输出 CSS 值之前经过的转换

#### 返回结果

`style function`：被创建的样式函数。

#### 例子

```js
import { style } from '@material-ui/system'

const borderColor = style({
  prop: 'bc',
  cssProperty: 'borderColor',
  themeKey: 'palette',
  transform: value => `${value} !important`,
});
```

### `compose(...style functions) => style function`

组合多个不同的样式函数。

#### 返回结果

`style function`：新的样式函数。

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

## 变种(Variants)

帮助函数 `style()` 也可用于根据主题来返回不同的属性给样式对象。 在在这个例子中， `variant` 属性可以是 `theme.typography` 对象的任意键(key)。

{{"demo": "pages/system/basics/Variant.js", "defaultCodeOpen": true}}

## CSS 属性

如果你想要自定义CSS值，可以使用`css()`， 它可以处理的 `css` 属性。

{{"demo": "pages/system/basics/CssProp.js", "defaultCodeOpen": true}}

## 它是如何工作的

风格的系统已经做了很多工作在 [解释它是如何工作的](https://github.com/jxnblk/styled-system/blob/master/docs/how-it-works.md#how-it-works)的。 它可以帮助建设一个心理模型对于这种"风格的功能"概念。

## 实际用例

在实践中，Box 组件可以节省我们很多时间。 在这个例子中，我们演示了如何做一个 Banner 组件。

{{"demo": "pages/system/basics/RealWorld.js"}}

## 现有技术

`@material-ui/system` 从不同地方借鉴了一些想法和 API：

- [Tachyons](https://tachyons.io/) (2014年) 是第一个促进了 [原子 CSS 模式(Atomic CSS pattern)](https://css-tricks.com/lets-define-exactly-atomic-css/) 发展的CSS库。
- TachyTachyons (2017年) 跟随了 [Tailwind CSS](https://tailwindcss.com/) 的脚步 他们让原子CSS更受欢迎。
- [Twitter Bootstrap](https://getbootstrap.com/docs/4.1/utilities/borders/) 在v2，v3, 和v4中一步步介绍了原子类名 他们使用 `Helper classes` 聚合它们的方式给了我们启发。
- 在 React 世界中， [Styled System](https://github.com/jxnblk/styled-system) (2017年) 是第一个推动样式函数的。 它可以做出一个通用的 Box 组件来已经衍生其他组件，这种方式可以替换原子CSS之中的辅助原子类的做法。
- Large companies such as Pinterest, GitHub, and Segment.io are using the same approach in different flavours: 
  - [Evergreen Box](https://evergreen.segment.com/components/layout-primitives/)
  - [Gestalt Box](https://pinterest.github.io/gestalt/#/Box)
  - [Primer Box](https://primer.style/components/docs/Box)
- 实际实现 和 对象响应API(object responsive API) 受到 [Smooth-UI's system](https://smooth-ui.smooth-code.com/docs-basics-system)的启发。