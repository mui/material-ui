---
product: base
title: Unstyled React Snackbar component and hook
components: SnackbarUnstyled
githubLabel: 'component: snackbar'
---

# Unstyled snackbar

<p class="description">The SnackbarUnstyled component informs users that an action has been or will be performed by the app.</p>

## Introduction

A snackbar provides users with a brief, temporary message about app processes without interrupting their activity or experience.

The `SnackbarUnstyled` component is built to appear on-screen to inform users about an action that the app is taking.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

### Usage

After [installation](/base/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import SnackbarUnstyled from '@mui/base/SnackbarUnstyled';

export default function MyApp() {
  return <SnackbarUnstyled>{/* snackbar text */}</SnackbarUnstyled>;
}
```

### Basics

`SnackbarUnstyled` doesn't impose any restrictions on its implementation—it's up to you to design it so that it doesn't interrupt the user experience, and disappears after a set amount of time without requiring the user to take action.

Use the `autoHideDuration` prop to set the time (in milliseconds) that the snackbar remains on the screen.

:::info
You may want to implement `SnackbarUnstyled` with [`ClickAwayListener`](/base/react-click-away-listener/), so that the user can choose to dismiss the snackbar before its time is up by clicking anywhere outside of it.
But this behavior is optional for a snackbar.
:::

The following demo illustrates the basic usage of `SnackbarUnstyled`.
Click **Open snackbar** to see how it behaves:

{{"demo": "UnstyledSnackbar.js", "defaultCodeOpen": false}}

### Anatomy

The `SnackbarUnstyled` component is composed of a single root `<div>` slot with no interior slots:

```html
<div role="presentation" className="BaseSnackbar-root">snackbar content</div>
```

### Slot props

:::info
The following props are available on all non-utility Base components.
See [Usage](/base/getting-started/usage/) for full details.
:::

Use the `component` prop to override the root slot with a custom element:

```jsx
<SnackbarUnstyled component="span" />
```

Use the `components` prop to override any interior slots in addition to the root:

```jsx
<SnackbarUnstyled components={{ Root: 'span' }} />
```

:::warning
If the root element is customized with both the `component` and `components` props, then `component` will take precedence.
:::

Use the `componentsProps` prop to pass custom props to internal slots.
The following code snippet applies a CSS class called `my-snackbar` to the root slot:

```jsx
<SnackbarUnstyled componentsProps={{ root: { className: 'my-snackbar' } }} />
```

:::warning
Note that `componentsProps` slot names are written in lowercase (`root`) while `components` slot names are capitalized (`Root`).
:::

## Hook

```js
import { useSnackbar } from '@mui/base/SnackbarUnstyled';
```

The `useSnackbar` hook lets you apply the functionality of `SnackbarUnstyled` to a fully custom component.

It returns props to be placed on the custom component, along with fields representing the component's internal state.

Hooks _do not_ support [slot props](#slot-props), but they do support [customization props](#customization).

If you use a [`ClickAwayListener`](/base/react-click-away-listener/) to let the user close the snackbar by clicking outside of it, make sure to pass the `onClickAway` handler returned by this hook to the `ClickAwayListener`.

Pass the `open` state to the hook and use it to show and hide the snackbar.

The demo below shows how to build a fully custom component with the `useSnackbar` hook that also incorporates the `ClickAwayListener` component:

{{"demo": "UseSnackbar.js", "defaultCodeOpen": false}}

:::info
Hooks give you the most room for customization, but require more work to implement.
With hooks, you can take full control over how your component is rendered, and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [structure](#anatomy).
:::

## Customization

:::info
The following features can be used with both components and hooks.
For the sake of simplicity, demos and code snippets primarily feature components.
:::

### Transitions

You can animate the open and close states of the snackbar with a render prop child and a transition component, as long as the component meets these conditions:

- Is a direct child descendant of the snackbar
- Has an `in` prop—this corresponds to the open state
- Passes the `exited` prop to `SnackbarUnstyled`
- Calls the `onEnter` callback prop when the enter transition starts—sets `exited` to false
- Calls the `onExited` callback prop when the exit transition is completed—sets `exited` to true

These two callbacks allow the snackbar to unmount the child content when closed and keep it fully transitioned.
This is only applicable if you are using transition components using [react-transition-group](https://github.com/reactjs/react-transition-group) library internally.

The demo below shows how to create a snackbar with custom transitions:

{{"demo": "TransitionComponentSnackbar.js", "defaultCodeOpen": false}}
