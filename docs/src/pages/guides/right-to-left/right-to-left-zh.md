# 从右到左读取

<p class="description">支持从右到左的语言，如阿拉伯语（Arabic）、波斯语（Persian ）或希伯来语（Hebrew ）。 要更改 Material-UI 组件的读取方向，您必须执行以下步骤。</p>

## 步骤

### 1。 HTML

确保在 body 上设置了 `dir` 属性，否则本机组件将中断：

```html
<body dir="rtl">
```

### 2。 主题

在您自定义的主题中设置方向：

```js
const theme = createMuiTheme({
  direction: 'rtl',
});
```

### 3。 jss-rtl

你需要这个 JSS 插件来翻转样式： [jss-rtl](https://github.com/alitaheri/jss-rtl)。

```sh
npm install jss-rtl
```

如下所述，在项目中安装了插件后，Material-UI 组件仍然需要通过 jss 实例来加载。 在内部，若 `direction: 'rtl'` 上在主题设置了，withStyles 则会使用该 JSS 插件 。 请前往 [此插件的 README](https://github.com/alitaheri/jss-rtl) 来了解更多信息。

一旦您通过插件创建了一个新的 JSS 实例，您需要提给组件树中的所有组件。 我们有一个 [`StylesProvider`](/styles/api/#stylesprovider) 组件来服务这个需求：

```jsx
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function RTL(props) {
  return (
    <StylesProvider jss={jss}>
      {props.children}
    </StylesProvider>
  );
}
```

## 演示

*请使用右上角的方向切换按钮来翻转整个文档。*

{{"demo": "pages/guides/right-to-left/Direction.js"}}

## 选择退出 rtl 转换

若您想避免一个特殊的特定规则受到 `rtl` 转换的影响，您可以在最开始时加上 `flip: false`。

*请使用右上角的方向切换按钮来查看效果。*

{{"demo": "pages/guides/right-to-left/RtlOptOut.js", "hideEditButton": true}}