---
title: Circular, Linear progress React components
components: CircularProgress, LinearProgress
---

# Progreso

<p class="description">Progress indicators commonly known as spinners, express an unspecified wait time or display the length of a process. The animation works with CSS, not JavaScript.</p>

Los [indicadores de progreso](https://material.io/design/components/progress-indicators.html) informan a los usuarios acerca del estado de procesos activos, tales como cargar una aplicación, enviar un formulario o guardar actualizaciones. Comunican el estado de una aplicación e indican acciones disponibles, como si los usuarios pueden navegar fuera de la pantalla actual.

- Los indicadores **determinados** muestran cuánto durará una operación.
- Los indicadores **indeterminados** visualizan un tiempo de espera no determinado.

Al mostrar progreso para una secuencia de procesos, se indica el progreso general en lugar del progreso de cada actividad.

## Circular

### Circular indeterminate

{{"demo": "pages/components/progress/CircularIndeterminate.js"}}

### Circular determinate

{{"demo": "pages/components/progress/CircularStatic.js"}}

### Interactive integration

{{"demo": "pages/components/progress/CircularIntegration.js"}}

### Circular with label

{{"demo": "pages/components/progress/CircularWithValueLabel.js"}}

## Lineal

### Linear indeterminate

{{"demo": "pages/components/progress/LinearIndeterminate.js"}}

### Linear determinate

{{"demo": "pages/components/progress/LinearDeterminate.js"}}

### Linear buffer

{{"demo": "pages/components/progress/LinearBuffer.js"}}

### Linear with label

{{"demo": "pages/components/progress/LinearWithValueLabel.js"}}

## Rangos no estándar

Los componentes de progreso aceptan un valor en el rango 0 - 100. Esto simplifica las cosas para los usuarios lectores de la pantalla, donde estos son los valores mínimos / máximos por defecto. Sin embargo, algunas veces puedes estar trabajando con fuentes de datos donde los valores están fuera de este rango. Aquí mostramos como puede transformar fácilmente un valor en cualquier rango a una escala de 0 - 100:

```jsx
// MIN = valor mínimo esperado
// MAX = valor máximo esperado
// Función para normalizar los valores (MIN / MAX podrían estar integrados)
const normalise = value => (value - MIN) * 100 / (MAX - MIN);

// Componente ejemplo que utiliza la función `normalise` en el punto de dibujo.
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

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/progress/CustomizedProgressBars.js", "defaultCodeOpen": false}}

## Demorando la aparición

Hay [3 límites importantes](https://www.nngroup.com/articles/response-times-3-important-limits/) que conocer acerca del tiempo de respuesta. El efecto dominó del componente `ButtonBase` garantiza que el usuario sienta que el sistema está reaccionando instantáneamente. Normalmente, no se necesita una retroalimentación especial durante retrasos entre 0.1 y 1.0 segundo. Después de 1.0 segundo, puede desplegar un cargador para mantener el flujo de pensamiento del usuario sin interrupciones.

{{"demo": "pages/components/progress/DelayingAppearance.js"}}

## Limitaciones

Bajo cargas pesadas, puede perder la animación del trazo o ver anchos de anillos aleatorios de CircularProgress. Debería ejecutar operaciones de procesamiento intensivas en un trabajador web o por lotes para no bloquear el hilo de dibujo (render).

![carga pesada](/static/images/progress/heavy-load.gif)

When it's not possible, you can leverage the `disableShrink` property to mitigate the issue. See [this issue](https://github.com/mui-org/material-ui/issues/10327).

{{"demo": "pages/components/progress/CircularUnderLoad.js"}}