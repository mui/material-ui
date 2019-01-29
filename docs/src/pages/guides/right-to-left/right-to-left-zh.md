# 右到左

<p class="description">要更改Material-UI组件的方向，您必须执行以下步骤。 应该镜像从右到左（RTL）读取的语言的UI，例如阿拉伯语和希伯来语。</p>

## 脚步

### 1。 HTML

确保在主体上设置了 `dir` 属性，否则本机组件将中断：

```html
<body dir="rtl">
```

### 2。 Theme

在自定义主题中设置方向：

```js
const theme = createMuiTheme({
  direction: 'rtl',
});
```

### 3。 jss-rtl

你需要这个JSS插件来翻转样式： [jss-rtl](https://github.com/alitaheri/jss-rtl)。

```sh
npm install jss-rtl
```

在项目中安装了插件后，Material-UI组件仍然需要由jss实例加载，如下所述。 在内部，当withStyles使用该JSS插件 `direction: 'rtl'` 上设置的主题。

[CSS-in-JS文档](/customization/css-in-js/#opting-out-of-rtl-transformation) 更详细地解释了这个插件的工作原理。 前往 [插件README](https://github.com/alitaheri/jss-rtl) 了解更多相关信息。

使用插件创建新的JSS实例后，需要使其可用于组件树中的所有组件。 JSS有一个 [`JssProvider`](https://github.com/cssinjs/react-jss) 组件：

```jsx
import { create } from 'jss';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// Custom Material-UI class name generator.
const generateClassName = createGenerateClassName();

function RTL(props) {
  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      {props.children}
    </JssProvider>
  );
}
```

## 演示

*使用右上角的方向切换按钮翻转整个文档*

{{"demo": "pages/guides/right-to-left/Direction.js"}}

## 选择退出rtl转型

如果您想阻止特定规则集受到 `rtl` 转换的影响，您可以在开头添加 `flip：false`：

*使用右上角的方向切换按钮查看效果*

{{"demo": "pages/guides/right-to-left/RtlOptOut.js", "hideEditButton": true}}