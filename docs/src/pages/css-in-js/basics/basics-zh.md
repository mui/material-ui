# 基础

<p class="description">即使您没有使用我们的组件, 您也可以利用我们的样式解决方案。</p>

Material-UI 旨在为构建动态 UI 提供强大的基础。 为了简单起见, **我们向用户公开我们的样式解决方案 **。 你可以使用它，但是你不需要这样做。 该样式解决方案可[与所有其他主要解决方案](/guides/interoperability/)互操作

## Material-UI 的样式解决方案

在以前的版本中，Material-UI 曾使用过 LESS，以及而后的自定义内嵌式来编写组件的样式。但是这些方法已被证明了其局限性。 最近，我们开始向*CSS-in-JS*解决方案方向转移。 它**解锁了许多很棒的功能**（主题嵌套、动态样式、自我支持等...） 我们认为这是未来：

- [统一的样式语言](https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660)
- [将 SCSS（Sass）转换为 CSS-in-JS](https://egghead.io/courses/convert-scss-sass-to-css-in-js)

Material-UI的样式解决方案受到许多其他CSS-in-JS库的启发，例如 [styled-components](https://www.styled-components.com/) 和 [emotion](https://emotion.sh/)。

- 💅你可以期待 [与样式组件相同的优势](https://www.styled-components.com/docs/basics#motivation)。
- 🚀 It's [blazing fast](https://github.com/mui-org/material-ui/blob/next/packages/material-ui-benchmark/README.md#material-uistyles).
- 🧩 It's extensible via a [plugins](https://github.com/cssinjs/jss/blob/next/docs/plugins.md) API.
- ⚡️它的核心使用 [JSS](https://github.com/cssinjs/jss)。 It's a [high performance](https://github.com/cssinjs/jss/blob/next/docs/performance.md) JavaScript to CSS compiler which works at runtime and server-side.
- 📦小于 [15 KB gzipped](https://bundlephobia.com/result?p=@material-ui/styles)。

## 安装

将 Material-UI 下载并保存到你的 `package.json` 依赖文件里，请运行:

```sh
// 用npm安装
npm install @material-ui/styles

// 用yarn安装
yarn add @material-ui/styles
```

### 迁移`@material-ui/core`用户

要从默认样式实现切换到此最新版本，**您需要在导入任何** Material-UI组件之前执行以下代码 ：

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

{{"demo": "pages/css-in-js/basics/Hook.js"}}

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

{{"demo": "pages/css-in-js/basics/StyledComponents.js"}}

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

{{"demo": "pages/css-in-js/basics/HigherOrderComponent.js"}}

## 适应基于道具

您可以将函数（“插值”）传递给样式属性，以根据其道具对其进行调整。 此按钮组件具有更改其颜色的颜色属性：

### 适应 hook API

{{"demo": "pages/css-in-js/basics/AdaptingHook.js", "react":"next"}}

### 适应 styled components API

{{"demo": "pages/css-in-js/basics/AdaptingStyledComponents.js"}}

### 适应 higher-order component API

{{"demo": "pages/css-in-js/basics/AdaptingHOC.js"}}