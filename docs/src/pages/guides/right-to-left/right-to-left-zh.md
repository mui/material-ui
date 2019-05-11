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

在项目中安装了插件后，Material-UI组件仍然需要由jss实例加载，如下所述。 在内部，当withStyles使用该JSS插件 `direction: 'rtl'` 上设置的主题。 Head to the [plugin README](https://github.com/alitaheri/jss-rtl) to learn more about it.

Once you have created a new JSS instance with the plugin, you need to make it available to all the components in the component tree. We have a [`StylesProvider`](/styles/api/#stylesprovider) component for this:

```jsx
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/styles';

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

*Use the direction toggle button on the top right corner to flip the whole documentation*

{{"demo": "pages/guides/right-to-left/Direction.js"}}

## 选择退出rtl转型

If you want to prevent a specific rule-set from being affected by the `rtl` transformation you can add `flip: false` at the beginning:

*Use the direction toggle button on the top right corner to see the effect*

{{"demo": "pages/guides/right-to-left/RtlOptOut.js", "hideEditButton": true}}