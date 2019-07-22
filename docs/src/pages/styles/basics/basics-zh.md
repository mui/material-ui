# @material-ui/styles

<p class="description">无论您是否使用Material-UI组件，都可以在应用中使用Material-UI的样式解决方案。</p>

Material-UI 旨在为构建动态 UI 提供坚实的基础。 为了项目结构更清晰简单，**我们将 Material-UI 组件中使用的样式解决方案**作为` @material-ui/styles `包单独发布。 @material-ui/styles并不是唯一的选择，Material-UI也可以与其他主流样式解决方案[互动](/guides/interoperability/)。

## Why use Material-UI's styling solution?

在以前的版本中，Material-UI 曾使用过 LESS，以及而后的自定义内嵌式来编写组件的样式。但是这些方法已被证明了其局限性。 最近， [我们开始向*CSS-in-JS*解决方案方向转移 ](https://github.com/oliviertassinari/a-journey-toward-better-style)。 它**解锁了许多很棒的功能**(主题嵌套、动态样式、自我支持等...) 我们认为这是未来：

- [统一的样式语言](https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660)
- [将 SCSS（Sass）转换为 CSS-in-JS](https://egghead.io/courses/convert-scss-sass-to-css-in-js)

Material-UI的样式解决方案受到许多其他CSS-in-JS库的启发，例如 [styled-components](https://www.styled-components.com/) 和 [emotion](https://emotion.sh/)。

- 💅具备styled-components的 [ 优势](https://www.styled-components.com/docs/basics#motivation)。
- 🚀[超 ](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-benchmark/README.md#material-uistyles)快 。
- 🧩可通过[插件](https://github.com/cssinjs/jss/blob/master/docs/plugins.md)API 扩展。
- ⚡️它使用[ JSS ](https://github.com/cssinjs/jss)作为其核心 -- 一个 [高性能](https://github.com/cssinjs/jss/blob/master/docs/performance.md) JavaScript到CSS编译器，它在运行时和服务器端工作。
- 📦 Less than [15 KB gzipped](https://bundlephobia.com/result?p=@material-ui/styles); and no bundle size increase if used alongside Material-UI.

## 安装

将 Material-UI 下载并保存到你的 `package.json` 依赖文件里，请运行:

```sh
// 用npm安装
npm install @material-ui/styles

// 用yarn安装
yarn add @material-ui/styles
```

## 入门

我们提供3种不同的API来生成和应用样式，但它们都共享相同的底层逻辑。

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

{{"demo": "pages/styles/basics/Hook.js"}}

### Styled components API

Note: this only applies to the calling syntax – style definitions still use a JSS object. You can also [change this behavior](/styles/advanced/#string-templates), with some limitations.

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

{{"demo": "pages/styles/basics/StyledComponents.js"}}

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

{{"demo": "pages/styles/basics/HigherOrderComponent.js"}}

## Nesting selectors

您可以将选择器嵌套到当前类或组件内的目标元素。 以下示例使用Hook API，其他API的工作方式相同。

```js
const useStyles = makeStyles({
  root: {
    padding: 16,
    color: 'red',
    '& p': {
      color: 'green',
      '& span': {
        color: 'blue'
      }
    }
  },
});
```

{{"demo": "pages/styles/basics/NestedStylesHook.js"}}

## 接受传入属性

您可以将函数传递给` makeStyles ` (“插值”) 以便根据组件的属性适配生成的值。 The function can be provided at the style rule level, or at the CSS property level:

```jsx
const useStyles = makeStyles({
  // style rule
  foo: props => ({
    backgroundColor: props.backgroundColor,
  }),
  bar: {
    // CSS property
    color: props => props.color,
  },
});

function MyComponent() {
  // Simulated props for the purpose of the example
  const props = { backgroundColor: 'black', color: 'white' };
  // Pass the props as the first argument of useStyles()
  const classes = useStyles(props);

  return <div className={`${classes.foo} ${classes.bar}`} />
}
```

此按钮组件具有更改其颜色的颜色属性：

### Adapting the hook API

{{"demo": "pages/styles/basics/AdaptingHook.js", "react":"next"}}

### Adapting the styled components API

{{"demo": "pages/styles/basics/AdaptingStyledComponents.js"}}

### Adapting the higher-order component API

{{"demo": "pages/styles/basics/AdaptingHOC.js"}}

## 压力测试

在以下压力测试中，您可以更新*主题颜色*和*背景颜色属性*：

```js
const useStyles = makeStyles(theme => ({
  root: props => ({
    backgroundColor: props.backgroundColor,
    color: theme.color,
  }),
}));
```

{{"demo": "pages/styles/basics/StressTest.js"}}