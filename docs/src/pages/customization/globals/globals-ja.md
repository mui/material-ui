# グローバル

<p class="description">オーバーライドキーを使用すると、コンポーネントタイプのすべてのインスタンスの外観をカスタマイズでき、プロップキーを使用すると、コンポーネントのプロップのデフォルト値を変更できます。</p>

## CSS

設定変数が十分に強力でない場合は、 `theme` の</code>キーを`overrides</0> し、Material-UIによってDOMに注入される**every single style**を変更できるようにします。 それは本当に強力な機能です。 それは本当に強力な機能です。

```js
設定変数が十分に強力でない場合は、 <code>theme</code> の</code>キーを`overrides</0> し、Material-UIによってDOMに注入される<strong>every single style</strong>を変更できるようにします。
それは本当に強力な機能です。
``` の</code>キーを`overrides</0> し、Material-UIによってDOMに注入される**every single style**を変更できるようにします。
それは本当に強力な機能です。
</code>

{{"demo": "pages/customization/globals/GlobalCss.js"}}

各コンポーネントのカスタマイズポイントの一覧は、 **Component API**のセクションに記載されています。 たとえば、 [Button](/api/button/#css)はこちらです。 あるいは、いつでも[実装を調べることができます](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Button/Button.js)。

## Global CSS

If you are using the [CssBaseline](/components/css-baseline/) component to apply global resets, it can also be used to apply global styles. 例えば：

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

## Default props

const theme = createMuiTheme({ props: { // Name of the component ⚛️ MuiButtonBase: { // The default props to change disableRipple: true, // No more ripple, on the whole application 💣! }, }, });

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