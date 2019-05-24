# 全局变量

<p class="description">The overrides key enables you to customize the appearance of all instances of a component type, while the props key enables you to change the default value(s) of a component's props.</p>

## CSS

When the configuration variables aren't powerful enough, you can take advantage of the `overrides` key of the `theme` to potentially change **every single style** injected by Material-UI into the DOM. 这是一个十分强有力的特点。

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