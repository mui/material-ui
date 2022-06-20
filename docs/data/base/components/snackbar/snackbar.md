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
