# Themes

The theme specifies the color of the components, darkness of the surfaces, level of shadow, appropriate opacity of ink elements, etc.

Themes let you apply a consistent tone to your app. It allows you to **customize all design aspects** of your project in order to meet the specific needs of your business or brand.

To promote greater consistency between apps, light and dark theme types are available to choose from. By default, components use the light theme type.

## Theme provider

If you wish to customize the theme, you need to use the `MuiThemeProvider` component in order to inject a theme into your application. 
However, this is optional; Material-UI components come with a default theme.

`MuiThemeProvider` relies on the context feature of React to pass the theme down to the components,
so you need to make sure that `MuiThemeProvider` is a parent of the components you are trying to customize.
You can learn more about this in [the API section](#muithemeprovider).

## Theme configuration variables

Changing the theme configuration variables is the most effective way to match Material-UI to your needs.

### Palette

#### Intentions

A color intention is a mapping of a palette to a given intention within your application.

The theme expose the following color intentions:

- primary - used to represent primary interface elements for a user.
- secondary - used to represent secondary interface elements for a user.
- error - used to represent interface elements that the user should be made aware of.

The default palette uses the shades prefixed with `A` (`A200`, etc.) for the accent color 
and the un-prefixed shades for the other intentions, 
but you are free to select any shade when customizing the colors, 
or simply pass in any HTML color value as a string.

If you want to learn more about color, you can check out [the color section](/style/color).

#### Default palette

You may override the default palette values by including a `palette` object as part of your theme. 
The following example illustrates how you could recreate the the default palette values. 


```jsx
import { createMuiTheme } from 'material-ui/styles';
import indigo from 'material-ui/colors/indigo';
import pink from 'material-ui/colors/pink';
import red from 'material-ui/colors/red';

const defaultTheme = createMuiTheme()

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
  palette: {
    contrastThreshold: 3.1,
    tonalOffset: 0.07,
    primary: {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[700],
      contrastText: defaultTheme.palette.getContrastText(indigo[500]),
    },
    secondary: {
      light: pink.A200,
      main: pink.A400,
      dark: pink.A700,
      contrastText: defaultTheme.palette.getContrastText(pink.A400),
    },
    error: {
      main: red[500],
    },
  },
});
```

If `palette.primary` or `palette.secondary` objects are provided, 
they will replace the defaults.

If the `dark` and / or `light` keys are omitted, their value(s) will be calculated from `main`, 
according to the `tonalOffset` value.

If `contrastText` is omitted, its value will be calculated to contrast with `main`, 
according to the`contrastThreshold` value.

Both the `tonalOffset` and `contrastThreshold` values may be customized as needed. 
Note that `contrastThreshold` follows a non-linear curve.

#### Example

{{"demo": "pages/customization/Palette.js"}}

### Dark/light theme

You can make the theme dark by setting `type` to `dark`.

{{"demo": "pages/customization/DarkTheme.js", "hideEditButton": true}}


### Typography

Too many type sizes and styles at once can spoil any layout.
The theme provides a **limited set of type sizes** that work well together along with the layout grid.
These sizes are used across the components.

Have a look at the following example regarding changing the default values, such as the font family.
If you want to learn more about typography, you can check out [the typography section](/style/typography).

{{"demo": "pages/customization/TypographyTheme.js"}}

#### Font size

Material-UI uses `rem` units for the font size.
The browser html element default font size is `16px`, but browsers have an option to change this value,
so `rem` units allow us to accommodate the users settings, resulting in a much better user experience.

Users change font size settings for all kinds of reasons, from poor eyesight to choosing optimum settings
for devices that can be vastly different in size and viewing distance.

For instance, you might want to change this value when using the [10px simplification](https://www.sitepoint.com/understanding-and-using-rem-units-in-css/).
```css
html {
  font-size: 62.5%; /* 62.5% of 16px = 10px */
}
```

*You need to apply the above CSS on the html element of this page to see the below demo rendered correctly*

{{"demo": "pages/customization/FontSizeTheme.js"}}

### Other variables

In addition to the palette, dark and light types, and typography, the theme normalizes implementation by providing many more default values, such as breakpoints, shadows, transitions, etc.
You can check out the [default theme section](/customization/theme-default) to view the default theme in full.

### Adding custom style

When using Material-UI's [styling solution](/customization/css-in-js) with your own components,
you can also take advantage of the theme.
It can be convenient to add additional variables to the theme so you can use them everywhere.
For instance:

{{"demo": "pages/customization/CustomStyles.js"}}

## Customizing all instances of a component type

When the configuration variables aren't powerful enough, you can take advantage of the
`overrides` key of the `theme` to potentially change every single style injected by Material-UI into the DOM.
That's a really powerful feature.

{{"demo": "pages/customization/OverridesTheme.js"}}

The list of these customization points for each component is documented under the **Component API** section.
For instance, you can have a look at the [Button](/api/button#css-api).
Alternatively, you can always have a look at the [implementation](https://github.com/mui-org/material-ui/blob/v1-beta/src/Button/Button.js).

## Accessing the theme in a component

You might need to access the theme variables inside your React components.
Let's say you want to display the value of the primary color, you can use the `withTheme()` Higher-order Component to do so. Here is an example:

{{"demo": "pages/customization/WithTheme.js"}}

## Nesting the theme

The theming solution is very flexible, as you can nest multiple theme providers.
This can be really useful when dealing with different area of your application that have distinct appearance from each other.

{{"demo": "pages/customization/Nested.js"}}

## API

### `MuiThemeProvider`

This component takes a `theme` property, and makes the `theme` available down the React tree thanks to React context.
It should preferably be used at **the root of your component tree**.

You can see the full properties API in [this dedicated page](/api/mui-theme-provider).

#### Examples

```jsx
import React from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Root from './Root';

const theme = createMuiTheme();

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Root />
    </MuiThemeProvider>
  );
}

render(<App />, document.querySelector('#app'));
```

### `createMuiTheme(options) => theme`

Generate a theme base on the options received.

#### Arguments

1. `options` (*Object*): Takes an incomplete theme object and adds the missing parts.

#### Returns

`theme` (*Object*): A complete, ready to use theme object.

#### Examples

```js
import { createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});
```

### `withTheme()(Component) => Component`

Provide the `theme` object as a property of the input component.

#### Arguments

1. `Component`: The component that will be wrapped.

#### Returns

`Component`: The new component created.

#### Examples

```js
import { withTheme } from 'material-ui/styles'

export default withTheme()(MyComponent);
```
