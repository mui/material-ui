# Transitions

<p class="description">Use the <code>theme.transitions.create()</code> helper to create consistent transitions on the elements of your UI.</p>

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
