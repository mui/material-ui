# CSS variables

<p class="description">Learn about the experimental API for using CSS variables on Material UI components.</p>

CSS variables provide significant improvements in developer experience related to theming and customization.
With these variables, you can inject a theme into your app's stylesheet _at build time_ to apply the user's selected settings before the whole app is rendered.
This solves the problem of dark-mode SSR flickering; lets you provide your users with multiple themes beyond light and dark; and offers a better debugging experience overall, among other benefits.

Previously, these CSS variables were only available as an experimental API in the MUI System package.
Now they are ready for experimental use with Material UI components.

## Usage

The CSS variables API relies on a new experimental provider for the theme called `Experimental_CssVarsProvider` to inject styles into Material UI components.
In addition to providing the theme in the inner React context, this new provider also generates CSS variables out of all tokens in the theme that are not functions, and makes them available in the context as well.

All of these variables are accessible in an object in the theme called `vars`.
The structure of this object is identical to the theme structure—the only difference is that the values represent CSS variables.

Consider an element that uses a theme token:

```jsx
const Example() {
  const theme = useTheme();
  return <div style={{ color: theme.palette.success.main }}>Success div</div>
}
```

{{"demo": "SuccessDivThemeToken.js", "hideToolbar": true }}

If you inspect it, you will see that the color style has a direct hex value that comes from the theme token:

```html
<div style="color: #2e7d32;">...</div>
```

This makes the code difficult to debug, because the app could have multiple theme tokens, but this doesn't give you any information about which theme is responsible for this style.

If that same `<div>` used CSS variables instead—as in the example below—you could track _where_ that color token is defined in the theme:

```jsx
const Example() {
  const theme = useTheme();
  return <div style={{ color: theme.vars.palette.success.main }}>Success div</div>
}
```

{{"demo": "SuccessDivCSSVariable.js", "hideToolbar": true }}

```html
<div style="color: var(--md-palette-success-main);">...</div>
```

Clicking on the CSS variable in the browser's dev tools takes you to the theme object where you'll see its direct hex value again.
This offers a huge improvement to the overall experience of debugging component styles.

### Creating a custom theme

If you want to override Material UI's default theme, you can create your own custom theme with CSS variables using the `experimental_extendTheme` utility.

A theme is an object that contains a collection of color schemes.
Your custom theme can contain as many color schemes as you like, including light, dark and more.

Here's how to create light and dark schemes in a custom theme using CSS variables:

```jsx
const theme = experimental_extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange,
      },
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange,
      },
    },
  },
});
```

{{"demo": "CssVarsCustomTheme.js", "iframe": true }}

To toggle between color schemes, you can use the `useColorScheme` hook.
This will make the browser re-write the CSS variables, pointing them to the new values you created—but the components' classes will still refer to the same variables as before.

### Customizing components

Because the CSS variables API is an experimental feature, it is currently only supported by the `Button` component.
To customize it using CSS variables, you'll need to wrap your application with `Experimental_CssVarsProvider`.
Play around with the demo below!
We'd appreciate any feedback about this API, as it is still in development.

{{"demo": "CssVariablesCustomization.js", "iframe": true }}

If you are using TypeScript you should use module augmentation to update the `Theme` structure:

```tsx
import { Theme as MuiTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    vars: Omit<
      MuiTheme,
      'typography' | 'mixins' | 'breakpoints' | 'direction' | 'transitions'
    >;
  }
}
```

> To help us bring this new API to more components faster, feel free to contribute by adding CSS variables support in more components. Make sure to check the [GitHub issue](https://github.com/mui/material-ui/issues/32049) that keeps track of our progress first, in case someone took the lead already on the component you were thinking of.

## API

`<CssVarsProvider>` props:

- `defaultColorScheme: ColorScheme | { light: ColorScheme; dark: ColorScheme }` - Design system default color scheme. Provides string if the design system has one default color scheme (either light or dark) or object if the design system has default light & dark color schemes.
- `defaultMode?: Mode` - Design system default mode.
- `disableTransitionOnChange : boolean` - Disable CSS transitions when switching between modes or color schemes
- `enableColorScheme: boolean` - Indicate to the browser which color scheme is used (light or dark) for rendering built-in UI
- `prefix: string` - CSS variable prefix
- `theme: ThemeInput`
- `modeStorageKey?: string` - localStorage key used to store application `mode`
- `attribute?: string` - DOM attribute for applying color scheme
