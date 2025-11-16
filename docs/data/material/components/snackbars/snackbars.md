---
productId: material-ui
title: React Snackbar component
components: Snackbar, SnackbarContent
githubLabel: 'scope: snackbar'
materialDesign: https://m2.material.io/components/snackbars
waiAria: https://www.w3.org/TR/wai-aria-1.1/#alert
githubSource: packages/mui-material/src/Snackbar
---

# Snackbar

<p class="description">Snackbars (also known as toasts) are used for brief notifications of processes that have been or will be performed.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Introduction

The Snackbar component appears temporarily and floats above the UI to provide users with (non-critical) updates on an app's processes.
The demo below, inspired by Google Keep, shows a basic Snackbar with a text element and two actions:

{{"demo": "SimpleSnackbar.js"}}

### Usage

Snackbars differ from [Alerts](/material-ui/react-alert/) in that Snackbars have a fixed position and a high z-index, so they're intended to break out of the document flow; Alerts, on the other hand, are usually part of the flow—except when they're [used as children of a Snackbar](#use-with-alerts).

Snackbars also differ from [Dialogs](/material-ui/react-dialog/) in that Snackbars are not intended to convey _critical_ information or block the user from interacting with the rest of the app; Dialogs, by contrast, require input from the user in order to be dismissed.

## Basics

### Import

```jsx
import Snackbar from '@mui/material/Snackbar';
```

### Quick example

A tiny, copy-pastable example to get you started without opening the demo.

```jsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

export default function QuickSnackbarExample() {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Show snackbar
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Note archived"
        action={
          <Button color="inherit" size="small" onClick={() => setOpen(false)}>
            UNDO
          </Button>
        }
      />
    </div>
  );
}
```

### Position

Use the `anchorOrigin` prop to control the Snackbar's position on the screen.

{{"demo": "PositionedSnackbar.js"}}

### Content

```jsx
import SnackbarContent from '@mui/material/SnackbarContent';
```

Use the Snackbar Content component to add text and actions to the Snackbar.

{{"demo": "LongTextSnackbar.js"}}

### Automatic dismiss

Use the `autoHideDuration` prop to automatically trigger the Snackbar's `onClose` function after a set period of time (in milliseconds).

Make sure to [provide sufficient time](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits.html) for the user to process the information displayed on it.

{{"demo": "AutohideSnackbar.js"}}

### Transitions

You can use the `TransitionComponent` prop to change the transition of the Snackbar from [Grow](/material-ui/transitions/#grow) (the default) to others such as [Slide](/material-ui/transitions/#slide).

{{"demo": "TransitionsSnackbar.js"}}

## Customization

### Preventing default click away event

If you would like to prevent the default onClickAway behavior, you can set the event's `defaultMuiPrevented` property to `true`:

```jsx
<Snackbar
  slotProps={{
    clickAwayListener: {
      onClickAway: (event) => {
        // Prevent's default 'onClickAway' behavior.
        event.defaultMuiPrevented = true;
      },
    },
  }}
/>
```

### Use with Alerts

Use an Alert inside a Snackbar for messages that communicate a certain severity.

{{"demo": "CustomizedSnackbars.js"}}

### Use with Floating Action Buttons

If you're using a [Floating Action Button](/material-ui/react-floating-action-button/) on mobile, Material Design recommends positioning snackbars directly above it, as shown in the demo below:

{{"demo": "FabIntegrationSnackbar.js", "iframe": true, "maxWidth": 400}}

## Common examples

### Consecutive Snackbars

This demo shows how to display multiple Snackbars without stacking them by using a consecutive animation.

{{"demo": "ConsecutiveSnackbars.js"}}

## Supplementary components

### notistack

![stars](https://img.shields.io/github/stars/iamhosseindhv/notistack.svg?style=social&label=Star)
![npm downloads](https://img.shields.io/npm/dm/notistack.svg)

With an imperative API, [notistack](https://github.com/iamhosseindhv/notistack) lets you vertically stack multiple Snackbars without having to handle their open and close states.
Even though this is discouraged in the Material Design guidelines, it is still a common pattern.

{{"demo": "IntegrationNotistack.js", "defaultCodeOpen": false}}

:::warning
Note that notistack prevents Snackbars from being [closed by pressing <kbd class="key">Escape</kbd>](#accessibility).
:::

## Accessibility

The user should be able to dismiss Snackbars by pressing <kbd class="key">Escape</kbd>. If there are multiple instances appearing at the same time and you want <kbd class="key">Escape</kbd> to dismiss only the oldest one that's currently open, call `event.preventDefault` in the `onClose` prop.

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

## Anatomy

The Snackbar component is composed of a root `<div>` that houses interior elements like the Snackbar Content and other optional components (such as buttons or decorators).

```html
<div role="presentation" class="MuiSnackbar-root">
  <div class="MuiPaper-root MuiSnackbarContent-root" role="alert">
    <div class="MuiSnackbarContent-message">
      <!-- Snackbar content goes here -->
    </div>
  </div>
</div>
```
