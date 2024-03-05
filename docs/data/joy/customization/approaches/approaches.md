# Approaches

<p class="description">Learn which approach is recommended, depending on the situation, to customize Joy UI components.</p>

- For customizing only a specific instance of a given component, [_use the `sx` prop_](#the-sx-prop).
- To ensure every instance of a given component looks the same across you app, [_use theming_](#theming).
- To create something that Joy UI doesn't support out of the box but still has design consistency, create a [_reusable component_](#reusable-component) that uses Joy UI's theme design tokens.

## The sx prop

The `sx` prop provides a superset of CSS (contains all CSS properties/selectors, in addition to custom ones) that maps values directly from the theme, depending on the CSS property used.

Every Joy UI component supports it and it's a tool that allows you to quickly customize components on the spot.
Visit [the `sx` prop documentation](/system/getting-started/the-sx-prop/) to learn more about it.

{{"demo": "SxProp.js"}}

## Theming

The theme is an object where you define both your design language with foundational tokens such as color schemes, typography and spacing scales, and how each component, and their different variants and states, uses them.

Here are some examples that reproduce popular designs (only the light mode, though):

{{"demo": "ButtonThemes.js", "hideToolbar": true}}

### Customizing theme tokens

Theme tokens refer to both _low-level_ and _global variant_ design tokens.

For example, instead of assigning the same hex code every time you want to change a given component's background color, you assign a theme token instead.
If, at any point, you want to change that, you'd change in one place only, ensuring you consistency across all the components that use that theme token.

To print your own design language into Joy UI components, start by customizing these tokens first, as every component uses them.

To do that, always use the `extendTheme` function as the customized tokens will be deeply merged into the default theme.
Under the hood, Joy UI will convert the tokens to CSS variables, enabling you to get them through `theme.vars.*`, which is very convenient as you can use any styling solution to read those CSS vars.

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
    display: 'Inter, var(--joy-fontFamily-fallback)',
    body: 'Inter, var(--joy-fontFamily-fallback)',
  },
});

function App() {
  return <CssVarsProvider theme={theme}>...</CssVarsProvider>;
}
```

### Customizing components

Each Joy UI component uses a pre-defined set of theme tokens.
For example, the default small [`Button`](/joy-ui/react-button/) comes with `fontSize: sm` by default.
To change that while ensuring that every instance of it has the same styles, do it [targeting the component directly from the theme](/joy-ui/customization/themed-components/).

Here's a preview of how you'd change the button's font size to large:

```js
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Button from '@mui/joy/Button';

const theme = extendTheme({
  components: {
    // The component identifier always start with `Joy${ComponentName}`.
    JoyButton: {
      styleOverrides: {
        root: ({ theme }) => {
          // theme.vars.* return the CSS variables.
          fontSize: theme.vars.fontSize.lg, // 'var(--joy-fontSize-lg)'
        },
      },
    },
  },
});

function MyApp() {
  return (
    <CssVarsProvider theme={theme}>
      <Button>Text</Button>
    </CssVarsProvider>
  );
}
```

## Reusable component

Creating new and custom components is always an option when you don't find exactly what you're looking for.
You can, however, ensure design consistency with other Joy UI components by pulling styles from the theme through the `styled` function.

You also gain the ability to use the `sx` prop, which also accepts theme tokens, to customize this newly created component.

{{"demo": "StyledComponent.js"}}
