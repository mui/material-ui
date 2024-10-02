# Transitions

<p class="description">These theme helpers allow you to create custom CSS transitions, you can customize the durations, easings and more.</p>

## API

### `theme.transitions.create(props, options) => transition`

#### Arguments

1. `props` (_string_ | _string[]_): Defaults to `['all']`. Provides a CSS property, or a list of CSS properties that should be transitioned.
2. `options` (_object_ [optional]):

- `options.duration` (_string_ | _number_ [optional]): Defaults to `theme.transitions.duration.standard`. Provides the duration of the transition.
- `options.easing` (_string_ [optional]): Defaults to `theme.transitions.easing.easeInOut`. Provides the easing for the transition.
- `options.delay` (_string_ | _number_ [optional]): Defaults to `0`. Provides the delay for the transition.

#### Returns

`transition`: A CSS transition value, which composes all CSS properties that should be transitioned, together with the defined duration, easing and delay.

Use the <code>theme.transitions.create()</code> helper to create consistent transitions for the elements of your UI.</p>

```js
theme.transitions.create(['background-color', 'transform']);
```

#### Example

{{"demo": "TransitionHover.js", "defaultCodeOpen": false}}

### `theme.transitions.getAutoHeightDuration(height) => duration`

#### Arguments

1. `height` (_number_): The height of the component.

#### Returns

`duration`: The calculated duration based on the height.

## Durations

You can change some or all of the duration values, or provide your own (for use in the `create()` helper). This example shows all the default values (in milliseconds), but you only need to provide the keys you wish to change or add.

```js
const theme = createTheme({
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
  },
});
```

## Easings

You can change some or all of the easing values, or provide your own, by providing a custom CSS <code>transition-timing-function</code> value.

```js
const theme = createTheme({
  transitions: {
    easing: {
      // This is the most common easing curve.
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
});
```

## References

Check out the [Transitions](/material-ui/transitions/) page to explore the transition components that are included with Material UI.
