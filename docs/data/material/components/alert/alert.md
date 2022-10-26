---
product: material-ui
title: React Alert component
components: Alert, AlertTitle
githubLabel: 'component: alert'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/alert/
---

# Alert

<p class="description">Alerts display brief messages for the user without interrupting their use of the app.</p>

## Introduction

The Alert component can be used to provide important and potentially time-sensitive information in a way that does not interfere with the user's tasks. (Source: [ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/alert/).)

This component is not documented in the [Material Design guidelines](https://material.io/).

:::warning
Alerts should not be confused with alert _dialogs_ ([ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/)), which _are_ intended to interrupt the user to obtain a response.
Use the Material UI [Dialog](https://mui.com/material-ui/react-dialog/) if you need this behavior.
:::

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Component

### Usage

After [installation](/material/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Alert from '@mui/material/Alert';

export default function MyApp() {
  return <Alert />;
}
```

### Basics

The Alert component wraps around its content, and stretches to fill its enclosing container.
The `severity` prop accepts four values representing different states—`success` (the default), `info`, `warning`, and `error`–with corresponding icon and color combinations for each:

{{"demo": "BasicAlerts.js"}}

### Anatomy

The Alert component is composed of a root [Paper](/material-ui/react-paper/) component (which renders as a `<div>`) that houses an icon, a message, and an optional action:

```html
<div
  class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiAlert-root MuiAlert-standardSuccess MuiAlert-standard"
  role="alert"
>
  <div class="MuiAlert-icon">
    <!-- svg icon here -->
  </div>
  <div class="MuiAlert-message">
    This is how an Alert renders in the DOM.
  </div>
  <div class="MuiAlert-action">
    <!-- optional action element here -->
  </div>
</div>
```

### Overriding the root slot

Use the `component` prop to override the root slot with a custom element.
For example, the following code snippet replaces the default `<div>` with a `<span>`:

```jsx
<Alert component="span">Alert content</Alert>

// renders as:
<span role="alert" class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiAlert-root MuiAlert-standardSuccess MuiAlert-standard">
  Alert content
</span>
```

## Customization

## Description

You can use the `AlertTitle` component to display a formatted title above the content.

{{"demo": "DescriptionAlerts.js"}}

## Actions

An alert can have an action, such as a close or undo button.
It is rendered after the message, at the end of the alert.

If an `onClose` callback is provided and no `action` prop is set, a close icon is displayed. The `action` prop can be used to provide an alternative action, for example using a Button or IconButton.

{{"demo": "ActionAlerts.js"}}

### Transition

You can use a [transition component](/material-ui/transitions/) such as `Collapse` to transition the appearance of the alert.

{{"demo": "TransitionAlerts.js"}}

## Icons

The `icon` prop allows you to add an icon to the beginning of the alert component.
This will override the default icon for the specified severity.

You can change the default severity to icon mapping with the `iconMapping` prop. This can be defined globally using [theme customization](/material-ui/customization/theme-components/#default-props).

Setting the icon prop to `false` will remove the icon altogether.

{{"demo": "IconAlerts.js"}}

## Variants

Two additional variants are available – outlined, and filled:

### Outlined

{{"demo": "OutlinedAlerts.js"}}

When using an outlined alert with the [`Snackbar` component](/material-ui/react-snackbar/#customization), background content will be visible and bleed through the alert by default.
You can prevent this by adding `bgcolor: 'background.paper'` to the[`sx` prop](/material-ui/customization/how-to-customize/#the-sx-prop) on the `Alert` component.

### Filled

{{"demo": "FilledAlerts.js"}}

## Toast

You can use the Snackbar to [display a toast](/material-ui/react-snackbar/#customization) with the Alert.

## Color

The `color` prop will override the default color for the specified severity.

{{"demo": "ColorAlerts.js"}}

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/alert/)

When the component is dynamically displayed, the content is automatically announced by most screen readers. At this time, screen readers do not inform users of alerts that are present when the page loads.

Using color to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies such as screen readers. Ensure that information denoted by the color is either obvious from the content itself (for example the visible text), or is included through alternative means, such as additional hidden text.

Actions must have a tab index of 0 so that they can be reached by keyboard-only users.
