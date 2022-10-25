---
product: joy-ui
title: React Alert component
githubLabel: 'component: alert'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/alert/
---

# Alert

<p class="description">Alerts display brief messages for the user without interrupting their use of the app.</p>

## Introduction

The Alert component can be used to provide important and potentially time-sensitive information in a way that does not interfere with the user's tasks. (Source: [ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/alert/).)

:::warning
Alerts should not be confused with alert _dialogs_ ([ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/)), which _are_ intended to interrupt the user to obtain a response.
Use the Joy UI [Modal](https://mui.com/joy-ui/react-modal/) if you need the behavior of a dialog.
:::

{{"demo": "AlertUsage.js", "hideToolbar": true}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

### Usage

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Alert from '@mui/joy/Alert';

export default function MyApp() {
  return <Alert />;
}
```

### Basics

The Alert component wraps around its content, and stretches to fill its enclosing container, as shown below:

{{"demo": "AlertBasic.js"}}

### Anatomy

The Alert component is composed of a single root `<div>` element with its `role` set to `alert`:

```html
<div role="alert" class="JoyAlert-root">
  This is how an Alert renders in the DOM.
</div>
```

### Overriding the root slot

Use the `component` prop to override the root slot with a custom element.
For example, the following code snippet replaces the default `<div>` with a `<span>`:

```jsx
<Alert component="span" />

// renders as:
<span role="alert" class="JoyAlert-root">
  This Alert's root div was replaced with a span.
</span>
```

## Customization

### Variants

The Alert component supports Joy UI's four [global variants](/joy-ui/main-features/global-variants/): `solid` (default), `soft`, `outlined`, and `plain`.

{{"demo": "AlertVariants.js"}}

### Colors

Every palette included in the theme is available via the `color` prop.
The demo below shows how the values for the `color` prop are affected by the global variants:

{{"demo": "AlertColors.js"}}

### Sizes

The Alert component comes with three sizes out of the box: `sm`, `md` (the default), and `lg`:

{{"demo": "AlertSizes.js"}}

### Decorators

Use the `startDecorator` and `endDecorator` props to append actions and icons to either side of the Alert:

{{"demo": "AlertWithDecorators.js"}}

## Common examples

### Various states

{{"demo": "AlertVariousStates.js"}}

### Danger alerts

{{"demo": "AlertWithDangerState.js"}}

## Accessibility

Here are some factors to consider to ensure that your Alert is accessible:

- Because alerts are not intended to interfere with the use of the app, your Alert component should _never_ affect the keyboard focus.
- If an alert contains an action, that action must have a `tabindex` of `0` so it can be reached by keyboard-only users.
- Alerts should not disappear automatically—[timed interactions](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-no-exceptions.html) can make your app inaccessible to users who need extra time to understand or locate the alert.
- Alerts that occur too frequently can [inhibit the usability](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-postponed.html) of your app.
- Dynamically rendered alerts are announced by screen readers; alerts that are already present on the page when it loads are _not_ announced.
- Color does not add meaning to the UI for users who require assistive technology. You must ensure that any information conveyed through color is also denoted in other ways, such as within the text of the alert itself, or with additional hidden text that's read by screen readers.
