# Stepper
A [stepper](https://www.google.com/design/spec/components/steppers.html)
is an interface for users to show numbered steps or for navigation. It just provides
views, not handling logic (when the step is active, or when the step is completed, or how to move
to the next step).

## Basic Usage

The `<Stepper>` can be controlled by passing the current step index (zero based) as the `activeStep` prop. `<Stepper>` orientation is set using the `orientation` prop. Below are basic implementations of both the horizontal and vertical stepper.

**Note:** In the linear examples we're using `<StepLabel>` to display the icon and heading. But in other types of Steppers (or other situations), you may want to use the `<StepButton>` component to make your step clickable.

