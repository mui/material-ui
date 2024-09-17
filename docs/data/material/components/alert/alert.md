---
productId: material-ui
title: React Alert component
components: Alert, AlertTitle
githubLabel: 'component: alert'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/alert/
githubSource: packages/mui-material/src/Alert
---

# Alert

<p class="description">Alerts display brief messages for the user without interrupting their use of the app.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Introduction

Alerts give users brief and potentially time-sensitive information in an unobtrusive manner.

The Material UI Alert component includes several props for quickly customizing its styles to provide immediate visual cues about its contents.

{{"demo": "SimpleAlert.js"}}

:::info
This component is no longer documented in the [Material Design guidelines](https://m2.material.io/), but Material UI will continue to support it.
:::

### Usage

A key trait of the alert pattern is that [it should not interrupt the user's experience](https://www.w3.org/WAI/ARIA/apg/patterns/alert/) of the app.
Alerts should not be confused with alert _dialogs_ ([ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/)), which _are_ intended to interrupt the user to obtain a response.
Use the Material UI [Dialog](/material-ui/react-dialog/) component if you need this behavior.

## Basics

```jsx
import Alert from '@mui/material/Alert';
```

The Alert component wraps around its content, and stretches to fill its enclosing container.

### Severity

The `severity` prop accepts four values representing different states—`success` (the default), `info`, `warning`, and `error`–with corresponding icon and color combinations for each:

{{"demo": "BasicAlerts.js"}}

### Variants

The Alert component comes with two alternative style options—`filled` and `outlined`—which you can set using the `variant` prop.

#### Filled

{{"demo": "FilledAlerts.js"}}

#### Outlined

{{"demo": "OutlinedAlerts.js"}}

:::warning
When using an outlined Alert with the [Snackbar](/material-ui/react-snackbar/) component, background content will be visible and bleed through the Alert by default.
You can prevent this by adding `bgcolor: 'background.paper'` to [the `sx` prop](/material-ui/customization/how-to-customize/#the-sx-prop) on the Alert component:

```jsx
<Alert sx={{ bgcolor: 'background.paper' }} />
```

Check out the [Snackbar—customization](/material-ui/react-snackbar/#customization) doc for an example of how to use these two components together.
:::

### Color

Use the `color` prop to override the default color for the specified [`severity`](#severity)—for instance, to apply `warning` colors to a `success` Alert:

{{"demo": "ColorAlerts.js"}}

### Actions

Add an action to your Alert with the `action` prop.
This lets you insert any element—an HTML tag, an SVG icon, or a React component such as a Material UI Button—after the Alert's message, justified to the right.

If you provide an `onClose` callback to the Alert without setting the `action` prop, the component will display a close icon (&#x2715;) by default.

{{"demo": "ActionAlerts.js"}}

### Icons

Use the `icon` prop to override an Alert's icon.
As with the [`action`](#actions) prop, your `icon` can be an HTML element, an SVG icon, or a React component.
Set this prop to `false` to remove the icon altogether.

If you need to override all instances of an icon for a given [`severity`](#severity), you can use the `iconMapping` prop instead.
You can define this prop globally by customizing your app's theme. See [Theme components—Default props](/material-ui/customization/theme-components/#theme-default-props) for details.

{{"demo": "IconAlerts.js"}}

## Customization

### Titles

To add a title to an Alert, import the Alert Title component:

```jsx
import AlertTitle from '@mui/material/AlertTitle';
```

You can nest this component above the message in your Alert for a neatly styled and properly aligned title, as shown below:

{{"demo": "DescriptionAlerts.js"}}

### Transitions

You can use [Transition components](/material-ui/transitions/) like [Collapse](/material-ui/transitions/#collapse) to add motion to an Alert's entrance and exit.

{{"demo": "TransitionAlerts.js"}}

## Accessibility

Here are some factors to consider to ensure that your Alert is accessible:

- Because alerts are not intended to interfere with the use of the app, your Alert component should _never_ affect the keyboard focus.
- If an alert contains an action, that action must have a `tabindex` of `0` so it can be reached by keyboard-only users.
- Essential alerts should not disappear automatically—[timed interactions](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-no-exceptions.html) can make your app inaccessible to users who need extra time to understand or locate the alert.
- Alerts that occur too frequently can [inhibit the usability](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-postponed.html) of your app.
- Dynamically rendered alerts are announced by screen readers; alerts that are already present on the page when it loads are _not_ announced.
- Color does not add meaning to the UI for users who require assistive technology. You must ensure that any information conveyed through color is also denoted in other ways, such as within the text of the alert itself, or with additional hidden text that's read by screen readers.

## Anatomy

The Alert component is composed of a root [Paper](/material-ui/react-paper/) component (which renders as a `<div>`) that houses an icon, a message, and an optional [action](#actions):

```html
<div class="MuiPaper-root MuiAlert-root" role="alert">
  <div class="MuiAlert-icon">
    <!-- svg icon here -->
  </div>
  <div class="MuiAlert-message">This is how an Alert renders in the DOM.</div>
  <div class="MuiAlert-action">
    <!-- optional action element here -->
  </div>
</div>
```
