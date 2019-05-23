# 从右到左读取

<p class="description">要更改 Material-UI 组件的读取方向，您必须执行以下步骤。 对从右到左（RTL）读取的语言的 UI，例如阿拉伯语和希伯来语，应该被反射。</p>

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
import { StylesProvider, jssPreset } from '@material-ui/styles';

// 配置 JSS
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

If you want to prevent a specific rule-set from being affected by the `rtl` transformation you can add `flip: false` at the beginning.

*Use the direction toggle button on the top right corner to see the effect.*

{{"demo": "pages/guides/right-to-left/RtlOptOut.js", "hideEditButton": true}}