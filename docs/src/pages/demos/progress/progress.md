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

## Linear

### Linear Indeterminate

{{"demo": "pages/demos/progress/LinearIndeterminate.js"}}

### Linear Determinate

{{"demo": "pages/demos/progress/LinearDeterminate.js"}}

### Buffer

{{"demo": "pages/demos/progress/LinearBuffer.js"}}

### Query

{{"demo": "pages/demos/progress/LinearQuery.js"}}

## Delaying appearance

There is a [school of thought](http://www.nngroup.com/articles/response-times-3-important-limits/) that feedback after user operations isn't necessary for about a second.
To implement this, you can take advantage of [theme overrides](/customization/themes/#customizing-all-instances-of-a-component-type)
to delay the appearance of the progress indicators.

{{"demo": "pages/demos/progress/DelayingAppearance.js"}}
