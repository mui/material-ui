## Stepper
A [stepper](https://www.google.com/design/spec/components/steppers.html)
is an interface for users to show numbered steps or for navigation. It just provides
views, not handling logic (when the step is active, or when the step is completed, or how to move
to the next step). We delegate that to the parent component. We just pass `activeStepIndex`
to show which step is active.
### Examples
