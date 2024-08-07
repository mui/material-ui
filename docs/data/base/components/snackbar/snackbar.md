---
productId: base-ui
title: React Snackbar component and hook
components: Snackbar
hooks: useSnackbar
githubLabel: 'component: snackbar'
---

# Snackbar

<p class="description">The Snackbar component informs users that an action has been or will be performed by the app.</p>

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

A snackbar provides users with a brief, temporary message about app processes without interrupting their activity or experience.

The Snackbar component is built to appear on-screen to inform users about an action that the app is taking.

{{"demo": "UnstyledSnackbarIntroduction", "defaultCodeOpen": false, "bg": "gradient"}}

## Component

```jsx
import { Snackbar } from '@mui/base/Snackbar';
```

Snackbar doesn't impose any restrictions on its implementation—it's up to you to design it so that it doesn't interrupt the user experience, and disappears after a set amount of time without requiring the user to take action.

Use the `autoHideDuration` prop to set the time (in milliseconds) that the snackbar remains on the screen.

:::info
You may want to implement Snackbar with [Click-Away Listener](/base-ui/react-click-away-listener/), so that the user can choose to dismiss the Snackbar before its time is up by clicking anywhere outside of it.
But this behavior is optional.
:::

The following demo illustrates the basic usage of Snackbar.
Click **Open snackbar** to see how it behaves:

{{"demo": "UnstyledSnackbar", "defaultCodeOpen": false}}

### Anatomy

The Snackbar component is composed of a single root `<div>` slot with no interior slots:

```html
<div role="presentation" className="BaseSnackbar-root">snackbar content</div>
```

### Custom structure

Use the `slots.root` prop to override the root slot with a custom element:

```jsx
<Snackbar slots={{ root: 'span' }} />
```

:::info
The `slots` prop is available on all non-utility Base components.
See [Overriding component structure](/base-ui/guides/overriding-component-structure/) for full details.
:::

### Usage with TypeScript

In TypeScript, you can specify the custom component type used in the `slots.root` as a generic to the unstyled component.
This way, you can safely provide the custom component's props directly on the component:

```tsx
<Snackbar<typeof CustomComponent> slots={{ root: CustomComponent }} customProp />
```

The same applies for props specific to custom primitive elements:

```tsx
<Snackbar<'button'> slots={{ root: 'button' }} onClick={() => {}} />
```

## Hook

```js
import { useSnackbar } from '@mui/base/useSnackbar';
```

The `useSnackbar` hook lets you apply the functionality of a Snackbar to a fully custom component.

It returns props to be placed on the custom component, along with fields representing the component's internal state.

Hooks _do not_ support [slot props](#custom-structure), but they do support [customization props](#customization).

If you use a [Click-Away Listener](/base-ui/react-click-away-listener/) to let the user close the Snackbar by clicking outside of it, make sure to pass the `onClickAway` handler returned by this hook to the Click-Away Listener.

Pass the `open` state to the hook and use it to show and hide the Snackbar.

The demo below shows how to build a fully custom component with the `useSnackbar` hook that also incorporates the Click-Away Listener component:

{{"demo": "UseSnackbar.js", "defaultCodeOpen": false}}

:::info
Hooks give you the most room for customization, but require more work to implement.
With hooks, you can take full control over how your component is rendered, and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [structure](#anatomy).
:::

## Customization

:::info
The following features can be used with both components and hooks.
For the sake of simplicity, demos, and code snippets primarily feature components.
:::

### Transitions

You can animate the open and close states of the Snackbar with a render prop child and a transition component, as long as the component meets these conditions:

- Is a direct child descendant of the snackbar
- Has an `in` prop—this corresponds to the open state
- Passes the `exited` prop to Snackbar
- Calls the `onEnter` callback prop when the enter transition starts—sets `exited` to false
- Calls the `onExited` callback prop when the exit transition is completed—sets `exited` to true

These two callbacks allow the Snackbar to unmount the child content when closed and keep it fully transitioned.
This is only applicable if you are using transition components using [react-transition-group](https://github.com/reactjs/react-transition-group) library internally.

The demo below shows how to create a Snackbar with custom transitions:

{{"demo": "TransitionComponentSnackbar.js", "defaultCodeOpen": false}}
