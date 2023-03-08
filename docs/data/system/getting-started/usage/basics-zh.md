# Material-UI 系统（System）

<p class="description">用于快速布置自定义设计的 CSS 工具集。</p>

MUI 核心配备了几十个**可随时使用**的组件。 这些组件是一个极好的起点，但当涉及到通过定制设计使你的网站脱颖而出时，从一个没有风格的状态开始可能会更简单。 系统介绍：

**系统**让你可以利用主题中所定义的值来快速构建自定义 UI 组件。

## 演示

_（调整窗口大小以查看响应的断点）_

{{"demo": "Demo.js", "bg": true, "defaultCodeOpen": true}}

## 安装

<!-- #default-branch-switch -->

To install and save in your `package.json` dependencies, run the command below using **npm**:

```sh
npm install @mui/system @emotion/react @emotion/styled
```

Or **yarn**:

```sh
yarn add @mui/system @emotion/react @emotion/styled
```

Or if you want to use `styled-components` as a styling engine:

<!-- #default-branch-switch -->

```sh
npm install @mui/system @mui/styled-engine-sc styled-components
```

```sh
yarn add @mui/system @mui/styled-engine-sc styled-components
```

Take a look at the [Styled Engine guide](/material-ui/guides/styled-engine/) for more information about how to configure `styled-components` as the style engine.

## 为什么要使用系统？

Compare how the same stat component can be built with two different APIs.

{{"demo": "Why.js", "bg": true, "defaultCodeOpen": false}}

1. ❌ 使用 styled-components's API：

```jsx
const StatWrapper = styled('div')(
  ({ theme }) => `
  background-color: ${theme.palette.background.paper};
  box-shadow: ${theme.shadows[1]};
  border-radius: ${theme.shape.borderRadius}px;
  padding: ${theme.spacing(2)};
  min-width: 300px;
`,
);

const StatHeader = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.text.secondary};
`,
);

const StyledTrend = styled(TrendingUpIcon)(
  ({ theme }) => `
  color: ${theme.palette.success.dark};
  font-size: 16px;
  vertical-alignment: sub;
`,
);

const StatValue = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.text.primary};
  font-size: 34px;
  font-weight: ${theme.typography.fontWeightMedium};
`,
);

const StatDiff = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.success.dark};
  display: inline;
  font-weight: ${theme.typography.fontWeightMedium};
  margin-left: ${theme.spacing(0.5)};
  margin-right: ${theme.spacing(0.5)};
`,
);

const StatPrevious = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.text.secondary};
  display: inline;
  font-size: 12px;
`,
);

return (
  <StatWrapper>
    <StatHeader>Sessions</StatHeader>
    <StatValue>98.3 K</StatValue>
    <StyledTrend />
    <StatDiff>18.77%</StatDiff>
    <StatPrevious>vs last week</StatPrevious>
  </StatWrapper>
);
```

2. ✅ 使用系统：

```jsx
<Box
  sx={{
    bgcolor: 'background.paper',
    boxShadow: 1,
    borderRadius: 1,
    p: 2,
    minWidth: 300,
  }}
>
  <Box sx={{ color: 'text.secondary' }}>Sessions</Box>
  <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
    98.3 K
  </Box>
  <Box
    component={TrendingUpIcon}
    sx={{ color: 'success.dark', fontSize: 16, verticalAlign: 'sub' }}
  />
  <Box
    sx={{
      color: 'success.dark',
      display: 'inline',
      fontWeight: 'medium',
      mx: 0.5,
    }}
  >
    18.77%
  </Box>
  <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 12 }}>
    vs. last week
  </Box>
</Box>
```

### 问题已经解决

The system focus on solving 3 main problems:

**1. Switching context wastes time.**

There's no need to constantly jump between the usage of the styled components and where they are defined. With the system, those descriptions are right where you need them.

**2. Naming things is hard.**

Have you ever found yourself struggling to find a good name for a styled component? The system maps the styles directly to the element. All you have to do is worry about actual style properties.

