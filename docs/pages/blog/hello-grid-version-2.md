---
title: Hello, Grid version 2
description: We're excited to introduce the Grid version 2 that comes with new features and improvements!
date: 2022-08-20T00:00:00.000Z
authors: ['siriwatknp']
tags: ['MUI Core', 'News']
card: false
---

We have shipped the new `Grid` component in [Material UI v5.9.0](https://github.com/mui/material-ui/releases/tag/v5.9.0) that will replace the existing one in the next major release.

```js
import Grid from '@mui/material/Grid'; // The current grid, a.k.a. Grid v1
import Grid2 from '@mui/material/Unstable_Grid2'; // The new grid, a.k.a. Grid v2
```

## The problems and motivation

- To fix the migration pain points ([#26266](https://github.com/mui/material-ui/issues/29266) and [#31244](https://github.com/mui/material-ui/issues/31244)) for the grid component which is caused by the [implementation changes](https://github.com/mui/material-ui/pull/24332) introduced in v5.
- It is an opportunity to add the long-awaited [offset feature](https://github.com/mui/material-ui/issues/11251) to the grid component.
- The grid container is using child combinator (`>`) to style the grid items which makes [customization](https://github.com/mui/material-ui/issues/28855) harder.
- The [limitation](https://mui.com/material-ui/react-grid/#nested-grid) on nested grids could be fixed.
- Unnecessary `item` prop.

## What's new

The `Grid v2` has been rewritten from scratch with CSS variables and `calc()` which lets us fix the issues and apply new features easily.

### 💥 Breaking change

The negative margin in `Grid v2` spreads equally on all sides by default (same as the `Grid` in Material UI v4).

:::info
We believe that the migration from Grid `v1` to `v2` will be smooth for most of the cases.
:::

### 🚀 New features

#### [Preventing scrollbar](/material-ui/react-grid2/#disable-the-scrollbar)

A new prop called `disableEqualOverflow` is added to properly prevent the scrollbar issue in small viewports.

#### [Offset](/material-ui/react-grid2/#offset)

We have added the long-awaited offset feature to `Grid v2`. Thanks to CSS variables, it lets us implement the feature with just a few lines of code.

### ✨ Improvements

#### Simplifying logic

Some parts of the calculation are delegated to CSS by using CSS variables and `calc()` together. They reduces the need of javascript and makes the component scalable.

For example, the `Grid v1` currently calculates the width by reading the value from a React context. However, with CSS variables in place, we can remove the React context and hand over the work to CSS instead:

```js
{
  // --Grid-columns is defined in the grid container
  width: `calc(100% * ${value} / var(--Grid-columns))`,
}
```

Another example is how the padding is calculated in grid items:

In `Grid v1`, grid items has no information about the padding it should have because the `spacing` prop is defined on the grid container. So, the simplest way is to control the padding from the grid container using CSS child combinator (`>`):

```js
function getOffset(val) {
  const parse = parseFloat(val);
  return `${parse}${String(val).replace(String(parse), '') || 'px'}`;
}
// ...The code is shorten for readability
({
  [`& > .${gridClasses.item}`]: {
    // Grid item's padding is controlled by its container
    paddingTop: getOffset(themeSpacing),
  },
});
```

However, in `Grid v2`, the javascript logic can be separated independently because CSS variables shift the communication between container and item to CSS.

- **Grid container** takes care of the variables generation based on the `spacing` prop:
  ```js
  // The code is simplified for readability
  {
    '--Grid-rowSpacing': spacingProp,
    '--Grid-columnSpacing': spacingProp,
  }
  ```
- **Grid item** refers to the variables:
  ```js
  {
    padding: `calc(var(--Grid-rowSpacing) / 2) calc(var(--Grid-columnSpacing) / 2)`,
  }
  ```

This is a very good use case for applying CSS variables when it comes to components that has a parent-child relationship which also support media query customization.

#### Remove unnecessary props

In version 2, `Grid` is always an item which is similar to the flexbox item in CSS, so the `item` prop is not needed anymore.

We also update the grid styles to work with ellipsis text by default, so the `zeroMinWidth` prop is removed.

```diff
 <Grid container spacing={2}>
-  <Grid item zeroMinWidth><Typography>Long text...</Typography></Grid>
+  <Grid><Typography>Long text...</Typography></Grid>
 </Grid>
```

#### Nested grid

With CSS variables and the removal of the `item` prop, there is no more limitation for creating nested grids.

As a bonus, a grid container automatically inherits row and column spacing values from the root grid container unless they are specified directly on the component.

```js
import Grid from '@mui/material/Unstable_Grid2`;

// root grid container
<Grid container spacing={2}>
  <Grid>...</Grid>
  <Grid container> {/* inherits spacing from the root container */}
    <Grid>...</Grid>
    <Grid>...</Grid>
  </Grid>
  <Grid>...</Grid>
</Grid>
```

## Future plan and migration

Since the `Grid v2` is rewritten from scratch, it is currently considered Unstable\_ as we give the community time to try it out and offer feedback. We will make it stable and deprecate v1 in the next major release of Material UI.

Are you convinced? check out the [demos](/material-ui/react-grid2/) and the [migrating to Grid v2](/material-ui/migration/migration-grid-v2/) pages.

<hr />

**That's it for today!** Happy coding 👨‍💻👩‍💻!.

I hope this new Grid implementation will make your life easier. Don't forget to share this update with your friends and colleagues.

To get more updates like this in the future, **subscribe to our newsletter** at the bottom of this page.
