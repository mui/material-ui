# CSS variables

<p class="description">Learn about the experimental API for using CSS variables on Material UI components.</p>

CSS variables is the most upvoted `@mui/system` related issue.
It allows several improvements in developer experience, like fixing dark mode SSR flickering, allowing multiple themes other than only light and dark, better debugging experience overall, and many others.
To learn more, check [the RFC](https://github.com/mui/material-ui/issues/27651) we did about it.

A while ago, we added an experimental API to the System package meant to allow styling the components with CSS variables.
We want now to take it one step further and utilize it in one of the Material UI components.

## Usage

At this moment, the API does not require any breaking changes for the Material UI components, however it depends on using a new experimental provider for the theme, called `Experimental_CssVarsProvider`.
Except for providing the theme in the inner React context, this new provider has as a responsibility to generate CSS variables out of all tokens in the theme that are not functions, and make them available in the context.

All these variables, are available under a key in the theme, named `vars`.
The structure of this object is identical to the theme structure, the only difference is that the values represent some CSS varaibles.

The best way to see this is by example.
Let's say we have this element that uses some theme token:

```jsx
const Example() {
  const theme = useTheme();
  return <div style={{ color: theme.palette.success.main }}>Success div</div>
}
```

{{"demo": "SuccessDivThemeToken.js", "hideToolbar": true }}

If you try to inspect it, you will see that the color style has a direct hex value, that comes from some theme token:

```html
<div style="color: #2e7d32;">...</div>
```

Now, if the same div used CSS variables, as in the example below, you'll be able to track where that color token is defined in the theme:

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

Additionally, by clicking on the CSS variable in the browser's dev tools, you'll be taken to the theme object where you'll see its direct hex value again.
We believe this to be a significant improvement in developer experience when debugging styles for any component.

### Creating a custom theme

The example above is using the default Material UI theme.
But, what if you wanted to create your own custom theme?
Let's see how to do that using the `experimental_extendTheme` utility.

To start, it is important to understand this new theme structure.
A theme is a collection of color schemes, each one defined within a single theme object.
You'll be able to create more than light and dark color schemes if you want but, for the sake of simplicity, let's use only these two as an example. Here's how you'd customize it:

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
This will make the browser re-write the CSS variables, pointing them to the new values you've created.
The components' classes won't change at all, though—they should still refer to the same variables as before.

### Customizing components

As of now, the `Button` component is the only one supporting CSS variables (note that it doesn't cause any breaking change).
To customize it using CSS variables, you'll need to wrap your application with `Experimental_CssVarisProvider`.
Play around with the demo below!
We'd appreciate any feedback about this API, as it is still in development.

{{"demo": "CssVariablesCustomization.js", "iframe": true }}

If you are using `TypeScript` you should use module augmentaiton to update the `Theme` structure:

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
