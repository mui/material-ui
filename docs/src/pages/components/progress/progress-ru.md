---
title: Circular Progress, Linear Progress React component
components: CircularProgress, LinearProgress
---

# Прогресс

<p class="description">Индикаторы прогресса указывают на неопределенное время ожидания или отображают продолжительность процесса.</p>

[Индикаторы прогресса](https://material.io/design/components/progress-indicators.html) информируют пользователей о состоянии текущих процессов, таких как загрузка приложения, отправка формы или сохранение обновлений. Они сообщают о состоянии приложения и указывают возможные действия, например, могут ли пользователи уходить с текущего экрана.

**Детерменированные** индикаторы показывают, сколько времени займет операция.

**Недетерминированные** индикаторы отображают неопределенное время ожидания.

#### Групповой прогресс

Отображая прогресс последовательности процессов, укажите общий прогресс, а не прогресс каждого отдельного действия.

## Circular

[Circular progress](https://material.io/design/components/progress-indicators.html#circular-progress-indicators) support both determinate and indeterminate processes.

- **Determinate** circular indicators fill the invisible, circular track with color, as the indicator moves from 0 to 360 degrees.
- **Indeterminate** circular indicators grow and shrink in size while moving along the invisible track.

### Circular Indeterminate

{{"demo": "pages/components/progress/CircularIndeterminate.js"}}

### Interactive Integration

{{"demo": "pages/components/progress/CircularIntegration.js"}}

### Circular Determinate

{{"demo": "pages/components/progress/CircularDeterminate.js"}}

### Circular Static

{{"demo": "pages/components/progress/CircularStatic.js"}}

## Linear

[Linear progress](https://material.io/design/components/progress-indicators.html#linear-progress-indicators) indicators.

### Linear Indeterminate

{{"demo": "pages/components/progress/LinearIndeterminate.js"}}

### Linear Determinate

{{"demo": "pages/components/progress/LinearDeterminate.js"}}

### Linear Buffer

{{"demo": "pages/components/progress/LinearBuffer.js"}}

### Linear Query

{{"demo": "pages/components/progress/LinearQuery.js"}}

## Non-standard ranges

Компоненты прогресса принимают значение в диапазоне от 0 до 100. Это упрощает работу с программами для чтения с экрана ("скринридеры"), где это минимальные и максимальные значения по умолчанию. Однако иногда вы можете работать с данными, значения которых выходят за пределы этого диапазона. Вот так можно легко преобразовать значение из любого диапазона в шкалу от 0 до 100:

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

## Customized progress bars

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/progress/CustomizedProgressBars.js"}}

## Delaying appearance

There are [3 important limits](https://www.nngroup.com/articles/response-times-3-important-limits/) to know around response time. The ripple effect of the `ButtonBase` component ensures that the user feels that the system is reacting instantaneously. Normally, no special feedback is necessary during delays of more than 0.1 but less than 1.0 second. After 1.0 second, you can display a loader to keep user's flow of thought uninterrupted.

{{"demo": "pages/components/progress/DelayingAppearance.js"}}

## Ограничения

Under heavy load, you might lose the stroke dash animation or see random CircularProgress ring widths. You should run processor intensive operations in a web worker or by batch in order not to block the main rendering thread.

![heavy load](/static/images/progress/heavy-load.gif)

When it's not possible, you can leverage the `disableShrink` property to mitigate the issue. See [this issue](https://github.com/mui-org/material-ui/issues/10327).

{{"demo": "pages/components/progress/CircularUnderLoad.js"}}