# Transições

<p class="description">A chave do tema permite que você customize as durações e atenuações das várias transições usadas entre componentes do Material-UI, e oferece um utilitário para criar transições customizadas.</p>

## API

### `theme.transitions.create(props, options) => transition`

#### Argumentos

1. `props` (_String_ | _String[]_): Padrão `['all']`. Fornece uma propriedade CSS, ou uma lista de propriedades CSS que devem ser transicionadas.
2. `options` (_Object_ [opcional]):

- `options.duration` (_String_ | _Number_ [opcional]): Padrão `theme.transitions.duration.standard`. Fornece a duração da transição.
- `options.easing` (_String_ [opcional]): Padrão `theme.transitions.easing.easeInOut`. Fornece a atenuação para a transição.
- `options.delay` (_String_ | _Number_ [opcional]): Padrão `0`. Fornece o atraso para a transição.

#### Retornos

`transition`: A CSS transition value, which composes all CSS properties that should be transitioned, together with the defined duration, easing and delay.

Use the <code>theme.transitions.create()</code> helper to create consistent transitions for the elements of your UI.</p>

```js
theme.transitions.create(['background-color', 'transform']);
```

#### Exemplo

{{"demo": "pages/customization/transitions/TransitionHover.js", "defaultCodeOpen": false}}

### `theme.transitions.getAutoHeightDuration(height) => duration`

#### Argumentos

1. `height` (_Number_): The height of the component.

#### Retornos

`duration`: The calculated duration based on the height.

## Durations

You can change some or all of the duration values, or provide your own (for use in the `create()` helper). This example shows all the default values (in milliseconds), but you only need to provide the keys you wish to change or add.

```js
const theme = createMuiTheme({
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
const theme = createMuiTheme({
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

Check out the [Transitions](/components/transitions/) page to explore the transition components that are included with Material-UI.
