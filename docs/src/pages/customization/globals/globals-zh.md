# 全局样式

<p class="description">Overrides使你可以统一修改某个组件所有对象的样式，而props则能修改某个组件的默认属性值。</p>

## CSS

当配置变量不够强大的时候，您可以使用`theme`的`overrides`来让Material-UI隐式地为您注入**样式规则**。 这是一个非常强大的特性。

```js
const theme = createMuiTheme({
  overrides: {
    MuiButton: { // 组件的名称 ⚛️ / 样式表
      text: { // 规则的名称
        color: 'white', // 一些CSS
      },
    },
  },
});
```

{{"demo": "pages/customization/globals/GlobalCss.js"}}

每个组件可自定义的部分列在文档的**Component API**部分。 例如，你可以看一下[Button](/api/button/#css)， 而且你总可以查阅 [implementation](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Button/Button.js)。

## Default props

You can change the default props of all the Material-UI components. 在`theme`上有一个键值`props`是用来作这个用途的。

```js
const theme = createMuiTheme({
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The default props to change
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
});
```

{{"demo": "pages/customization/globals/DefaultProps.js"}}