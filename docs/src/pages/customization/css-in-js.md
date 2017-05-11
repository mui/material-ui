# CSS in JS

Material-UI aims to provide strong foundations for building dynamic UIs.
For the sake of simplicity **we expose our internal styling solution to users**.
You can use it, but you don't have to. This styling solution is interoperable with another other one, like [PostCSS](https://github.com/postcss/postcss), [CSS modules](https://github.com/css-modules), or [styled-components](https://github.com/styled-components/styled-components).

## Our styling solution

In the previous versions, Material-UI was using LESS, then a custom inline-style solution to write the style of the components.
These approaches have proven to be limited.
Finally, we have [moved toward](https://github.com/oliviertassinari/a-journey-toward-better-style) a *CSS-in-JS* solution. We think that it's [the future](https://medium.freecodecamp.com/css-in-javascript-the-future-of-component-based-styling-70b161a79a32).

So, you may have noticed in the demos how that CSS in Javascript looks like.
We use the `createStyleSheet` function and `withStyles` Higher-order Component.
Here is an example:

{{demo='pages/customization/CssInJs.js'}}

## JSS

The styling solution of Material-UI is using [JSS](https://github.com/cssinjs/jss) at his core.
It's a [high performance](https://github.com/cssinjs/jss/blob/master/docs/performance.md) JS to CSS compiler which works at runtime and server-side.
It is about 5KB (minified and gzipped) and is extensible via [plugins](https://github.com/cssinjs/jss/blob/master/docs/plugins.md) API.

If you end up using that styling solution on your codebase, you gonna need to **learn the API**.
The best place to start is by looking at the features each [plugin](http://cssinjs.org/plugins) is providing. Material-UI is using the [`jss-preset-default`](http://cssinjs.org/jss-preset-default) module. You can always add new plugins if needed.

## API

### `createStyleSheet(name, styles) => styleSheet`

Generate a new style sheet that represents the style you want to inject in the DOM.

#### Arguments

1. `name` (*String*): The name of the style sheet. That useful for debugging.
2. `styles` (*Function | Object*): A function generating the styles or an object.

#### Returns

`styleSheet`: The newly created style sheet.

#### Examples

```js
import { createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('MyLink', (theme) => ({
  root: {
    color: 'inherit',
    textDecoration: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  primary: {
    color: theme.palette.primary[500],
  },
}));
```

### `withStyles(styleSheet) => Higher-order Component`

Link a style sheet with a component. It does not modify the component passed to it; instead, it returns a new, with a `classes` property. This `classes` object contains the name of the class names injected in the DOM.

#### Arguments

1. `styleSheet` (*Object*): The style sheet to link to the component. This object can be created with `createStyleSheet`.

#### Returns

`Higher-order Component`: Should be used to wrap a component.

#### Examples

```js
import { withStyles } from 'material-ui/styles';

export default withStyles(styleSheet)(MyComponent);
```
