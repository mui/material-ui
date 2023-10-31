---
productId: material-ui
title: React Stepper component
components: Stepper, Step, StepIndicator
githubLabel: 'component: stepper'
materialDesign: https://m1.material.io/components/steppers.html
---

# Stepper

<p class="description">Steppers convey progress through numbered steps. It provides a wizard-like workflow.</p>

## Introduction

Steppers display progress through a sequence of logical and numbered steps. They may also be used for navigation.

Steppers support horizontal and vertical orientation for desktop and mobile viewports.

Joy UI Steppers are implemented using a collection of related components:

- [Stepper](#basics) - a wrapper for steps. Renders as a `<ol>` by default.
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

{{"demo": "IndicatorStepper.js"}}

### Sizes

{{"demo": "SizesStepper.js"}}

### Vertical

{{"demo": "VerticalStepper.js"}}

### Connector

{{"demo": "ConnectorStepper.js"}}

## Common examples
