---
productId: joy-ui
title: React Alert component
components: Alert
githubLabel: 'component: alert'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/alert/
---

# Alert

<p class="description">Alerts display brief messages for the user without interrupting their use of the app.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Introduction

The Alert component can be used to provide important and potentially time-sensitive information in a way that does not interfere with the user's tasks. (Source: [ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/alert/).)

{{"demo": "AlertUsage.js", "hideToolbar": true, "bg": "gradient"}}

:::info
Alerts should not be confused with alert _dialogs_ ([ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/)), which _are_ intended to interrupt the user to obtain a response.
Use the Joy UI [Modal](https://mui.com/joy-ui/react-modal/) if you need the behavior of a dialog.
:::

## Basics

```jsx
import Alert from '@mui/joy/Alert';
```

The Alert component wraps around its content, and stretches to fill its enclosing container, as shown below:

{{"demo": "AlertBasic.js"}}

## Customization

### Variants

The Alert component supports Joy UI's four [global variants](/joy-ui/main-features/global-variants/): `solid`, `soft` (default), `outlined`, and `plain`.

{{"demo": "AlertVariants.js"}}

:::info
To learn how to add your own variants, check out [Themed components—Extend variants](/joy-ui/customization/themed-components/#extend-variants).
Note that you lose the global variants when you add custom variants.
:::

### Sizes

The Alert component comes in three sizes: `sm`, `md` (default), and `lg`:

{{"demo": "AlertSizes.js"}}

:::info
To learn how to add custom sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

### Colors

Every palette included in the theme is available via the `color` prop.
The demo below shows how the values for the `color` prop are affected by the global variants:

{{"demo": "AlertColors.js"}}

### Decorators

Use the `startDecorator` and `endDecorator` props to append actions and icons to either side of the Alert:

{{"demo": "AlertWithDecorators.js"}}

### Inverted colors

The Alert component supports Joy UI's [color inversion](/joy-ui/main-features/color-inversion/) by using `invertedColors` prop.

{{"demo": "AlertInvertedColors.js"}}

## Common examples

### Various states

{{"demo": "AlertVariousStates.js"}}

### Danger alerts

{{"demo": "AlertWithDangerState.js"}}

## Accessibility

Here are some factors to consider to ensure that your Alert is accessible:

- Because alerts are not intended to interfere with the use of the app, your Alert component should _never_ affect the keyboard focus.
- If an alert contains an action, that action must have a `tabindex` of `0` so it can be reached by keyboard-only users.
- Essential alerts should not disappear automatically—[timed interactions](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-no-exceptions.html) can make your app inaccessible to users who need extra time to understand or locate the alert.
- Alerts that occur too frequently can [inhibit the usability](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-postponed.html) of your app.
- Dynamically rendered alerts are announced by screen readers; alerts that are already present on the page when it loads are _not_ announced.
- Color does not add meaning to the UI for users who require assistive technology. You must ensure that any information conveyed through color is also denoted in other ways, such as within the text of the alert itself, or with additional hidden text that's read by screen readers.

## Anatomy

The Alert component is composed of a single root `<div>` element with its `role` set to `alert`:

```html
<div role="alert" class="MuiAlert-root">
  <!-- Alert contents -->
</div>
```
