# 全局样式

<p class="description">With the `theme.components` key you can customize the appearance of all instances of a component; change the default value(s) of a component's props; and add custom variants to your components.</p>

## 默认属性

You can change the default of every prop of a Material-UI component. A `defaultProps` key is exposed in the theme's `components` key for this use case.

```js
const theme = createMuiTheme({
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple!
      },
    },
  },
});
```

{{"demo": "pages/customization/globals/DefaultProps.js"}}

To override lab component styles with TypeScript, check [this page](/components/about-the-lab/#typescript).

## 主题变量

Another way to override the look of all component instances is to adjust the [theme configuration variables](/customization/theming/#theme-configuration-variables).

```jsx
const theme = createMuiTheme({
  typography: {
    button: {
      fontSize: '1rem',
    },
  },
});
```

{{"demo": "pages/customization/globals/ThemeVariables.js"}}

## 全局 CSS 覆盖

Components expose [global class names](/styles/advanced/#with-material-ui-core) to enable customization with CSS.

```jsx
const GlobalCss = withStyles({
  // @global 由 jss-plugin-global 处理。
  '@global': {
    '.MuiButton-root': {
      fontSize: '1rem',
    },
  },
})(() => null);

// …

<GlobalCss />;
```

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

{{"demo": "pages/customization/globals/GlobalCssOverride.js", "iframe": true, "height": 100}}

## 全局主题覆盖

You can use the theme's `styleOverrides` key to potentially change every single style injected by Material-UI into the DOM. 在[主题部分](/customization/globals/#css)可以了解有关它的更多信息。

```jsx
const theme = createMuiTheme({
  components: {
    // Style sheet name ⚛️
    MuiButton: {
      styleOverrides: {
        // Name of the rule
        root: {
          // Some CSS
          fontSize: '1rem',
        },
      },
    },
  },
});
```

{{"demo": "pages/customization/globals/GlobalThemeOverride.js"}}

The list of each component's classes is documented under the **CSS** section of each component's API page.

To override a lab component's styles with TypeScript, check [this section of the documentation](/components/about-the-lab/#typescript).

## 添加新的组件变量

You can use the `variants` key in the theme's `components` section to add new variants to Material-UI components. These new variants can specify what styles the component should have when specific props are applied together.

这些定义在组件的名称下由一个数组指定。 For each of them a CSS class is added to the HTML `<head>`. The order is important, so make sure that the styles that should win are specified last.

```jsx
const theme = createMuiTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'dashed' },
          style: {
            textTransform: 'none',
            border: `2px dashed grey${blue[500]}`,
          },
        },
        {
          props: { variant: 'dashed', color: 'secondary' },
          style: {
            border: `4px dashed ${red[500]}`,
          },
        },
      ],
    },
  },
});
```

If you're using TypeScript, you'll need to specify your new variants/colors, using [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation).

```tsx
declare module '@material-ui/core/Button/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}
```

{{"demo": "pages/customization/globals/GlobalThemeVariants.js"}}
