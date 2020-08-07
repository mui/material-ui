# 全局样式

<p class="description">您可以通过 overrides 键来自定义某个组件的所有实例的外观，也可以用 props 键来改变一个组件属性的默认值（们）。</p>

## CSS

当配置变量不够强大的时候，您可以使用 `theme` 的 `overrides` 键来尽可能的改变 Material-UI 注入 DOM 的 **每一个样式**。 这是一个十分有效的功能。

```js
const theme = createMuiTheme({
  overrides: {
    // 样式表的名字 ⚛️
    MuiButton: {
      // 规则的名字
      text: {
        // 一些 CSS
        color: 'white',
      },
    },
  },
});
```

{{"demo": "pages/customization/globals/GlobalCss.js"}}

每个组件可自定义的部分都在 **Component API** 章节列出。 例如，您可以参考以下 [Button](/api/button/#css) 组件。 或者，你可以随时查看[实现细节](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Button/Button.js)。

## 全局 CSS

如果您使用 [CssBaseline](/components/css-baseline/) 组件来应用全局重置（global resets），那么也可以将它应用于全局样式。 就像这样：

```jsx
const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
        },
      },
    },
  },
});

// ...
return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);
```

## 默认属性

您可以更改所有 Material-UI 组件的默认属性。 在以下用例中，`theme` 公开了一个 `props` 键（key）。

```js
const theme = createMuiTheme({
  props: {
    // 组件的名称 ⚛️
    MuiButtonBase: {
      // 需要修改的默认属性
      disableRipple: true, // 在整个程序中没有更多的 ripple 💣!
    },
  },
});
```

{{"demo": "pages/customization/globals/DefaultProps.js"}}