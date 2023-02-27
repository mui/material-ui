---
product: joy-ui
title: React Accordion component
githubLabel: 'component: accordion'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
---

# Accordion

<p class="description">Accordions let users show and hide sections of related content on a page.</p>

:::success
The Joy Accordion component is still in development, but this should not prevent you from adopting Joy UI today.

This document shows how construct an accordion with existing Joy UI components combined with popular headless UI libraries.
:::

If you're in need of a Joy UI Accordion, please upvote [this issue](https://github.com/mui/material-ui/issues/36281) to help us prioritize the next batch of new components.

## Integration

Joy UI's [List](/joy-ui/react-list/) components are perfect for building accordions because they stack vertically with an equal width.

- `<List />` - Wraps the accordion and sets `component="div"` to remove it from the accessibility tree.
- `<ListItemButton />` - The accordion header that toggles the visibility of the content.
- `<ListItem />` - The content container.

### With Radix UI

Use Joy UI List components as a starting point and pass Radix—Accordion to `component` prop. The component's styles remain the same with the enhancement of Radix Accordion's functionalities.

Animation is created by targeting a CSS variable, `--radix-accordion-content-height`, provided by Radix Accordion. In this demo, it uses `@mui/system` keyframes API, same as [emotion's keyframes](https://emotion.sh/docs/keyframes), to build the animation stylesheet.

- [installation](https://www.radix-ui.com/docs/primitives/components/accordion#installation)
- [documentation](https://www.radix-ui.com/docs/primitives/components/accordion)

<iframe src="https://codesandbox.io/embed/joy-ui-feat-radix-accordion-4n2p04?module=%2Fdemo.tsx&fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:360px; border:0; border-radius: 4px; overflow:hidden;"
     title="Joy UI feat. Radix UI Accordion"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### With Headless UI

Use Joy UI List components as a starting point and pass Headless UI—Accordion to `component` prop. Headless UI does not provide an API to create animation so you have to use other libraries or build it yourself.

- [installation](https://headlessui.com/react/disclosure#installation)
- [documentation](https://headlessui.com/react/disclosure)

<iframe src="https://codesandbox.io/embed/joy-ui-feat-headless-ui-disclosure-g2mqpr?module=%2Fdemo.tsx&fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:360px; border:0; border-radius: 4px; overflow:hidden;"
     title="Joy UI feat. Headless UI Disclosure"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
