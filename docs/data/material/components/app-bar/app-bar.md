---
product: material-ui
title: App bar React component
components: AppBar, Toolbar, Menu
githubLabel: 'component: app bar'
materialDesign: https://material.io/components/app-bars-top
---

# App bar

<p class="description">The App bar displays information and actions relating to the current screen.</p>

The top App bar provides content and actions related to the current screen. It's used for branding, screen titles, navigation, and actions.

It can transform into a contextual action bar or be used as a navbar.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic App bar

{{"demo": "ButtonAppBar.js", "bg": true}}

## App bar with menu

{{"demo": "MenuAppBar.js", "bg": true}}

## App bar with responsive menu

{{"demo": "ResponsiveAppBar.js", "bg": true}}

## App bar with search field

A side searchbar.

{{"demo": "SearchAppBar.js", "bg": true}}

## App bar with a primary search field

A primary searchbar.

{{"demo": "PrimarySearchAppBar.js", "bg": true}}

## Dense (desktop only)

{{"demo": "DenseAppBar.js", "bg": true}}

## Prominent

A prominent app bar.

{{"demo": "ProminentAppBar.js", "bg": true}}

## Bottom App bar

{{"demo": "BottomAppBar.js", "iframe": true, "maxWidth": 400}}

## Fixed placement

When you render the app bar position fixed, the dimension of the element doesn't impact the rest of the page. This can cause some part of your content to be invisible, behind the app bar. Here are 3 possible solutions:

1. You can use `position="sticky"` instead of fixed. ⚠️ sticky is not supported by IE11.
2. You can render a second `<Toolbar />` component:

```jsx
function App() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
```

3. You can use `theme.mixins.toolbar` CSS:

```jsx
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function App() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <Offset />
    </React.Fragment>
  );
}
```

## Scrolling

You can use the `useScrollTrigger()` hook to respond to user scroll actions.

### Hide App bar

The app bar hides on scroll down to leave more space for reading.

{{"demo": "HideAppBar.js", "iframe": true}}

### Elevate App bar

The app bar elevates on scroll to communicate that the user is not at the top of the page.

{{"demo": "ElevateAppBar.js", "iframe": true}}

### Back to top

A floating action buttons appears on scroll to make it easy to get back to the top of the page.

{{"demo": "BackToTop.js", "iframe": true}}

### `useScrollTrigger([options]) => trigger`

#### Arguments

1. `options` (_object_ [optional]):

   - `options.disableHysteresis` (_bool_ [optional]): Defaults to `false`. Disable the hysteresis. Ignore the scroll direction when determining the `trigger` value.
   - `options.target` (_Node_ [optional]): Defaults to `window`.
   - `options.threshold` (_number_ [optional]): Defaults to `100`. Change the `trigger` value when the vertical scroll strictly crosses this threshold (exclusive).

#### Returns

`trigger`: Does the scroll position match the criteria?

#### Examples

```jsx
import useScrollTrigger from '@mui/material/useScrollTrigger';

function HideOnScroll(props) {
  const trigger = useScrollTrigger();
  return (
    <Slide in={!trigger}>
      <div>Hello</div>
    </Slide>
  );
}
```

## Enable color on dark

Following the [Material Design guidelines](https://material.io/design/color/dark-theme.html), the `color` prop has no effect on the appearance of the app bar in dark mode.
You can override this behavior by setting the `enableColorOnDark` prop to `true`.

{{"demo": "EnableColorOnDarkAppBar.js", "bg": true}}