**3. Enforcing consistency in UIs is hard.**

This is especially true when more than one person is building the application, as there has to be some coordination amongst members of the team regarding the choice of design tokens and how they are used, what parts of the theme structure should be used with what CSS properties, and so on.

The system provides direct access to the value in the theme. It makes it easier to design with constraints.

## `sx` 属性

The `sx` prop, as the main part of the system, solves these problems by providing a fast & simple way of applying the correct design tokens for specific CSS properties directly to a React element. The [demo above](#demo) shows how it can be used to create a one-off design.

This prop provides a superset of CSS (contains all CSS properties/selectors in addition to custom ones) that maps values directly from the theme, depending on the CSS property used. Also, it allows a simple way of defining responsive values that correspond to the breakpoints defined in the theme. For more details, visit the [`sx` prop page](/system/getting-started/the-sx-prop/).

### 何时使用？

- **styled-components**：该 API 适用于构建需要支持各种上下文的组件。 这些组件将被应用在许多不同的部位，支持不同的属性组合。
- **`sx` 属性**：该 API 非常适合创造一次性的样式。 因此它被叫做“工具集”。

### 性能开销

The system relies on CSS-in-JS. It works with both Emotion and styled-components.

Pros:

- 📚 它允许 API 具有很大的灵活性。 `sx` 属性支持 CSS 的超集。 所以**不需要重学 CSS**。 只要你学会了标准化的 CSS 语法，就可以了，很安全，十年来都没有变化。 当然如果你想要节省时间的话，也可以**选择**学习速记语法。
- 📦 自动清除。 只有页面上使用过的 CSS 才会被发送到客户端。 所以初始化该捆绑包的大小成本是**灵活的**。 它的大小不会随着使用 CSS 属性的数量变多而同时增长。 你只需承担 [@emotion/react](https://bundlephobia.com/package/@emotion/react) 以及 [@mui/system](https://bundlephobia.com/package/@mui/system)的空间大小. 在 gzip 的环境下，它们大概占用约 15kb 的空间。 It cost around ~15 kB gzipped. 如果你已经正在使用核心组件，那么将不会带来额外的捆绑包资源占用。

Cons:

- 运行时会造成性能影响：

  | 基准测试                          | 代码片段                        | 花费时间  |
  |:----------------------------- |:--------------------------- | ----- |
  | a. Render 1,000 primitives    | `<div className="…">` | 100ms |
  | b. b. b. b. b. 渲染 1,000 个组件   | `<Div>`               | 120ms |
  | c. c. c. c. c. 渲染 1,000 个样式组件 | `<StyledDiv>`         | 160ms |
  | d. Render 1,000 Box           | `<Box sx={…}>`        | 370ms |

<!-- #default-branch-switch -->

_Head to the [benchmark folder](https://github.com/mui/material-ui/tree/master/benchmark/browser) for a reproduction of these metrics._

We believe that for most uses it's **fast enough**, but there are simple workarounds when performance becomes critical. For instance, when rendering a list with many items, you can use a CSS child selector to have a single "style injection" point (using d. for the wrapper and a. for each item).

### API 权衡

Having the system under one prop (`sx`) helps to differentiate props defined for the sole purpose of CSS utilities, vs. those for component business logic. It's important for the **separation of concerns**. For instance, a `color` prop on a button impacts multiple states (hover, focus, etc.), not to be confused with the color CSS property.

Only the `Box`, `Stack`, `Typography`, and `Grid` components accept the system properties as _props_ for the above reason. These components are designed to solve CSS problems, they are CSS component utilities.

## 使用

### 主题中的设计标记

You can explore the [System properties](/system/properties/) page to discover how the different CSS (and custom) properties are mapped to the theme keys.

### 速记语法

There are lots of shorthands available for the CSS properties. These are documented in the next pages, for instance, [the spacing](/system/spacing/). Here is an example leveraging them:

```jsx
<Box
  sx={{
    boxShadow: 1, // theme.shadows[1]
    color: 'primary.main', // theme.palette.primary.main
    m: 1, // margin: theme.spacing(1)
    p: {
      xs: 1, // [theme.breakpoints.up('xs')]: { padding: theme.spacing(1) }
    },
    zIndex: 'tooltip', // theme.zIndex.tooltip
  }}
>
```

These shorthands are **optional**, they are great to save time when writing styles but it can be overwhelming to learn new custom APIs. You might want to skip this part and bet on CSS, it has been standardized for decades, head to the [next section](#superset-of-css).

### CSS 超集

As part of the prop, you can use any regular CSS too: child or pseudo-selectors, media queries, raw CSS values, etc. Here are a few examples:

- 使用伪类选择器：

  ```jsx
  <Box
    sx={{
      // some styles
      ":hover": {
        boxShadow: 6,
      },
    }}
  >
  ```

- 使用媒体查询：

  ```jsx
  <Box
    sx={{
      // some styles
      '@media print': {
        width: 300,
      },
    }}
  >
  ```

- 使用嵌套选择器：

  ```jsx
  <Box
    sx={{
      // some styles
      '& .ChildSelector': {
        bgcolor: 'primary.main',
      },
    }}
  >
  ```

### 响应式的值

If you would like to have responsive values for a CSS property, you can use the breakpoints shorthand syntax. There are two ways of defining the breakpoints:

#### 1. 1. 1. 1. 1. 将断点作为对象

The first option for defining breakpoints is to define them as an object, using the breakpoints as keys. Note that each breakpoint property matches the breakpoint and every larger breakpoint. For example, `width: { lg: 100 }` is equivalent to `theme.breakpoints.up('lg')`. Here is the previous example again, using the object syntax.

{{"demo": "BreakpointsAsObject.js"}}

#### 2. Breakpoints as an array

The second option is to define your breakpoints as an array, from the smallest to the largest breakpoint.

{{"demo": "BreakpointsAsArray.js"}}

> ⚠️ 只有当主题的断点数量有限时，才建议使用这个选项，例如 3.<br />。 如果你需要使用更多的断点，那么首选对象 API。 例如，MUI 默认主题设为 5。

You can skip breakpoints with the `null` value:

```jsx
<Box sx={{ width: [null, null, 300] }}>This box has a responsive width.</Box>
```

### 自定义断点

You can also specify your own custom breakpoints, and use them as keys when defining the breakpoints object. Here is an example of how to do that.

```jsx
import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
});

export default function CustomBreakpoints() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: {
            mobile: 100,
            laptop: 300,
          },
        }}
      >
        This box has a responsive width
      </Box>
    </ThemeProvider>
  );
}
```

If you are using TypeScript, you will also need to use [module augmentation](/material-ui/guides/typescript/#customization-of-theme) for the theme to accept the above values.

```ts
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    tablet: true; // adds the `tablet` breakpoint
    laptop: true;
    desktop: true;
  }
}
```

### 主题获取

If you wish to use the theme for a CSS property that is not supported natively by the system, you can use a function as the value, in which you can access the theme object.

{{"demo": "ValueAsFunction.js"}}

## 实现

The `sx` prop can be used in four different locations:

### 3。 2. 自定义组件

All core MUI components will support the `sx` prop.

### 2. 2. Box

[`Box`](/material-ui/react-box/) is a lightweight component that gives access to the `sx` prop, and can be used as a utility component, and as a wrapper for other components. It renders a `<div>` element by default.

### 3. 3. 2. 自定义组件

In addition to MUI components, you can add the `sx` prop to your custom components too, by using the `styled` utility from `@mui/material/styles`.

```jsx
import { styled } from '@mui/material/styles';

const Div = styled('div')``;
```

### 4. 4. 4、 4、 4、 使用 babel 插件的任何元素

TODO [#23220](https://github.com/mui/material-ui/issues/23220).
