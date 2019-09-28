# @material-ui/core/styles

<p class="description">You can use Material-UI's styling solution in your app, whether or not you are using Material-UI components.</p>

Material-UI aims to provide a strong foundation for building dynamic UIs.
For the sake of simplicity, the styling solution used in Material-UI components is exported from `@material-ui/core/styles`.
You can use it, but you don't have to, since Material-UI is also [interoperable with](/guides/interoperability/) all the other major styling solutions.

## Why use Material-UI's styling solution?

[A *CSS-in-JS* solution](https://github.com/oliviertassinari/a-journey-toward-better-style) overcomes the limitations of CSS, and inline styles,
and **unlocks many great features** (theme nesting, dynamic styles, self-support, etc.):

- 💅 It has [the same advantages](https://www.styled-components.com/docs/basics#motivation) as styled-components.
- 🚀 It's [blazing fast](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-benchmark/README.md#material-uistyles).
- 🧩 It's extensible via a [plugin](https://github.com/cssinjs/jss/blob/master/docs/plugins.md) API.
- ⚡️ It uses [JSS](https://github.com/cssinjs/jss) at its core – a [high performance](https://github.com/cssinjs/jss/blob/master/docs/performance.md) JavaScript to CSS compiler which works at runtime and server-side.
- 📦 No bundle size increase if used alongside Material-UI.

## Getting started

There are 3 possible APIs you can use to generate and apply styles, however they all share the same underlying logic:

- Hook API
- Higher-order component API
- Styled-components API

### Hook API

Hooks can only be used with function components.

#### `@material-ui/core/styles/makeStyles`

{{"demo": "pages/styles/basics/Hook.js", "defaultCodeOpen": true}}

### Higher-order component API

#### `@material-ui/core/styles/withStyles`

This is helpful if you use class components, and can't use the hook API.

{{"demo": "pages/styles/basics/HigherOrderComponent.js", "defaultCodeOpen": true}}

### Styled components API

#### `@material-ui/core/styles/styled`

Note: this only applies to the calling syntax – style definitions still use a JSS object.
You can also [change this to allow CSS](/styles/advanced/#string-templates), with some limitations.

{{"demo": "pages/styles/basics/StyledComponents.js", "defaultCodeOpen": true}}

## Nesting selectors

You can nest selectors to target elements inside the current class or component.
The following example uses the Hook API, but it works the same way with the other APIs.

```js
const useStyles = makeStyles({
  root: {
    padding: 16,
    color: 'red',
    '& p': {
      color: 'green',
      '& span': {
        color: 'blue'
      }
    }
  },
});
```

{{"demo": "pages/styles/basics/NestedStylesHook.js"}}

## Adapting based on props

You can pass a function to `makeStyles` ("interpolation")
in order to adapt the generated value based on the component's props.
The function can be provided at the style rule level, or at the CSS property level.

The following example uses the Hook API, but it works the same way with the other APIs
(see below for examples).

```jsx
const useStyles = makeStyles({
  // style rule
  foo: props => ({
    backgroundColor: props.backgroundColor,
  }),
  bar: {
    // CSS property
    color: props => props.color,
  },
});

function MyComponent() {
  // Simulated props for the purpose of the example
  const props = { backgroundColor: 'black', color: 'white' };
  // Pass the props as the first argument of useStyles()
  const classes = useStyles(props);

  return <div className={`${classes.foo} ${classes.bar}`} />
}
```

This button component has a color property that changes its color:

### Adapting the hook API

{{"demo": "pages/styles/basics/AdaptingHook.js", "react":"next"}}

### Adapting the styled components API

{{"demo": "pages/styles/basics/AdaptingStyledComponents.js"}}

### Adapting the higher-order component API

{{"demo": "pages/styles/basics/AdaptingHOC.js"}}

## Stress test

In the following stress test, you can update the *theme color* and the *background-color property* live:

```js
const useStyles = makeStyles(theme => ({
  root: props => ({
    backgroundColor: props.backgroundColor,
    color: theme.color,
  }),
}));
```

{{"demo": "pages/styles/basics/StressTest.js"}}

## @material-ui/styles vs @material-ui/core/styles

Material-UI styles are powered by the [@material-ui/styles](https://www.npmjs.com/package/@material-ui/styles) npm package (and JSS).
This solution is [isolated](https://bundlephobia.com/result?p=@material-ui/styles), it does not know about the default Material-UI theme.
It can be used to style React applications that are not using Material-UI framework.

To remove the need for injecting a theme in the React's context **systematically** and to reduce the number of manual installations a developer needs to do, the `@material-ui/styles` modules are re-exported from `@material-ui/core/styles` (with a default theme).

For instance:

```js
// Re-export with a default theme
import { makeStyles } from '@material-ui/core/styles';

// Original module
import { makeStyles } from '@material-ui/styles';
```
