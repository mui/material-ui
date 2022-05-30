# Introduction

<p class="description">Learn the ways to customize Joy UI.</p>

<!-- The purpose of this page is to give the overall customization alternatives to developers without providing too much details -->
<!-- Some examples and demos are provided to give the sense of what it looks like and then lead each part to another page for more technical details and more examples -->

There are mainly 3 customization alternatives:

- Global customization (theming)
- One-off customization (per instance)
- Reusable component (custom component)

## Theming

If you want to apply the style to every instances of the components, theming is the right choice. You can think of theming as wrapping components with a mask and put some paint on it. So, you should be able to switch between themes without changing your application's logic.

Here are some examples that replicate the popular designs (only the light mode):

{{"demo": "ButtonThemes.js", "hideToolbar": true}}

Theming can be categorized into 2 parts, **tokens** and **components**.

### Tokens theming

The tokens (design tokens) are meaningful variables that create consistent design for the application.

:::warning
Customizing the theme tokens affects all of the components that consume them. If you want to apply a style to a specific component, you should use [**Components theming**](#components-theming) instead.
:::

Joy has 8 buckets that store the default tokens:

- palette
- fontSize
- fontFamily
- fontWeight
- lineHeight
- letterSpacing
- radius
- shadow

To **override the default tokens**, always use the `extendTheme` function. The specified tokens will be deeply merged to the default theme.

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

You can also provide your own design tokens. Joy will convert them to CSS variables and you will be able to get them from `theme.vars.*`. It is very convenient because you can use any styling solution to read those CSS variables.

If you want to see all of the default tokens and more realistic examples, check out the [theme tokens](/joy-ui/customization/theme-tokens/) page.

### Components theming

This approach ensures that the style is applied to every instances of a specific component.

Here is an example of theming the button:

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

For more details and examples, check out the [theme components](/joy-ui/customization/theme-components/) page. If you need more details about using CSS variables in Joy, check out the [using CSS variables](/joy-ui/customization/using-css-variables/) page.

## One-off customization

To change the style of _one single instance_ of a component.

### sx prop

The [`sx` prop](/system/basics/#the-sx-prop) is the best option for adding style overrides to a single instance of a component in most cases. It can be used with all Joy UI components.

{{"demo": "SxProp.js" }}

## Reusable component

### styled function

Best for creating your own reusable component. It can access to the theme and the output component automatically accepts the `sx` prop.

{{"demo": "StyledComponent.js", "bg": true}}
