# 基础

<p class="description">即使您没有使用我们的组件, 您也可以利用我们的样式解决方案。</p>

> ⚠️`@material-ui/styles`是实验性的（alpha版）。 希望我们将它作为Material-UI v4中核心组件的默认样式实现。 [遵循此路径](/customization/css-in-js/)阅读默认样式实现的文档 。

Material-UI 旨在为构建动态 UI 提供强大的基础。 为了简单起见, **我们向用户公开我们的样式解决方案 **。 你可以使用它，但是你不需要这样做。 该样式解决方案可[与所有其他主要解决方案](/guides/interoperability/)互操作

## Material-UI 的样式解决方案

在以前的版本中，Material-UI 使用 LESS，然后是自定义内嵌式的解决方案来编写组件的样式，但是这些方法已被证明是有限制的。 最近，我们[迁移](https://github.com/oliviertassinari/a-journey-toward-better-style)到*CSS-in-JS*的解决方案中去。 它**解锁了许多很棒的功能**（主题嵌套、动态样式、自我支持等...） 我们认为这是未来：

- [统一的样式语言](https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660)
- [将SCSS（Sass）转换为CSS-in-JS](https://egghead.io/courses/convert-scss-sass-to-css-in-js)

Material-UI的样式解决方案受到许多其他CSS-in-JS库的启发，例如 [styled-components](https://www.styled-components.com/) 和 [emotion](https://emotion.sh/)。

- 💅你可以期待 [与样式组件相同的优势](https://www.styled-components.com/docs/basics#motivation)。
- 🚀是 [极快](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-benchmark/README.md#material-uistyles)。 x2.6比服务器上的情感更快，用于渲染静态样式表。
- 🧩可通过 [插件](https://github.com/cssinjs/jss/blob/master/docs/plugins.md) API进行扩展。
- ⚡️它的核心使用 [JSS](https://github.com/cssinjs/jss)。 这是一个 [高性能](https://github.com/cssinjs/jss/blob/master/docs/performance.md) JavaScript来CSS编译器，在运行时和服务器端的工作。
- 📦小于 [15 KB gzipped](https://bundlephobia.com/result?p=@material-ui/styles)。

## 安装

下载并保存到你的 `package.json` 依赖，运行

```sh
// 用npm安装
npm install @material-ui/styles

// 用yarn安装
yarn add @material-ui/styles
```

> 请注意，它取决于 *react@next* 和 *react-dom@next*。

### 迁移`@material-ui/core`用户

要从默认样式实现切换到此最新版本，您需要在导入任何</strong> Material-UI组件之前执行以下代码 **：</p> 

```js
import { install } from '@material-ui/styles';

install();
```

它是 **推荐** 放置上述代码在一个单独的文件中（例如 `bootstrap.js`）和将其导入在你的应用程序的入口点（例如 `index.js`）。 这可以确保安装在其他任何操作之前执行，因为ECMAScript导入被提升到模块的顶部。 如果未正确执行安装步骤，则生成的构建可能具有冲突的类名。

我们将 `@material-ui/styles` 作为Material-UI v4中核心组件的默认样式实现。 此安装步骤为 **临时**。 在幕后，`install()` 函数切换核心组件使用的样式引擎。

此外， `@ material-ui / core / MuiThemeProvider` 组件可以替换为 `@ material-ui / styles / ThemeProvider`。 我们将在v4中删除此组件。

## 入门

我们提供3种不同的API。 它们都具有相同的基础逻辑。

### Hook API

```jsx
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

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

{{"demo": "pages/css-in-js/basics/Hook.js", "react": "next"}}

### Styled components API

```jsx
import React from 'react';
import { styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

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

{{"demo": "pages/css-in-js/basics/StyledComponents.js", "react": "next"}}

### Higher-order component API

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

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

{{"demo": "pages/css-in-js/basics/HigherOrderComponent.js", "react": "next"}}

## 适应基于道具

您可以将函数（“插值”）传递给样式属性，以根据其道具对其进行调整。 此按钮组件具有更改其颜色的颜色属性：

### 适应 hook API

{{"demo": "pages/css-in-js/basics/AdaptingHook.js", "react":"next"}}

### 适应 styled components API

{{"demo": "pages/css-in-js/basics/AdaptingStyledComponents.js", "react": "next"}}

### 适应 higher-order component API

{{"demo": "pages/css-in-js/basics/AdaptingHOC.js", "react": "next"}}