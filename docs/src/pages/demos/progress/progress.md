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

## Non-standard ranges

The progress components accept a value in the range 0 - 100. This simplifies things for screen-reader users, where these are the default min / max values. Sometimes, however, you might be working with a data source where the values fall outside this range. Here's how you can easily transform a value in any range to a scale of 0 - 100:

```jsx
const MIN = x; // Minimum expected value
const MAX = y; // Maximium expected value

// Function to normalise the values (MIN / MAX could be integrated)
const normalise = value => (value - MIN) * (MAX - MIN);

// Example component that utilizes the `normalise` function at the point of render.
function Progress(props) {
  return (
    <React.Fragment>
      <CircularProgress variant="determinate" value={normalise(props.value)} />
      <LinearProgress variant="determinate" value={normalise(props.value)} />
    </React.Fragment>
  )
}
```

## Delaying appearance

There are [3 important limits](http://www.nngroup.com/articles/response-times-3-important-limits/) to know around response time.
The ripple effect of the `ButtonBase` component ensures that the user feels that the system is reacting instantaneously.
Normally, no special feedback is necessary during delays of more than 0.1 but less than 1.0 second.
After 1.0 second, you can display a loader to keep user's flow of thought uninterrupted.

{{"demo": "pages/demos/progress/DelayingAppearance.js"}}
