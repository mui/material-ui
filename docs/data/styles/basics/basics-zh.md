# @mui/styles (LEGACY)

<p class="description">无论您是否使用了 Material-UI 组件，都可以在应用中使用 Material-UI 的样式方案。</p>

> ⚠️ `@mui/styles`是MUI的_**传统**_样式解决方案。 它依赖于 [JSS ](https://cssinjs.org/)作为样式解决方案，在`@mui/material`中已经不使用了，在v5中被废弃。 If you don't want to have both Emotion & JSS in your bundle, please refer to the [`@mui/system`](/system/getting-started/overview/) documentation which is the recommended alternative.

> ⚠️ `@mui/styles` 与 [React.StrictMode](https://react.dev/reference/react/StrictMode) 或 React 18 不兼容。

Material-UI 旨在为构建动态的 UI 提供扎实的基础。 为了构造更加清晰的结构，**我们单独发布了 Material-UI 组件中使用的样式方案**，它将作为一个 `@mui/styles` 的依赖包存在。 你可以使用它，但你不一定要使用它，因为MUI也[可以与](/material-ui/guides/interoperability/)所有其他主要的样式解决方案互操作。

## 为什么要使用 Material-UI 的样式方案呢？

在以前的版本中，MUI使用[Less](https://lesscss.org/)，然后使用自定义的inline-style解决方案来编写组件样式，但这些方法被证明是有局限性。 [_CSS-in-JS_解决方案](https://github.com/oliviertassinari/a-journey-toward-better-style)克服了许多这些限制，并**提供了许多伟大的功能**（主题嵌套、动态样式、自我支持等）。

MUI的风格化解决方案受到许多其他风格化库的启发，如[styled-components](https://styled-components.com/)和[Emotion](https://emotion.sh/)。

- 💅 你可以期待与styled-components[一样的优势](https://styled-components.com/docs/basics#motivation)。

<!-- #default-branch-switch -->

- 🚀 它的速度[非常快](https://github.com/mui/material-ui/tree/master/benchmark/server#material-uistyles)。
- 🧩 你可以通过一个 [插件](https://github.com/cssinjs/jss/blob/master/docs/plugins.md) API 来扩展。
- ⚡️ 它使用 [JSS](https://github.com/cssinjs/jss) 为其核心 —— 一个 [高性能的](https://github.com/cssinjs/jss/blob/master/docs/performance.md) JavaScript 到 CSS 的编译器，它在运行时和服务器端编译。
- 📦 小于[15KB的gzipped](https://bundlephobia.com/package/@mui/styles)；如果与MUI一起使用，不会增加包的大小。

## 安装

若想安装并写入您的 `package.json` 依赖包，请运行以下命令：

<!-- #default-branch-switch -->

```sh
// 用 npm 安装
npm install @mui/styles

// 用 yarn 安装
yarn add @mui/styles
```

## 快速开始

有 3 种可能的 API 来生成并应用样式，但是它们都有着相同的底层逻辑。

### Hook API

```jsx
import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/core/Button';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

export default function Hook() {
  const classes = useStyles();
  return <Button className={classes.root}>Hook</Button>;
}
```

{{"demo": "Hook.js"}}

### Styled components API

注意：在只是用调用语法—— 您仍需使用一个 JSS 对象来定义你的样式。 你也可以[改变这种行为](/system/styles/advanced/#string-templates)，但有一些限制。

```jsx
import * as React from 'react';
import { styled } from '@mui/styles';
import Button from '@mui/core/Button';

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

export default function StyledComponents() {
  return <MyButton>Styled Components</MyButton>;
}
```

{{"demo": "StyledComponents.js"}}

### Higher-order component API

```jsx
import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import Button from '@mui/core/Button';

const styles = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
};

function HigherOrderComponent(props) {
  const { classes } = props;
  return <Button className={classes.root}>Higher-order component</Button>;
}

HigherOrderComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HigherOrderComponent);
```

{{"demo": "HigherOrderComponent.js"}}

## 嵌套选择器

您可以在当前的 class 或组件内的一个目标元素里嵌套样式选择器。 以下示例使用 Hook API，但和其他 API 大同小异。

```js
const useStyles = makeStyles({
  root: {
    color: 'red',
    '& p': {
      color: 'green',
      '& span': {
        color: 'blue',
      },
    },
  },
});
```

{{"demo": "NestedStylesHook.js", "defaultCodeOpen": false}}

## 根据属性来调节

您可以将一个函数传递给`makeStyles` (“插值”)，这样一来根据组件的属性可以变换生成的样式的值。 此函数可以运用于样式规范的级别，也可以安置于 CSS 属性级别：

```jsx
const useStyles = makeStyles({
  // 样式规则
  foo: (props) => ({
    backgroundColor: props.backgroundColor,
  }),
  bar: {
    // CSS property
    color: (props) => props.color,
  },
});

function MyComponent() {
  // 为了这个示例，我们模拟了一些属性
  const props = {
    backgroundColor: 'black',
    color: 'white',
  };
  // 将 props 作为 useStyles() 的第一个参数传入
  const classes = useStyles(props);

  return <div className={`${classes.foo} ${classes.bar}`} />;
}
```

此按钮组件有一个颜色属性，通过它可以改变颜色：

### 采用 hook API

{{"demo": "AdaptingHook.js"}}

### 采用 styled components API

{{"demo": "AdaptingStyledComponents.js"}}

### 采用 higher-order component API

{{"demo": "AdaptingHOC.js"}}

### 压力测试

在以下压力测试中，您可以实时更新*主题颜色*和 _background-color 属性_：

```js
const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    backgroundColor: props.backgroundColor,
    color: theme.color,
  }),
}));
```

{{"demo": "StressTest.js"}}

## 使用主题背景

从v5开始，MUI不再使用JSS作为其默认样式解决方案。 如果你仍然想使用`@mui/styles`导出的实用程序，并且它们依赖于`主题`，你将需要提供`主题`作为上下文的一部分。 为此，你可以使用`@mui/styles`中的`ThemeProvider`组件，或者，如果你已经在使用`@mui/material`，你应该使用从`@mui/material/styles`中导出的组件，这样，来自'@mui/material'的组件就可以使用同一个`主题`。

```jsx
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/core/styles';

const theme = createMuiTheme();

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
  }
}));

const App = (props) => {
  const classes = useStyles();
  return <ThemeProvider theme={theme}><div {...props} className={classes.root}></ThemeProvider>;
}
```
