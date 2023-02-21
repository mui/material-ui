---
product: joy-ui
title: React Accordion component
githubLabel: 'component: accordion'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
---

# Accordion

<p class="description">The accordion component allows the user to show and hide sections of related content on a page.</p>

:::success
Joy Accordion component is still **in development** but it should not block you from using Joy UI!

The examples below demonstrate the featuring between Joy UI and popular headless libraries.
:::

If you need Joy UI Accordion, please upvote [this issue](https://github.com/mui/material-ui/issues/36281). It will help us prioritize the next component that we should work on.

## Integration

Joy [`List`](/joy-ui/react-list/) components are perfect for building accordions because they are vertically stacked with the same size.

- **List**: Wraps the accordions and set `component="div"` to remove it from the accessibility tree.
- **ListItemButton**: The accordion header that can toggle the visibility of the content.
- **ListItem**: The content container.

### Radix UI

- [installation](https://www.radix-ui.com/docs/primitives/components/accordion#installation)
- [documentation](https://www.radix-ui.com/docs/primitives/components/accordion)

<iframe src="https://codesandbox.io/embed/joy-ui-feat-radix-accordion-4n2p04?module=%2Fdemo.tsx&fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:360px; border:0; border-radius: 4px; overflow:hidden;"
     title="Joy UI feat. Radix UI Accordion"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Headless UI

- [installation](https://headlessui.com/react/disclosure#installation)
- [documentation](https://headlessui.com/react/disclosure)

<iframe src="https://codesandbox.io/embed/joy-ui-feat-headless-ui-disclosure-g2mqpr?module=%2Fdemo.tsx&fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:360px; border:0; border-radius: 4px; overflow:hidden;"
     title="Joy UI feat. Headless UI Disclosure"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
