# Approaches

<p class="description">Learn which approach is recommended, depending on the situation, to customize Joy UI components.</p>

<!-- The purpose of this page is to give the overall customization alternatives to developers without providing too much details -->
<!-- Some examples and demos are provided to give the sense of what it looks like and then lead each part to another page for more technical details and more examples -->

There are 3 main approaches for customizing Joy UI components:

1. Global customization (theming)
2. One-off customization (per instance)
3. Reusable component (custom component)

## Theming

If you want every instance of a given component to be styled consistently, theming is the way to go.
You can think of it as a mask that wraps them and adds custom styles.
That way, you should be able to switch between themes without changing your app's logic.

Here are some examples that reproduce popular designs out there (only the light mode, though):

{{"demo": "ButtonThemes.js", "hideToolbar": true}}

### Customizing theme tokens

To print your own design language into Joy UI components in a scalable way, override the default theme tokens.
To do that, always use the `extendTheme` function as the customized tokens will be deeply merged into the default theme.

Under the hood, Joy will convert the tokens to CSS variables, enabling you to get them through `theme.vars.*`, which is very convenient as you can use any styling solution to read those CSS vars.

:::info
Fore more in-depth about low-level and global variant tokens, check the [Theme tokens](<(/joy-ui/customization/theme-tokens/)>) article.
:::

:::warning
Keep in mind that customizing the design tokens will affect all components. If you want to apply a specific style to a component, you should use [**themed components**](#themed-components) instead.
:::

```js
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        // affects all Joy components that has `color="primary"` prop.
        primary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          // 300, 400, ..., 800,
          900: '#78350f',
        },
      },
    },
  },
  fontFamily: {
    display: 'Inter var, var(--joy-fontFamily-fallback)',
    body: 'Inter, var(--joy-fontFamily-fallback)',
  },
});

function App() {
  return <CssVarsProvider theme={theme}>...</CssVarsProvider>;
}
```

### Components theming

Customizing components through the theme assures that every instance of that component has the same style.

:::info
Check the [specific themed components article](/joy-ui/customization/themed-tokens/) for more in-depth instructions.
:::

Here is an example of customizing the Button's default `fontWeight` and `boxShadow`:

```js
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Button from '@mui/joy/Button';

const theme = extendTheme({
  components: {
    // The identifier always start with `Joy${ComponentName}`.
    JoyButton: {
      styleOverrides: ({ theme }) => ({
        // theme.vars.* return the CSS variables.
        fontWeight: theme.vars.fontWeight.lg, // 'var(--joy-fontWeight-lg)'
        boxShadow: theme.vars.shadow.xs, // 'var(--joy-shadow-xs)'
      }),
    },
  },
});

function App() {
  return (
    <CssVarsProvider theme={theme}>
      <Button>Text</Button>
    </CssVarsProvider>
  );
}
```

## One-off customization

### sx prop

To change the style of _one single instance_ of a component, the [`sx` prop](/system/basics/#the-sx-prop) is the recommended option.
It can be used with all Joy UI components.

{{"demo": "SxProp.js" }}

## Reusable component

### styled function

To create a custom and reusable component, the `styled` function is the recommended option.
You can access the theme and use its design tokens, maintaining consistency.
Additionally, the created component also accepts the `sx` prop if you ever want to do one-off customizations to it.

{{"demo": "StyledComponent.js"}}
