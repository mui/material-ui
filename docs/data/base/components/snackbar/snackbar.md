---
product: base
title: Unstyled React Snackbar component
components: SnackbarUnstyled
githubLabel: 'component: snackbar'
packageName: '@mui/base'
---

# Unstyled snackbar

<p class="description">The SnackbarUnstyled component provides brief notifications.</p>

## Introduction

The SnackbarUnstyled component provides brief notifications.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

### Usage

After [installation](/base/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import SnackbarUnstyled from '@mui/base/SnackbarUnstyled';

export default function MyApp() {
  return <SnackbarUnstyled></SnackbarUnstyled>;
}
```

### Basics

{{"demo": "UnstyledSnackbar.js", "defaultCodeOpen": false}}

```jsx
<SnackbarUnstyled></SnackbarUnstyled>
```

### Anatomy

The `SnackbarUnstyled` component is composed of

```html

```

### Slot props

:::info
The following props are available on all non-utility Base components.
See [Usage](/base/getting-started/usage/) for full details.
:::

Use the `component` prop to override the root slot with a custom element:

```jsx
<SnackbarUnstyled component="div" />
```

Use the `components` prop to override any interior slots in addition to the root:

```jsx
<SnackbarUnstyled components={{ Root: 'div', OTHER_SLOT: 'something' }}: 'div' }} />
```

:::warning
If the root element is customized with both the `component` and `components` props, then `component` will take precedence.
:::

Use the `componentsProps` prop to pass custom props to internal slots.
The following code snippet applies a CSS class called `my-badge` to the badge slot:

```jsx
<SnackbarUnstyled componentsProps={{ snackbar: { className: 'my-snackbar' } }} />
```

:::warning
Note that `componentsProps` slot names are written in lowercase (`root`) while `components` slot names are capitalized (`Root`).
:::

## Hook

```js
import { useSnackbar } from '@mui/base/SnackbarUnstyled';
```

The `useSnackbar` hook lets you apply the functionality of `SnackbarUnstyled` to a fully custom component.

It returns props to be placed on the root element. If you are using `ClickAwayListener` to close the snackbar by clicking outside of it, make sure to pass `onClickAway` handler returned by this hook to the `ClickAwayListener` component.

Make sure to pass the `open` state to the hook and use it to show/hide the snackbar.

{{"demo": "UseSnackbar.js", "defaultCodeOpen": false}}

Hooks _do not_ support [slot props](#slot-props), but they do support [customization props](#customization).

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

You can animate the open and close states of the snackbar with a render prop child and a transition component as shown below, as long as the component meets these conditions:

- Is a direct child descendent of the snackbar
- Has an `in` prop—this corresponds to the open state
- Passes the `exited` prop to `SnackbarUnstyled`
- Calls the `onEnter` callback prop when the enter transition starts - sets `exited` to false
- Calls the `onExited` callback prop when the exit transition is completed - sets `exited` to true

These two callbacks allow the snackbar to unmount the child content when closed and keep it fully transitioned. This is only applicable if you are using transition components using [react-transition-group](https://github.com/reactjs/react-transition-group) library internally.

{{"demo": "TransitionComponentSnackbar.js", "defaultCodeOpen": false}}
