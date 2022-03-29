# CSS variables

<p class="description">This is a guide for the experimental API for using CSS variables with the Material-UI components.</p>

The CSS variables support is the most upvoted issue related to the `@mui/system` package.
Some time ago, we have added an experimental API in this package that will allow us using CSS variables in the styles of the components.
Now, we want to try and utilize this new feature in one of the Material UI components.

## Motivation

There are three main problem that would be solved by using CSS variables:

1. Dark theme flash on SSR - the light theme is being loaded fist by default, and only after that the dark mode is appearing, causing a flash when opening the page.
2. Bad debugging experience - if you open the dev tools and try to inpect the styles of some element, all you see is the calculated value it receives, without any information of where that value came from.
3. Performance - at this moment, the dark and light themes are considered as different input in the `ThemeProvider`, causing the whole tree to re-render when the theme is changed.

## Solution

At this moment, the API does not require any breaking changes for the Material UI components, however it depends on using a new experimental provider for the theme, called `Experimental_CssVarsProvider`.
Except for providing the theme in the inner React context, this new provider has as a responsibility to generate CSS variables out of all tokens in the theme that are not functions, and make them available in the context.
All these variables, are available under a key in the theme, named `vars`.
The structure of this object is identical to the theme structure, the only difference is that the values represent some css varaibles.

The best way to see this is by example:

{{"demo": "CssVarsProviderBasic.js", "iframe": true }}

If you try to inspec the two `<code>` elements you will see that the style applied on them are different. The one using directly a theme token, looks something like this:

```
<code style="color: rgb(25, 118, 210);">...</code>
```

The one using the CSS variables however, allows developers to track the path of where the token is defined in theme:

```
<code style="color: var(--md-palette-primary-main);">...</code>
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
If you would like to try these new changes, you can wrap your application with a `Experimental_CssVarisProvider`, and try to customize the `Button` component using some CSS variables.

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
