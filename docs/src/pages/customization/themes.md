# Themes

Themes let you apply a consistent tone to your app.
It allows you to **customize all design aspects** of your project in order to meet the specific needs of your business or brand.

The theme specifies the darkness of the surfaces, level of shadow, appropriate opacity of ink elements, etc.
To promote greater consistency between apps, light and dark themes are available to choose from.
We are using [jss-theme-reactor](https://github.com/nathanmarks/jss-theme-reactor) under the hood.

## Configuration variables

Changing the configurations variables is the most effective way to match Material-UI to your needs. By default, your Material-UI application will use the light theme.

### Palette

#### Intentions

A color intention is a mapping of a palette to a given intention within your application.

We expose the following color intentions:

- primary - used to represent primary interface elements for a user.
- accent - used to represent secondary interface elements for a user.
- error - used to represent interface elements that the user should be careful of.

The palette is using the hues prefixed with `A` (`A200`, etc.) for the accent color and the hues unprefixed for the other intentions.
If you want to learn more about color, you can check out [the color section](/style/color).

#### Example

{{demo='pages/customization/Palette.js'}}

### Typography

Too many type sizes and styles at once can wreck any layout.
We use a **limited set of type sizes** that work well together along with the layout grid.
Those sizes are used accros our components.

Have a look at the following example regarding changing the default values, like the font family.
If you want to learn more about color, you can check out [the typography section](/style/typography).

{{demo='pages/customization/TypographyTheme.js'}}

### Dark/light theme

You can make a theme dark by setting `type` to `dark`.

{{demo='pages/customization/DarkTheme.js'}}

### The other variables

We have tried to normalize the implementation by adding many more variables: typography, breakpoints, transitions, etc. You can see below what the theme object looks like with the default values.
If you want to learn more, we suggesting having a look at [`material-ui/style/theme.js`](https://github.com/callemall/material-ui/blob/next/src/styles/theme.js).

{{demo='pages/customization/ThemeDefault.js'}}

### Business variables

When using our [styling solution](/customization/css-in-js) with your own components,
you can also take advantage of the theme.
It can be convenient to add additional variables to the theme so you can use them everywhere.
For instance:

{{demo='pages/customization/BusinessVariables.js'}}

## Customizing all instances of a component type

When the configuration variables aren't powerful enough, you can take advantage of the
`overrides` key to potentially change every single style injected by Material-UI into the DOM.
That's a really powerful feature.

{{demo='pages/customization/OverridesTheme.js'}}

The list of these customization points for each component is documented under the **Component API** section.
For instance, you can have a look at the [Button](/component-api/button#css-api).
Alternatively, you can always have a look at the [implementation](https://github.com/callemall/material-ui/blob/next/src/Button/Button.js).

## Accessing the theme in a component

You might need to access the theme variables inside your React components.
Let's say you want to display the value of the primary color, you can use the `withTheme()` Higher-order Component to do so. Here is an example:

{{demo='pages/customization/WithTheme.js'}}

## API

### `<MuiThemeProvider />`

This component takes a `theme` and a `styleManager` as properties.
It makes the `styleManager` available down the React tree thanks to React context, with the theme object as its property: `styleManager.theme`.
This component should preferably be used at **the root of your component tree**.

#### Examples

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import Root from './Root';

function App() {
  return (
    <MuiThemeProvider>
      <Root />
    </MuiThemeProvider>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

### `createMuiTheme(options) => theme`

Generate a theme base on the options received.

#### Arguments

1. `options` (*Object*): Takes an incomplete theme object and add the missing parts.

#### Returns

`theme` (*Object*): A complete, ready to use theme object.

#### Examples

```js
import { createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  status: {
    danger: 'orange',
  },
});
```

### `withTheme(Component) => Component`

Provide the `theme` object as a property of the input component.

#### Arguments

1. `Component`: The component that will be wrapped.

#### Returns

`Component`: The new component created.

#### Examples

```js
import { withTheme } from 'material-ui/styles'

export default withTheme(MyComponent);
```
