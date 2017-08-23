---
components: MobileStepper
---

# Stepper

[Steppers](https://material.io/guidelines/components/steppers.html) convey progress through numbered steps.

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

