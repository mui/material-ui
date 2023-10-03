---
productId: material-ui
title: React Snackbar component
components: Snackbar, SnackbarContent
githubLabel: 'component: snackbar'
materialDesign: https://m2.material.io/components/snackbars
waiAria: https://www.w3.org/TR/wai-aria-1.1/#alert
---

# Snackbar

<p class="description">Also known as a toast, snackbars are used for brief notifications of a process that has been performed or will perform.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basics

```jsx
import Snackbar from '@mui/material/Snackbar';
```

Inspired by Google Keep, the demo below shows a basic snackbar with a text element and two actions.

{{"demo": "SimpleSnackbar.js"}}

## Customization

### Position

Use the `anchorOrigin` prop to control the snackbar position on the screen.

{{"demo": "PositionedSnackbar.js"}}

### Content

```jsx
import SnackbarContent from '@mui/material/SnackbarContent';
```

Use the Snackbar Content component for adding text and actions to the snackbar.

{{"demo": "LongTextSnackbar.js"}}

### Usage with Alerts

Use the Alert component inside a Snackbar for messages that communicate a certain severity.

{{"demo": "CustomizedSnackbars.js"}}

### Transitions

Combined with the [Grow](/material-ui/transitions/#grow) (default) and [Slide](/material-ui/transitions/#slide) transition components, use the `TransitionComponent` prop to add transitions to the Snackbar.

{{"demo": "TransitionsSnackbar.js"}}

#### Using the Slide transition

The demo below shows how to use the Slide transition.

{{"demo": "DirectionSnackbar.js"}}

## Common examples

### Consecutive snackbars

The demo below shows how to show multiple snackbars without stacking them, using a consecutive animation.

{{"demo": "ConsecutiveSnackbars.js"}}

### Usage with a FAB

If you're using a [Floating Action Button](/material-ui/react-floating-action-button/) on mobile, Material Design recommends positioning any snackbar right above it.
The demo below shows you how to do that.

{{"demo": "FabIntegrationSnackbar.js", "iframe": true, "maxWidth": 400}}

## Complementary projects

### notistack

![stars](https://img.shields.io/github/stars/iamhosseindhv/notistack.svg?style=social&label=Star)
![npm downloads](https://img.shields.io/npm/dm/notistack.svg)

With an imperative API, [notistack](https://github.com/iamhosseindhv/notistack) allows you to vertically stack multiple Snackbars without having to handle their open and close states.
Even though this is discouraged by Material Design, it is still a common pattern found across many other apps.

{{"demo": "IntegrationNotistack.js", "defaultCodeOpen": false}}

## Accessibility

Here are a few tips to make sure you have an accessible Snackbar component:

- Based on the [WAI-ARIA guidelines](https://www.w3.org/TR/wai-aria-1.1/#alert), the Snackbar won't auto-hide by default.
  If you use the `autoHideDuration` prop, make sure to [sufficient time](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits.html) for the user to process the information displayed on it.

- All Snackbars are automatically dismissed by pressing <kbd class="key">Escape</kbd>. If you have multiple instances appearing at the same time and want <kbd class="key">Escape</kbd> to dismiss only the oldest currently open, call `event.preventDefault` in the `onClose` prop.

```jsx
export default function MyComponent() {
  const [open, setOpen] = React.useState(true);

  return (
    <React.Fragment>
      <Snackbar
        open={open}
        onClose={(event, reason) => {
          // `reason === 'escapeKeyDown'` if `Escape` was pressed
          setOpen(false);
          // call `event.preventDefault` to only close one Snackbar at a time.
        }}
      />
      <Snackbar open={open} onClose={() => setOpen(false)} />
    </React.Fragment>
  );
}
```
