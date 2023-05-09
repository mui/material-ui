---
product: joy-ui
title: React Toggle Button component
githubLabel: 'component: toggle button'
---

# Toggle Button

<p class="description">A toggle is a two-state button that may be part of a group of mutually exclusive options.</p>

:::info
💡 The Joy UI Toggle Button component is still in development.
If you're in need of it, please upvote [**this issue**](https://github.com/mui/material-ui/issues/36617) to help us prioritize the next batch of new components.
:::

## Integration with headless UI libraries

In the meantime, you can still adopt Joy UI today for building a toggle button!

This document shows how to construct it with existing Joy UI components combined with popular headless UI libraries.

### Using the Icon Button component

Joy UI's [Icon Button](/joy-ui/react-button/#icon-button) component is perfect for building a toggle button because it already produces a square button with an icon inside.

### With Radix UI

Using Joy UI's Icon Buton component as a starting point, pass Radix UI's Toggle Button to the `component` prop.
Radix will enhance the functionalities by preserving the styles of Joy UI components.

- [Install Radix UI's Toggle](https://www.radix-ui.com/docs/primitives/components/toggle)
- [Install Radix UI's Toggle Group](https://www.radix-ui.com/docs/primitives/components/toggle-group)

<iframe src="https://codesandbox.io/embed/toggle-button-joy-ui-feat-radix-f2wbct?module=%2Fdemo.tsx&fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:360px; border:0; border-radius: 8px; overflow:hidden;"
     title="Toggle button - Joy UI feat. Radix"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### With React Aria

React Aria provides a `useToggleButton` hook that can be used with Joy UI's Icon Button component.

- [Install React Aria's toggle button](https://react-spectrum.adobe.com/react-aria/useToggleButton.html)
- [Toggle button component documentation](https://react-spectrum.adobe.com/react-aria/useToggleButton.html#features)

<iframe src="https://codesandbox.io/embed/toggle-button-joy-ui-feat-react-aria-56iex7?module=%2Fdemo.tsx&fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:360px; border:0; border-radius: 8px; overflow:hidden;"
     title="Toggle button - Joy UI feat. React Aria"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
