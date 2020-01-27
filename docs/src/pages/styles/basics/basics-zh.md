# @material-ui/styles

<p class="description">无论您是否使用Material-UI组件，都可以在应用中使用Material-UI的样式解决方案。</p>

Material-UI 旨在为构建动态 UI 提供坚实的基础。 为了项目结构更清晰简单，**我们将 Material-UI 组件中使用的样式解决方案**作为` @material-ui/styles `包单独发布。 @material-ui/styles并不是唯一的选择，Material-UI也可以与其他主流样式解决方案[互动](/guides/interoperability/)。

## 为什么要使用 Material-UI 的样式解决方案？

在以前的版本中，Material-UI 曾使用过 LESS，以及而后的自定义内嵌式来编写组件的样式。但是这些方法已被证明了其局限性。 [*CSS-in-JS* solution](https://github.com/oliviertassinari/a-journey-toward-better-style) 克服了很多限制，并 **开启了很多强大的功能**（主题嵌套、动态样式、自举等等）。

Material-UI的样式解决方案受到许多其他CSS-in-JS库的启发，例如 [styled-components](https://www.styled-components.com/) 和 [emotion](https://emotion.sh/)。

- 💅具备styled-components的 [ 优势](https://www.styled-components.com/docs/basics#motivation)。
- 🚀[超 ](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-benchmark/README.md#material-uistyles)快 。
- 🧩可通过[插件](https://github.com/cssinjs/jss/blob/master/docs/plugins.md)API 扩展。
- ⚡️它使用[ JSS ](https://github.com/cssinjs/jss)作为其核心 -- 一个 [高性能](https://github.com/cssinjs/jss/blob/master/docs/performance.md) JavaScript到CSS编译器，它在运行时和服务器端工作。
- 📦 小于 [15 KB gzipped](https://bundlephobia.com/result?p=@material-ui/styles)，且如果与 Material-UI 一起使用，包的大小不会增加。

## 安装

> `@material-ui/styles` 被重新导出为 `@material-ui/core/styles` - 如果你想要独立于 Material-UI 使用它，只需要安装它。

将 Material-UI 下载并保存到你的 `package.json` 依赖文件里，请运行:

```sh
// 用npm安装
npm install @material-ui/styles

// 用yarn安装
yarn add @material-ui/styles
```

## 入门

您可以使用 3 种可能的 API 来生成和应用样式，但是它们都共享相同的底层逻辑。

### Hook API

```jsx
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

### 样式化组件 API

注意：这只适用于仍然使用JSS对象的调用语法样式定义（calling syntax – style definitions）。 你还可以带有一些局限性地[改变这种行为](/styles/advanced/#string-templates)。

```jsx
import React from 'react';
import { styled } from '@material-ui/core/styles';
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

### 高阶组件API

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

## 嵌套选择器

您可以将选择器嵌套到当前类或组件内的目标元素。 以下示例使用Hook API，其他API的工作方式相同。

```js
const useStyles = makeStyles({
  root: {
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

{{"demo": "pages/styles/basics/NestedStylesHook.js", "defaultCodeOpen": false}}

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

### 压力测试

在以下压力测试中，您可以实时更新*主题颜色*和*背景颜色属性*：

```js
const useStyles = makeStyles(theme => ({
  root: props => ({
    backgroundColor: props.backgroundColor,
    color: theme.color,
  }),
}));
```

{{"demo": "pages/styles/basics/StressTest.js"}}

## @material-ui/core/styles 对比 @material-ui/styles

Material-UI 的样式是由 [@material-ui/styles](https://www.npmjs.com/package/@material-ui/styles) 包驱动的。（由 JSS 构建） 这个解决方案是[独立](https://bundlephobia.com/result?p=@material-ui/styles)的。 它没有一个默认的主题，可以用于对不使用 Material-UI 组件的 React 应用程序设置样式。

为了减少在使用 Material-UI 时要安装的包的数量和简化导入，`@material-ui/styles` 模块从 `@material-ui/core/styles` 中被重新导出。

为了无需系统地提供一个主题，默认的 Material-UI 主题被应用到重新导出的 `makeStyles`，`styled`，`withTheme`，`useTheme`，和 `withStyles` 模块。

就像这样：

```js
// Re-export with a default theme
import { makeStyles } from '@material-ui/core/styles';

// Original module with no default theme
import { makeStyles } from '@material-ui/styles';
```