---
product: joy-ui
title: React Snackbar component
githubLabel: 'component: snackbar'
---

# Snackbar

<p class="description">The Snackbar, also commonly referred to as Toast, component informs users that an action has been or will be performed by the app.</p>

:::info
💡 The Joy UI Snackbar component is still in development.
If you're in need of it, please upvote [**this issue**](https://github.com/mui/material-ui/issues/36603) to help us prioritize the next batch of new components.
:::

## Integration with headless UI libraries

In the meantime, you can still adopt Joy UI today for building a snackbar!

This document shows how to construct it with existing Joy UI components combined with popular headless UI libraries.

### Using the `Alert` component

Joy UI's [`Alert`](/joy-ui/react-alert/) component is perfect for building a snackbar (or toast) because of the default role—`alert` and support for decorators.

### With Radix UI

Using Joy UI's Alert component as a starting point, pass Radix UI's Toast to component prop.
Radix will enhance the functionalities by preserving the styles of Joy UI components.

Animation is created by targeting `data-*` attributes injected by Radix UI's `Toast.Root` component.
In this demo, it uses `@mui/system` keyframes API, same as emotion's keyframes, to build the animation stylesheet.

- [Install Radix UI's Toast](https://www.radix-ui.com/docs/primitives/components/toast#installation)
- [Toast component documentation](https://www.radix-ui.com/docs/primitives/components/toast)

<iframe src="https://codesandbox.io/embed/snackbar-joy-ui-feat-radix-v8e7qw?module=%2Fdemo.tsx&fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:360px; border:0; border-radius: 8px; overflow:hidden;"
     title="Snackbar - Joy UI feat. Radix UI"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### With React Aria

React Aria provides the `useToast` hook that can be used with Joy UI's `Alert` component.

- [Install React Aria's Toast](https://react-spectrum.adobe.com/react-aria/useToast.html)
- [Toast component documentation](https://react-spectrum.adobe.com/react-aria/useToast.html#features)

<iframe src="https://codesandbox.io/embed/snackbar-joy-ui-feat-react-aria-gme1rg?module=%2Fdemo.tsx&fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:360px; border:0; border-radius: 8px; overflow:hidden;"
     title="Snackbar - Joy UI feat. React Aria"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### With Sonner

[Sonner](https://sonner.emilkowal.ski/), an opinionated toast component for React, comes with features like stackable toasts and swipe-to-dismiss animation.

To use Sonner with Joy UI, override Sonner's CSS variables with Joy UI color tokens by targeting `[data-sonner-toaster][data-theme]` selector.

You can also pass Joy UI's Alert component to [`toast.custom()`](https://github.com/emilkowalski/sonner#headless) to fully control the structure of the notification.

Lastly, it is also possible to enhance Sonner's `toast` function with a new method
that closely resemble Joy UI's semantics (i.e.: adding a `warning` toast).

- [Sonner documentation](https://github.com/emilkowalski/sonner#introduction)

<iframe src="https://codesandbox.io/embed/snackbar-joy-ui-feat-sonner-cs244m?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Snackbar - Joy UI feat. Sonner"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
