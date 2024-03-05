# Breakpoints

<p class="description">Learn about the breakpoint API that lets you define styles for various screen widths.</p>

Material UI implements a _simplified_ version of the [Material Design 2 specification](https://m2.material.io/design/layout/responsive-layout-grid.html#breakpoints) for breakpoints.

## Default breakpoints

Material UI offers 5 breakpoint keys that correspond to fixed screen width values:

<!-- Keep in sync with packages/mui-system/src/createTheme/createBreakpoints.d.ts -->

- `xs` - extra-small: 0px
- `sm` - small: 600px
- `md` - medium: 900px
- `lg` - large: 1200px
- `xl` - extra-large: 1536px

You can also visualize the default values on the [Default theme viewer](/material-ui/customization/default-theme/?expand-path=$.breakpoints) or by opening the dev tools console and running `window.theme.breakpoints`.

## CSS Media Queries

In vanilla CSS, you'd use media queries to conditionally add styles depending on the breakpoint.
Material UI offers a set of breakpoint helpers that you can use similarly to media queries in both styled components or within the sx prop.

- [theme.breakpoints.up(key)](#up-key)
- [theme.breakpoints.down(key)](#down-key)
- [theme.breakpoints.only(key)](#only-key)
- [theme.breakpoints.not(key)](#not-key)
- [theme.breakpoints.between(start, end)](#between-start-end)

The demo below shows how to change the box's background color based on the breakpoint using the above-mentioned helpers.

{{"demo": "MediaQuery.js", "defaultCodeOpen": true}}

## The useMediaQuery hook

If CSS media queries are insufficient, you can use the [`useMediaQuery`](/material-ui/react-use-media-query/) hook to render elements conditionally based on the breakpoint.

## Custom breakpoints

Add a new key and value pair under the `theme.breakpoint.values` node of your theme.

```js
const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
      // note that these values are defined in pixels
    },
  },
});
```

<!-- Keep in sync with packages/mui-system/src/createTheme/createBreakpoints.d.ts -->

<!-- - [`theme.breakpoints.values`](/material-ui/customization/default-theme/?expand-path=$.breakpoints.values): Default to the [above values](#default-breakpoints). The keys are your screen names, and the values are the min-width where that breakpoint should start.
- `theme.breakpoints.unit`: Default to `'px'`. The unit used for the breakpoint's values.
- `theme.breakpoints.step`: Default to `5`. The increment divided by 100 used to implement exclusive breakpoints.
  For example, `{ step: 5 }` means that `down(500)` will result in `'(max-width: 499.95px)'`.

If you change the default breakpoints's values, you need to provide them all: -->

### TypeScript

If you are using TypeScript, you need to use [module augmentation](/material-ui/guides/typescript/#customization-of-theme) for the theme to accept the above values.

<!-- Tested with packages/mui-material/test/typescript/breakpointsOverrides.augmentation.tsconfig.json -->

```ts
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
}
```

## API

<!-- ### `theme.breakpoints.up(key) => media query` -->

### up(key)

<!-- Keep in sync with packages/mui-system/src/createTheme/createBreakpoints.d.ts -->

#### Arguments

`key` (string | number): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in px.

#### Returns

`media query`: A media query string that matches screen widths greater than the screen size defined by the breakpoint key (inclusive).

#### Examples

```js
const styles = (theme) => ({
  root: {
    backgroundColor: 'blue',
    // Match [md, ∞)
    //       [900px, ∞)
    [theme.breakpoints.up('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### down(key)

<!-- Keep in sync with packages/mui-system/src/createTheme/createBreakpoints.d.ts -->

#### Arguments

`key` (string | number): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in px.

#### Returns

`media query`: A media query string that matches screen widths less than the screen size defined by the breakpoint key (exclusive).

#### Examples

```js
const styles = (theme) => ({
  root: {
    backgroundColor: 'blue',
    // Match [0, md)
    //       [0, 900px)
    [theme.breakpoints.down('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### only(key)

<!-- Keep in sync with packages/mui-system/src/createTheme/createBreakpoints.d.ts -->

#### Arguments

`key` (string): A breakpoint key (`xs`, `sm`, etc.).

#### Returns

`media query`: A media query string that matches screen widths starting from the screen size defined by the breakpoint key (inclusive) and stopping at the screen size defined by the next breakpoint key (exclusive).

#### Examples

```js
const styles = (theme) => ({
  root: {
    backgroundColor: 'blue',
    // Match [md, md + 1)
    //       [md, lg)
    //       [900px, 1200px)
    [theme.breakpoints.only('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### not(key)

<!-- Keep in sync with packages/mui-system/src/createTheme/createBreakpoints.d.ts -->

#### Arguments

`key` (string): A breakpoint key (`xs`, `sm`, etc.).

#### Returns

`media query`: A media query string that matches screen widths stopping at the screen size defined by the breakpoint key (exclusive) and starting at the screen size defined by the next breakpoint key (inclusive).

#### Examples

```js
const styles = (theme) => ({
  root: {
    backgroundColor: 'blue',
    // Match [xs, md) and [md + 1, ∞)
    //       [xs, md) and [lg, ∞)
    //       [0px, 900px) and [1200px, ∞)
    [theme.breakpoints.not('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### between(start, end)

<!-- Keep in sync with packages/mui-system/src/createTheme/createBreakpoints.d.ts -->

#### Arguments

1. `start` (string): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in px.
2. `end` (string): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in px.

#### Returns

`media query`: A media query string that matches screen widths greater than the screen size defined by the breakpoint key in the first argument (inclusive) and less than the screen size defined by the breakpoint key in the second argument (exclusive).

#### Examples

```js
const styles = (theme) => ({
  root: {
    backgroundColor: 'blue',
    // Match [sm, md)
    //       [600px, 900px)
    [theme.breakpoints.between('sm', 'md')]: {
      backgroundColor: 'red',
    },
  },
});
```
