---
components: CircularProgress, LinearProgress
---

# Progress

[Progress and activity indicators](https://material.io/guidelines/components/progress-activity.html)
are visual indications of an app loading content.

A single visual indicator should be used to represent each type of operation.
For example, a refresh operation should display either a refresh bar or an activity circle, but not both.

**Determinate** indicators display how long an operation will take.

**Indeterminate** indicators visualize an unspecified wait time.

## Circular

### Circular Indeterminate

{{"demo": "pages/demos/progress/CircularIndeterminate.js"}}

### Interactive Integration

{{"demo": "pages/demos/progress/CircularIntegration.js"}}

### Circular Determinate

{{"demo": "pages/demos/progress/CircularDeterminate.js"}}

### Circular Static

{{"demo": "pages/demos/progress/CircularStatic.js"}}

## Linear

### Linear Indeterminate

{{"demo": "pages/demos/progress/LinearIndeterminate.js"}}

### Linear Determinate

{{"demo": "pages/demos/progress/LinearDeterminate.js"}}

### Linear Buffer

{{"demo": "pages/demos/progress/LinearBuffer.js"}}

### Linear Query

{{"demo": "pages/demos/progress/LinearQuery.js"}}

## Delaying appearance

There are [3 important limits](http://www.nngroup.com/articles/response-times-3-important-limits/) to know around reponse time.
The ripple effect of the `ButtonBase` component ensures that the user feels that the system is reacting instantaneously.
Normally, no special feedback is necessary during delays of more than 0.1 but less than 1.0 second.
After 1.0 second, you can display a loader to keep user's flow of thought uninterrupted.

{{"demo": "pages/demos/progress/DelayingAppearance.js"}}
