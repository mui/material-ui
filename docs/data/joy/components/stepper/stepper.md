---
productId: joy-ui
title: React Stepper component
components: Stepper, Step, StepButton, StepIndicator
githubLabel: 'component: stepper'
materialDesign: https://m1.material.io/components/steppers.html
---

# Stepper

<p class="description">Steppers convey progress through numbered steps. It provides a wizard-like workflow.</p>

## Introduction

Stepper displays progress through a sequence of logical and numbered steps. It support horizontal and vertical orientation for desktop and mobile viewports.

Joy UI Steppers are implemented using a collection of related components:

- [Stepper](#basics) - a required container for steps. Renders as a `<ol>` by default.
- [Step](#basics) - a step. Renders as a `<li>` by default.
- [StepIndicator](#indicator) - an optional indicator of a step.

{{"demo": "StepperUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Basics

```jsx
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
```

{{"demo": "BasicStepper.js"}}

## Customization

### Indicator

Pass StepIndicator as an element to Step's `indicator` prop to create number or icon indicators.

The StepIndicator supports Joy UI's four [global variants](/joy-ui/main-features/global-variants/): `soft` (default), `solid`, `outlined`, and `plain`.

{{"demo": "IndicatorStepper.js"}}

:::info
To learn how to add your own variants, check out [Themed components—Extend variants](/joy-ui/customization/themed-components/#extend-variants).
Note that you lose the global variants when you add custom variants.
:::

#### Indicator at the top

Set Step's `orientation="vertical"` to show an indicator at the top.

{{"demo": "IndicatorTopStepper.js"}}

### Button

To make the Step clickable, renders the `StepButton` component as a direct child of the Step.

{{"demo": "ButtonStepper.js"}}

### Sizes

The Stepper component comes in three sizes: `sm`, `md` (default), and `lg`.

{{"demo": "SizesStepper.js"}}

:::info
To learn how to add custom sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

### Vertical

Use `orientation="vertical"` to display the Stepper vertically. If you don't provide an indicator prop to the Step, a dot (pseudo element) will be used as the indicator.

{{"demo": "VerticalStepper.js"}}

#### Extra content

For vertical Steppers, you can pass more content to the Step by grouping it inside an HTML element.

The Step switches its display to CSS `grid` when the Stepper's orientation is vertical.

{{"demo": "VerticalExtraContentStepper.js"}}

### Connector

The connector is a pseudo element of the Step. To customize it, target `::after` element of the Step using `sx` prop.

{{"demo": "ConnectorStepper.js"}}

## CSS Variables

{{"demo": "StepperVariables.js"}}

## Common examples

### Company registration

{{"demo": "CompanyRegistrationStepper.js"}}

### Dotted connector

{{"demo": "DottedConnector.js"}}

### Icon stepper

{{"demo": "IconStepper.js"}}
