# CSS in JS

## Responsive breakpoints

Sometimes, wrapping things inside a layout component doesn't make much sense when
everything you need can be handled by a small CSS change. By using the
[`breakpoints`](/customization/theme-default?expend-path=$.breakpoints) attribute of the theme, you can utilise the same breakpoints used
for the [Grid](/layout/grid) and [Hidden](/layout/hidden) components directly in your component.

This can be accomplished using [CSS-in-JS](/customization/css-in-js).

{{"demo": "pages/layout/MediaQuery.js"}}

## API

### `theme.breakpoings.up(key) => media query`

#### Arguments

1. `key` (*String* | *Number*): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in pixel.

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

### `theme.breakpoings.down(key) => media query`

#### Arguments

1. `key` (*String* | *Number*): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in pixel.

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

### `theme.breakpoings.only(key) => media query`

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

### `theme.breakpoings.between(start, end) => media query`

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
