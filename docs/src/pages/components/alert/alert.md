---
title: Alert React component
components: Alert
---

# Alert

<p class="description">An alert displays a prominent message and related optional actions.</p>

## Simple alerts

{{"demo": "pages/components/alert/SimpleAlerts.js"}}

## Description

You can use the `AlertTitle` component to display a title and a description.

{{"demo": "pages/components/alert/DescriptionAlerts.js"}}

## Actions

{{"demo": "pages/components/alert/ActionAlerts.js"}}

### Transition

You can use the [transition components](/components/transitions/), like `Collapse` to transition the appearance of the alert.

{{"demo": "pages/components/alert/TransitionAlerts.js"}}

## Icons

The `icon` prop allows you to add an icon to the beginning of the alert component.
This will override the default color icon.
You can change the default color icon mapping with the `iconMapping` prop.
Setting the icon prop to false will remove the icon altogether.

{{"demo": "pages/components/alert/IconAlerts.js"}}

## Variants

### Outlined

{{"demo": "pages/components/alert/OutlinedAlerts.js"}}

### Filled

{{"demo": "pages/components/alert/FilledAlerts.js"}}

## Toast

You can use the Snackbar to [display a toast](/components/snackbars/#customized-snackbars) with the Alert.

## Color

You can use a different severity and color value.

{{"demo": "pages/components/alert/ColorAlerts.js"}}

## Accessibility

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#alert)

The component sets `role="alert"` by default.
When the component is dynamically displayed, the assistive technology should read the content immediately.
