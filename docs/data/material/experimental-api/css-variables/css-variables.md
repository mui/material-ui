# CSS variables

<p class="description">This is a guide for the experimental API for using CSS variables with the Material-UI components.</p>

The CSS variables support is the most upvoted issue related to the `@mui/system` package.
Some time ago, we have added an experimental API in this package that will allow us using CSS variables in the styles of the components.
Now, we want to try and utilize this new feature in one of the Material UI components.

> If you are curious to learn the benefits you would get by using CSS variables, check out the [RFC](https://github.com/mui/material-ui/issues/27651) for CSS variables support.

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

If you try to inspect this element, you will see that the color style have directly a hex value, that comes some theme token:

```html
<div style="color: #2e7d32;">...</div>
```

On the other hand, if the div uses some CSS variable as in this example:The one using the CSS variables however, allows developers to track the path of where the token is defined in theme:

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

More over, if you inspect the styles, you can click on the CSS variable and see the actual color value.
We believe this will significantly increase the DX when debugging the styles for the component.

### Custom theme

The example above uses the default theme. In the next example you will learn how to create your custom theme, using the `experimental_extendTheme` utility.

Before starting with the example, it's important to distingwish some differences in the theme structure.
The new theme structure, lets you define all different themes you have in one theme, by defining different color schemes.
Then, when you want to change the app to use different theme, you can use the `useColorScheme` to set the color scheme you want to use.
This will cause the browser to re-write the CSS varibles to point to the new values, while the components won't change at all, as they should still link to the same variables).

{{"demo": "CssVarsCustomTheme.js", "iframe": true }}

### Customization

At this moment, the `Button` component is the only component supporting CSS variables (the support is not requiring any breaking changes).
We would appreciate any feedback you can give us, by trying to use this new API.
If order to do that, you should wrap your application with a `Experimental_CssVarisProvider`, and try to customize the `Button` component using some CSS variables.

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

> If you want to help us bring this new API to more components sooner, feel free to contribute by adding the CSS variables support in some of the components. Make sure to check the [issue](https://github.com/mui/material-ui/issues/32049) that keeps track of our progress first, in case someone is already working on that component.

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
