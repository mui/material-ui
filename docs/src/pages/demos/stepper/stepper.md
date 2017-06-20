---
components: MobileStepper
---

# Stepper

[Steppers](https://material.io/guidelines/components/steppers.html) convey progress through numbered steps.

> Steppers display progress through a sequence of logical and numbered steps. They may also be used for navigation.
>
> Steppers may display a transient feedback message after a step is saved.


**Types of Steps**

- Editable
- Non-editable
- Mobile
- Optional

**Types of Steppers**

- Horizontal
- Vertical
- Linear
- Non-linear


## Horizontal Linear Stepper

The `<Stepper>` can be controlled by passing the current step index (zero based) as the `activeStep` prop. `<Stepper>` orientation is set using the `orientation` prop.

{{demo='pages/component-demos/stepper/HorizontalLinearStepper.js'}}


## Horizontal Non Linear Stepper

Non-linear steppers allow users to enter a multi-step flow at any point.

This example is similar to the regular horizontal stepper, except steps are no longer automatically set to `disabled={true}` based on the `activeStep` prop. 

We've used the `<StepButton>` here to demonstrate clickable step labels as well as setting the `completed` 
flag however because steps can be accessed in a non-linear fashion it's up to your own implementation to 
determine when all steps are completed (or even if they need to be completed).

{{demo='pages/component-demos/stepper/HorizontalNonLinearStepper.js'}}


## Vertical Stepper

{{demo='pages/component-demos/stepper/VerticalLinearStepper.js'}}

## Mobile Stepper

This component implements a compact stepper suitable for a mobile device. See [mobile steps](https://material.io/guidelines/components/steppers.html#steppers-types-of-steps) for it's inspiration.

### Mobile Stepper - Text

This is essentially a back/next button positioned correctly.
You must implement the textual description yourself however an example is provided below for reference.

{{demo='pages/demos/stepper/TextMobileStepper.js'}}

### Mobile Stepper - Dots

Use dots when the number of steps isn’t large.

{{demo='pages/demos/stepper/DotsMobileStepper.js'}}

### Mobile Stepper - Progress

Use a progress bar when there are many steps, or if there are steps that need to be inserted during the process (based on responses to earlier steps).

{{demo='pages/demos/stepper/ProgressMobileStepper.js'}}

