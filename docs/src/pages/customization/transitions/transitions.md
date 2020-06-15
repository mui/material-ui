# Transitions

<p class="description">Use the <code>theme.transitions.create()</code> helper to create consistent transitions on the elements of your UI.</p>

```jsx
theme.transitions.create(['background-color', 'transform']);
```

{{"demo": "pages/customization/transitions/TransitionHover.js", "defaultCodeOpen": false}}

## Custom duration

You can change some of the durations by providing a number.

```js
const theme = createMuiTheme({
  transitions: {
    duration: {
      standard: 500,
    },    
  },
});
```

## Custom easing

You can change some of the easing values by providing a custom <code>transition-timing-function</code> value.

```js
const theme = createMuiTheme({
  transitions: {
    easing: {
      sharp: 'cubic-bezier(0.4, 0, 0.8, 1)',
    },    
  },
});
```

## API

### `theme.transitions.create(props, options) => transition`

#### Arguments

1. `props` (*String* | *String[]*): Defaults to `['all']`. Provides a CSS property, or a list of CSS properties that should be transitioned.
2.  `options` (*Object* [optional]):
  - `options.duration` (*String* | *Number* [optional]): Defaults to `theme.transitions.duration.standard`. Provides the duration of the transition.
  - `options.easing` (*String* [optional]): Defaults to `theme.transitions.easing.easeInOut`. Provides the easing for the transition.
  - `options.delay` (*String* | *Number* [optional]): Defaults to `0`. Provides the delay for the transition.

#### Returns

`transition`: A transition css value, which composes all properties which should be transitioned, together with the defined duration, easing and duration.
