# Components 组件

<p class="description">主题的 `components` 键允许你自定义组件，而无需将其包裹在另一个组件中。 你可以更改样式、默认属性等等其他东西。</p>

## 重写全局样式

You can use the theme's `styleOverrides` key to potentially change every single style injected by MUI into the DOM.

```js
const theme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem',
        },
      },
    },
  },
});
```

{{"demo": "pages/customization/theme-components/GlobalThemeOverride.js"}}

在组件API 页面的 **CSS**介绍部分，列出了每个组件样式类的文档。

要用 TypeScript 重写lab组件的样式，请查看 [此文档](/components/about-the-lab/#typescript)。

## 默认属性

You can change the default of every prop of a MUI component. 下面示例就是指定`defaultProps`属性覆盖`components`下组件的默认属性。

```js
const theme = createTheme({
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

{{"demo": "pages/customization/theme-components/DefaultProps.js"}}

要使用 TypeScript 覆盖实验室组件样式，请检查 [此文档](/components/about-the-lab/#typescript)

## 添加新的组件变量

You can use the `variants` key in the theme's `components` section to add new variants to MUI components. 这些变量能够决定当使用特定的属性时组件应该采用什么样的样式。

在组件名称（如：MuiButton）下以数组形式定义组件变量。 数组中的每个变量都会对应一个CSS类添加到HTML`<head>`中。 变量顺序很重要，所以确保想要起作用的样式应该定义在最后。

```js
const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'dashed' },
          style: {
            textTransform: 'none',
            border: `2px dashed ${blue[500]}`,
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

如果你用的是TypeScript，那么需要使用[moduleaugmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)定义新的variants/colors

<!-- Tested with packages/mui-material/test/typescript/augmentation/themeComponents.spec.ts -->

```tsx
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}
```

{{"demo": "pages/customization/theme-components/GlobalThemeVariants.js"}}

## 主题变量

覆盖所有组件实例的另一种方式是调整 [theme configuration variables](/customization/theming/#theme-configuration-variables)。

```js
const theme = createTheme({
  typography: {
    button: {
      fontSize: '1rem',
    },
  },
});
```

{{"demo": "pages/customization/theme-components/ThemeVariables.js"}}
