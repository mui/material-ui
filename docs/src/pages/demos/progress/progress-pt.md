---
title: Progresso
components: CircularProgress, LinearProgress
---
# Progress (Progresso)

<p class="description">Os indicadores de progresso expressam um tempo de espera não especificado ou exibem a duração de um processo.</p>

[Indicadores de progresso](https://material.io/design/components/progress-indicators.html) informam aos usuários sobre o estado de processos em progresso, como o carregamento de um app ou o envio de um formulário. They communicate an app’s state and indicate available actions, such as whether users can navigate away from the current screen.

**Determinate** indicators display how long an operation will take.

**Indeterminate** indicators visualize an unspecified wait time.

#### Progress as a group

When displaying progress for a sequence of processes, indicate overall progress rather than the progress of each activity.

## Circular

[Circular progress](https://material.io/design/components/progress-indicators.html#circular-progress-indicators) support both determinate and indeterminate processes.

- **Determinate** circular indicators fill the invisible, circular track with color, as the indicator moves from 0 to 360 degrees.
- **Indeterminate** circular indicators grow and shrink in size while moving along the invisible track.

### Circular Indeterminado

{{"demo": "pages/demos/progress/CircularIndeterminate.js"}}

### Integração Interativa

{{"demo": "pages/demos/progress/CircularIntegration.js"}}

### Determinado Circular

{{"demo": "pages/demos/progress/CircularDeterminate.js"}}

### Fatia Circular

{{"demo": "pages/demos/progress/CircularStatic.js"}}

## Linear

[Linear progress](https://material.io/design/components/progress-indicators.html#linear-progress-indicators) indicators.

### Indeterminado Linear

{{"demo": "pages/demos/progress/LinearIndeterminate.js"}}

### Linear Determinado

{{"demo": "pages/demos/progress/LinearDeterminate.js"}}

### Buffer Linear

{{"demo": "pages/demos/progress/LinearBuffer.js"}}

### Consulta Linear

{{"demo": "pages/demos/progress/LinearQuery.js"}}

## Gamas não padronizadas

The progress components accept a value in the range 0 - 100. This simplifies things for screen-reader users, where these are the default min / max values. Sometimes, however, you might be working with a data source where the values fall outside this range. Here's how you can easily transform a value in any range to a scale of 0 - 100:

```jsx
// MIN = Valor mínimo esperado
// MAX = Valor esperado Maximium
// Função para normalizar os valores (MIN / MAX pode ser integrado)
const normalise = value => (value - MIN) * 100 / (MAX - MIN);

// Exemplo de componente que utiliza a função `normalise` no ponto de renderização.
function Progress(props) {
  return (
    <React.Fragment>
      <CircularProgress variant="determinate" value={normalise(props.value)} />
      <LinearProgress variant="determinate" value={normalise(props.value)} />
    </React.Fragment>
  )
}
```

## Customized Progress

If you have been reading the [overrides documentation page](/customization/overrides/) but you are not confident jumping in, here is one example of how you can customize the components. The last demo demonstrates how you can build a Facebook like spinner.

⚠️ Embora a especificação do design do material incentive o tema, esses exemplos estão fora do caminho comum.

{{"demo": "pages/demos/progress/CustomizedProgress.js"}}

## Delaying appearance

There are [3 important limits](https://www.nngroup.com/articles/response-times-3-important-limits/) to know around response time. The ripple effect of the `ButtonBase` component ensures that the user feels that the system is reacting instantaneously. Normally, no special feedback is necessary during delays of more than 0.1 but less than 1.0 second. After 1.0 second, you can display a loader to keep user's flow of thought uninterrupted.

{{"demo": "pages/demos/progress/DelayingAppearance.js"}}

## Limitations

Under heavy load, you might lose the stroke dash animation or see random CircularProgress ring widths. You should run processor intensive operations in a web worker or by batch in order not to block the main rendering thread.

![heavy load](/static/images/progress/heavy-load.gif)

When it's not possible, you can leverage the `disableShrink` property to mitigate the issue. See https://github.com/mui-org/material-ui/issues/10327

{{"demo": "pages/demos/progress/CircularUnderLoad.js"}}