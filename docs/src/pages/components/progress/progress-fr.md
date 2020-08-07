---
title: Circular, Linear progress React components
components: CircularProgress, LinearProgress
---

# Barres de progression

<p class="description">Les indicateurs de progression, plus connus sous le nom de spinners, expriment un temps d'attente non spécifié ou affichent la durée d'un processus. L'animation fonctionne avec du CSS, pas de JavaScript.</p>

Les [Indicateurs de progression](https://material.io/design/components/progress-indicators.html) informent les utilisateurs de l'état des processus en cours, tels que le chargement d'une application, la soumission d'un formulaire ou la progression des mises à jour. Ils communiquent l'état d'une application et indiquent les actions disponibles, par exemple si les utilisateurs peuvent quitter l'écran actuel.

- Les indicateurs **déterminés** indiquent la durée d'une opération.
- Les indicateurs **indéterminés** indiquent un temps d'attente non spécifié.

Lorsque vous affichez les progrès d'une séquence de processus, indiquez le progrès global plutôt que les progrès de chaque activité.

## Circular

### Circular indeterminate

{{"demo": "pages/components/progress/CircularIndeterminate.js"}}

### Circular determinate

{{"demo": "pages/components/progress/CircularStatic.js"}}

### Interactive integration

{{"demo": "pages/components/progress/CircularIntegration.js"}}

### Circular with label

{{"demo": "pages/components/progress/CircularWithValueLabel.js"}}

## Linear

### Linear indeterminate

{{"demo": "pages/components/progress/LinearIndeterminate.js"}}

### Linear determinate

{{"demo": "pages/components/progress/LinearDeterminate.js"}}

### Linear buffer

{{"demo": "pages/components/progress/LinearBuffer.js"}}

### Linear with label

{{"demo": "pages/components/progress/LinearWithValueLabel.js"}}

## Non-standard ranges

The progress components accept a value in the range 0 - 100. This simplifies things for screen-reader users, where these are the default min / max values. Sometimes, however, you might be working with a data source where the values fall outside this range. Here's how you can easily transform a value in any range to a scale of 0 - 100:

```jsx
// MIN = Minimum expected value
// MAX = Maximium expected value
// Function to normalise the values (MIN / MAX could be integrated)
const normalise = value => (value - MIN) * 100 / (MAX - MIN);

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

## Customized progress

Here are some examples of customizing the component. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/components/).

{{"demo": "pages/components/progress/CustomizedProgressBars.js", "defaultCodeOpen": false}}

## Retarder l'apparition

Il y a [3 limites importantes](https://www.nngroup.com/articles/response-times-3-important-limits/) à connaître sur les temps de réponse. The ripple effect of the `ButtonBase` component ensures that the user feels that the system is reacting instantaneously. Normally, no special feedback is necessary during delays of more than 0.1 but less than 1.0 second. After 1.0 second, you can display a loader to keep user's flow of thought uninterrupted.

{{"demo": "pages/components/progress/DelayingAppearance.js"}}

## Limites

Under heavy load, you might lose the stroke dash animation or see random CircularProgress ring widths. You should run processor intensive operations in a web worker or by batch in order not to block the main rendering thread.

![heavy load](/static/images/progress/heavy-load.gif)

When it's not possible, you can leverage the `disableShrink` property to mitigate the issue. See [this issue](https://github.com/mui-org/material-ui/issues/10327).

{{"demo": "pages/components/progress/CircularUnderLoad.js"}}