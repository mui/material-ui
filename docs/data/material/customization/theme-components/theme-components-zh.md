# Components 组件

<p class="description">You can customize a component's styles, default props, and more by using its keys inside the theme. This helps to achieve styling consistency across your application.</p>

## 重写全局样式

Every Material UI component has default preset values for each of its props. To change these default values, use the `defaultProps` key exposed in the theme's `components` key:

```js
const theme = createTheme({
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
});
```

{{"demo": "DefaultProps.js"}}

If you're using TypeScript and [lab components](/material-ui/about-the-lab/), check [this article to learn how to override their styles](/material-ui/about-the-lab/#typescript).

## 默认属性

The theme's `styleOverrides` key makes it possible to potentially change every single style injected by Material UI into the DOM. This is useful if you want to apply a fully custom design system to Material UI's components.

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

{{"demo": "GlobalThemeOverride.js"}}

Each component is composed of several different parts. These parts correspond to classes that are available to the component—see the **CSS** section of the component's API page for a detailed list. You can use these classes inside the `styleOverrides` key to modify the corresponding parts of the component.

```js
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'primary' && {
              backgroundColor: '#202020',
              color: '#fff',
            }),
        }),
      },
    },
  },
});
```

### Overrides based on props

You can pass a callback as a value in each slot of the component's `styleOverrides` to apply styles based on props.

The `ownerState` prop is a combination of public props that you pass to the component + internal state of the component.

```js
const finalTheme = createTheme({
  components: {
    MuiSlider: {
      styleOverrides: {
        valueLabel: ({ ownerState, theme }) => ({
          ...(ownerState.orientation === 'vertical' && {
            backgroundColor: 'transparent',
            color: theme.palette.grey[500],
          }),
        }),
      },
    },
  },
});
```

{{"demo": "GlobalThemeOverrideCallback.js"}}

### The `sx` syntax (experimental)

The `sx` prop acts as a shortcut for defining custom styles that access the theme object. This prop lets you write inline styles using a superset of CSS. Learn more about [the concept behind the `sx` prop](/system/getting-started/the-sx-prop/) and [how `sx` differs from the `styled` utility](/system/styled/#difference-with-the-sx-prop).

You can use the `sx` prop inside the `styleOverrides` key to modify styles within the theme using shorthand CSS notation. This is especially handy if you're already using the `sx` prop with your components, because you can use the same syntax in your theme and quickly transfer styles between the two.

:::info
**Note:** The `sx` prop is a stable feature for customizing components in Material UI v5, but it is still considered _experimental_ when used directly inside the theme object.
:::

{{"demo": "GlobalThemeOverrideSx.js", "defaultCodeOpen": false}}

```tsx
const finalTheme = createTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        root: sx({
          px: 1,
          py: 0.25,
          borderRadius: 1,
        }),
        label: {
          padding: 'initial',
        },
        icon: sx({
          mr: 0.5,
          ml: '-2px',
        }),
      },
    },
  },
});
```

### Specificity

If you use the theming approach to customize the components, you'll still be able to override them using the `sx` prop as it has a higher CSS specificity, even if you're using the experimental `sx` syntax within the theme.

## Creating new component variants

You can use the `variants` key in the theme's `components` section to create new variants to Material UI components. These new variants can specify what styles the component should have when that specific variant prop value is applied.

The definitions are specified in an array, under the component's name. For each of them a CSS class is added to the HTML `<head>`. The order is important, so make sure that the styles that should win are specified last.

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

If you're using TypeScript, you'll need to specify your new variants/colors, using [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation).

<!-- Tested with packages/mui-material/test/typescript/augmentation/themeComponents.spec.ts -->

```tsx
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}
```

{{"demo": "GlobalThemeVariants.js"}}

## 主题变量

Another way to override the look of all component instances is to adjust the [theme configuration variables](/material-ui/customization/theming/#theme-configuration-variables).

```js
const theme = createTheme({
  typography: {
    button: {
      fontSize: '1rem',
    },
  },
});
```

{{"demo": "ThemeVariables.js"}}
