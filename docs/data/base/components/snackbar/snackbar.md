---
product: base
title: Unstyled React Snackbar component
components: SnackbarUnstyled
githubLabel: 'component: snackbar'
packageName: '@mui/base'
---

# Unstyled snackbar

<p class="description">The <code>SnackbarUnstyled</code> component provides brief notifications.</p>

```js
import SnackbarUnstyled from '@mui/base/SnackbarUnstyled';
```

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Basic usage

{{"demo": "UnstyledSnackbar.js", "defaultCodeOpen": false}}

## Providing `Transition` component

You can also provide a Transition component in `components.Transition` prop if you want to apply animations to your snackbar.

You can animate the open and close states of the snackbar with a render prop child and a transition component as shown below, as long as the component meets these conditions:

- Calls the `onEnter` callback prop when the enter transition starts
- Calls the `onExited` callback prop when the exit transition is completed

These two callbacks allow the snackbar to unmount the child content when closed and fully transitioned.

{{"demo": "TransitionComponentSnackbar.js", "defaultCodeOpen": false}}

## The useSnackbar hook

```js
import { useSnackbar } from '@mui/base/SnackbarUnstyled';
```

The `useSnackbar` hook lets you use the functionality of `SnackbarUnstyled` in other components.

It returns props to be placed on the root element and the transition element. If you are using `ClickAwayListener` to close the snackbar by clicking outside of it, make sure to pass `onClickAway` handler returned by this hook to the `ClickAwayListener` component.

Make sure to pass the `open` state to the hook and use it to show/hide the snackbar.

{{"demo": "UseSnackbar.js", "defaultCodeOpen": false}}
