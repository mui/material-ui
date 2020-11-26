# 全局样式

<p class="description">styleOverrides 键使你能够自定义组件类型所有实例的外观，而属性（props）键使你能够更改组件属性的默认值。</p>

## CSS

如果你觉得配置变量的功能不够强大，那么你也可以利用 `theme` 的 `styleOverrides` 键来隐式改变 Material-UI 注入到 DOM 中的 **每一个样式**。 这是一个十分有效的功能。

要用 TypeScript 覆盖实验室组件的样式，请查看 [这个文档](/components/about-the-lab/#typescript)。

```js
const theme = createMuiTheme({
  components: {
    // Style sheet name ⚛️
    MuiButton: {
      styleOverrides: {
        // 规则名
        textPrimary: {
          // 一些 CSS
          color: 'white',
        },
      },
    },
  },
});
```

{{"demo": "pages/customization/globals/GlobalCss.js"}}

每个组件可自定义的部分都被列在文档的 **Component API**。 例如，您可以参考以下 [Button](/api/button/#css) 组件。

## 全局 CSS

如果您使用 [CssBaseline](/components/css-baseline/) 组件来应用全局重置（global resets），那么也可以将它应用于全局样式。 就像这样：

```jsx
const theme = createMuiTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          html: {
            WebkitFontSmoothing: 'auto',
          },
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

您可以更改所有 Material-UI 组件的默认属性。 该用例展示了在 `主题` 中的一个 `props` 键(key)。

要用 TypeScript 覆盖实验室组件的样式，请查看 [这个文档](/components/about-the-lab/#typescript)。

```js
const theme = createMuiTheme({
  components: {
    // 组件名 ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The default props to change
        disableRipple: true, // 全局禁用波纹动画 💣!
      },
    },
  },
});
```

{{"demo": "pages/customization/globals/DefaultProps.js"}}
