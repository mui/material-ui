# @mui/styles

<p class="description">The legacy styling solution of MUI.</p>

> ⚠️ `@mui/styles` is the _**legacy**_ styling solution for MUI. It is deprecated in v5. It depends on [JSS](https://cssinjs.org/) as a styling solution, which is not used in the `@mui/material` anymore. If you don't want to have both emotion & JSS in your bundle, please refer to the [`@mui/system`](/system/basics/) documentation which is the recommended alternative.

> ⚠️ `@mui/styles` is not compatible with [React.StrictMode](https://reactjs.org/docs/strict-mode.html) or React 18.

MUI aims to provide a strong foundation for building dynamic UIs. For the sake of simplicity, **we expose the styling solution used in MUI components** as the `@mui/styles` package. You can use it, but you don't have to, since MUI is also [interoperable with](/guides/interoperability/) all the other major styling solutions.

## Why use MUI's styling solution?

In previous versions, MUI has used [Less](https://lesscss.org/), and then a custom inline-style solution to write the component styles, but these approaches proved to be limited. [_CSS-in-JS_ 方案](https://github.com/oliviertassinari/a-journey-toward-better-style) 突破了这些限制，并**提供了很多强大的功能**（主题嵌套、动态样式、自我支持等等）。

MUI's styling solution is inspired by many other styling libraries such as [styled-components](https://styled-components.com/) and [emotion](https://emotion.sh/).

- 💅 You can expect [the same advantages](https://styled-components.com/docs/basics#motivation) as styled-components.

<!-- #default-branch-switch -->

- 🚀它的运行速度 [非常快](https://github.com/mui-org/material-ui/blob/HEAD/benchmark/server#material-uistyles)。
- 🧩你可以通过一个 [插件](https://github.com/cssinjs/jss/blob/master/docs/plugins.md) API 来扩展。
- ⚡️它使用 [JSS](https://github.com/cssinjs/jss) 为其核心 —— 一个 [高性能的](https://github.com/cssinjs/jss/blob/master/docs/performance.md) JavaScript 到 CSS 的编译器，它在运行时和服务器端编译。
- 📦 Less than [15 KB gzipped](https://bundlephobia.com/package/@mui/styles); and no bundle size increase if used alongside MUI.

## 安装

若想安装并写入您的 `package.json` 依赖包，请运行以下命令：

<!-- #default-branch-switch -->

```sh
// with npm
npm install @mui/styles

// with yarn
yarn add @mui/styles
```

## 快速开始

有3种可能的 API 来生成并应用样式，但是它们都有着相同的底层逻辑。

### Hook API

```jsx
import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

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

{{"demo": "pages/styles/basics/Hook.js"}}

### Styled components API

注意：在只是用调用语法—— 您仍需使用一个 JSS 对象来定义你的样式。 你可以[改变这样的行为](/styles/advanced/#string-templates)，但还是存在一些限制。

```jsx
import * as React from 'react';
import { styled } from '@mui/styles';
import Button from '@mui/material/Button';

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

{{"demo": "pages/styles/basics/StyledComponents.js"}}

### Higher-order component API

```jsx
import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button';

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

{{"demo": "pages/styles/basics/HigherOrderComponent.js"}}

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

{{"demo": "pages/styles/basics/NestedStylesHook.js", "defaultCodeOpen": false}}

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

This button component has a `color` prop that changes its color:

### 采用 hook API

{{"demo": "pages/styles/basics/AdaptingHook.js", "react":"next"}}

### 采用 styled components API

{{"demo": "pages/styles/basics/AdaptingStyledComponents.js"}}

### 采用 higher-order component API

{{"demo": "pages/styles/basics/AdaptingHOC.js"}}

### 压力测试

在以下压力测试中，您可以实时更新_主题颜色_和 _background-color 属性_：

```js
const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    backgroundColor: props.backgroundColor,
    color: theme.color,
  }),
}));
```

{{"demo": "pages/styles/basics/StressTest.js"}}

## Using the theme context

Starting from v5, MUI no longer uses JSS as its default styling solution. If you still want to use the utilities exported by `@mui/styles` and they depend on the `theme`, you will need to provide the `theme` as part of the context. For this, you can use the `ThemeProvider` component available in `@mui/styles`, or, if you are already using `@mui/material`, you should use the one exported from `@mui/material/styles` so that the same `theme` is available for components from '@mui/material'.

```jsx
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

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
