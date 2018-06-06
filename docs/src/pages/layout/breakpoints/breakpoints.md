# Breakpoints

For optimal user experience, material design interfaces need to be able to adapt their layout at various breakpoints.
Material-UI uses a **simplified** implementation of the original [specification](https://material.io/design/layout/responsive-layout-grid.html#breakpoints).

Each breakpoint matches with a *fixed* screen width:
- **xs**, extra-small: 0px or larger
- **sm**, small: 600px or larger
- **md**, medium: 960px or larger
- **lg**, large: 1280px or larger
- **xl**, xlarge: 1920px or larger

These values can always be customized.
You will find them in the theme, in the [`breakpoints.values`](/customization/default-theme?expend-path=$.breakpoints.values) object.

The breakpoints are used internally in various components to make them responsive,
but you can also take advantage of them
for controlling the layout of your application through the [Grid](/layout/grid) and
[Hidden](/layout/hidden) components.

## Media Queries

CSS media queries is the idiomatic approach to make your UI responsive.
We provide some [CSS-in-JS](/customization/css-in-js) helpers to do so.

In the following demo, we change the background color (red, blue & green) based on the screen width.

{{"demo": "pages/layout/breakpoints/MediaQuery.js"}}

## withWidth()

Sometimes, using CSS isn't enough.
You might want to change the React rendering tree based on the breakpoint value, in JavaScript.
We provide a `withWidth()` higher-order component for this use case.

In the following demo, we change the rendered DOM element (*em*, <u>u</u>, ~~del~~ & span) based on the screen width.

{{"demo": "pages/layout/breakpoints/WithWidth.js"}}

⚠️ `withWidth()` server-side rendering support is limited.

## API

### `withWidth([options]) => higher-order component`

Inject a `width` property.
It does not modify the component passed to it; instead, it returns a new component.
This `width` breakpoint property match the current screen width.
It can be one of the following breakpoints:

```ts
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

Some implementation details that might be interesting to being aware of:
- It forwards *non React static* properties so this HOC is more "transparent".
For instance, it can be used to defined a `getInitialProps()` static method (next.js).

#### Arguments

1. `options` (*Object* [optional]):
  - `options.withTheme` (*Boolean* [optional]): Defaults to `false`. Provide the `theme` object to the component as a property.
  - `options.noSSR` (*Boolean* [optional]): Defaults to `false`.
  In order to perform the server-side rendering reconciliation, we need to render twice.
  A first time with nothing and a second time with the children.
  This double pass rendering cycle comes with a drawback. The UI might blink.
  You can set this flag to `true` if you are not doing server-side rendering.
  - `options.initialWidth` (*Breakpoint* [optional]):
  As `window.innerWidth` is unavailable on the server,
  we default to rendering an empty component during the first mount.
  In some situation, you might want to use an heuristic to approximate
  the screen width of the client browser screen width.
  For instance, you could be using the user-agent or the client-hints.
  http://caniuse.com/#search=client%20hint
  - `options.resizeInterval` (*Number* [optional]): Defaults to 166, corresponds to 10 frames at 60 Hz. Number of milliseconds to wait before responding to a screen resize event.

#### Returns

`higher-order component`: Should be used to wrap a component.

#### Examples

```jsx
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

class MyComponent extends React.Component {
  render () {
    if (isWidthUp('sm', this.props.width)) {
      return <span />
    }

    return <div />;
  }
}

export default withWidth()(MyComponent);
```

### `theme.breakpoints.up(key) => media query`

#### Arguments

1. `key` (*String* | *Number*): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in pixels.

#### Returns

`media query`: A media query string ready to be used with JSS.

#### Examples

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [md, ∞[
    //       [960px, ∞[
    [theme.breakpoints.up('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.down(key) => media query`

#### Arguments

1. `key` (*String* | *Number*): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in pixels.

#### Returns

`media query`: A media query string ready to be used with JSS.

#### Examples

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [0, md + 1[
    //       [0, lg[
    //       [0, 1280px[
    [theme.breakpoints.down('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.only(key) => media query`

#### Arguments

1. `key` (*String*): A breakpoint key (`xs`, `sm`, etc.).

#### Returns

`media query`: A media query string ready to be used with JSS.

#### Examples

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [md, md + 1[
    //       [md, lg[
    //       [960px, 1280px[
    [theme.breakpoints.only('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.between(start, end) => media query`

#### Arguments

1. `start` (*String*): A breakpoint key (`xs`, `sm`, etc.).
2. `end` (*String*): A breakpoint key (`xs`, `sm`, etc.).

#### Returns

`media query`: A media query string ready to be used with JSS.

#### Examples

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [sm, md + 1[
    //       [sm, lg[
    //       [600px, 1280px[
    [theme.breakpoints.between('sm', 'md')]: {
      backgroundColor: 'red',
    },
  },
});
```
