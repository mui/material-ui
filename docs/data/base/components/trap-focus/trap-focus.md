---
product: base
title: React Trap Focus component
components: TrapFocus
githubLabel: 'component: TrapFocus'
---

# Trap focus

<p class="description">The <code>TrapFocus</code> component prevents the user's focus from escaping its children components.</p>

`TrapFocus` is a utility component that is useful when implementing an overlay such as a [modal dialog](/base/react-modal/), which should block all interactions outside of it while open.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## TrapFocus

```js
import TrapFocus from '@mui/base/TrapFocus';
```

## Basic trap focus

The following demo shows a `Button` that opens a `Box` component nested inside of a `TrapFocus`. As long as the `Box` is open, the user's keyboard cannot interact with the rest of the app:

{{"demo": "BasicTrapFocus.js"}}

## Disable enforced focus

By default, clicks outside of the `TrapFocus` component are blocked.

You can disable this behavior with the `disableEnforceFocus` prop:

{{"demo": "DisableEnforceFocus.js"}}

## Lazy activation

By default, the `TrapFocus` component automatically moves the focus to the first of its children when the `open` prop is present.

You can disable this behavior and make it lazy with the `disableAutoFocus` prop.
When auto focus is disabled—as in the demo below—the component only traps the focus once the user moves it there:

{{"demo": "LazyTrapFocus.js"}}

## Escape the focus loop

The following demo uses the [`Portal`](/base/react-portal/) component to render a subset of the `TrapFocus` children into a new "subtree" outside of the current DOM hierarchy.
This way, they are no longer part of the focus loop.

{{"demo": "PortalTrapFocus.js"}}

## Component size

- 📦 [2.0 kB gzipped](https://bundlephobia.com/package/@mui/base@latest)
