---
title: Componente React Progreso circular, Progreso lineal
components: CircularProgress, LinearProgress
---

# Progreso

<p class="description">Los indicadores de progreso expresan un tiempo de espera indeterminado o despliegan la duración de un proceso.</p>

Los [indicadores de progreso](https://material.io/design/components/progress-indicators.html) informan a los usuarios acerca del estado de procesos activos, tales como cargar una aplicación, enviar un formulario o guardar actualizaciones. Comunican el estado de una aplicación e indican acciones disponibles, como si los usuarios pueden navegar fuera de la pantalla actual.

Los indicadores **determinados** muestran cuánto durará una operación.

Los indicadores **indeterminados** visualizan un tiempo de espera no determinado.

#### Progresos como grupo

Al mostrar progreso para una secuencia de procesos, se indica el progreso general en lugar del progreso de cada actividad.

## Circular

El [progreso circular](https://material.io/design/components/progress-indicators.html#circular-progress-indicators) soporta procesos tanto determinados como indeterminados.

- Los indicadores circulares **determinados** llenan la trayectoria invisible circular con color, a medida que el indicador se mueve desde los 0 a los 360 grados.
- Los indicadores circulares **indeterminados** aumentan y disminuyen de tamaño moviéndoselo a lo largo de su trayectoria invisible.

### Circular indeterminado

{{"demo": "pages/components/progress/CircularIndeterminate.js"}}

### Integración interactiva

{{"demo": "pages/components/progress/CircularIntegration.js"}}

### Circular determinado

{{"demo": "pages/components/progress/CircularDeterminate.js"}}

### Circular estático

{{"demo": "pages/components/progress/CircularStatic.js"}}

## Lineal

Indicadores de [progreso lineal](https://material.io/design/components/progress-indicators.html#linear-progress-indicators).

### Lineal indeterminado

{{"demo": "pages/components/progress/LinearIndeterminate.js"}}

### Lineal determinado

{{"demo": "pages/components/progress/LinearDeterminate.js"}}

### Buffer lineal

{{"demo": "pages/components/progress/LinearBuffer.js"}}

### Consulta lineal

{{"demo": "pages/components/progress/LinearQuery.js"}}

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

## Customized progress bars

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/progress/CustomizedProgressBars.js"}}

## Demorando la aparición

Hay [3 límites importantes](https://www.nngroup.com/articles/response-times-3-important-limits/) que conocer acerca del tiempo de respuesta. El efecto dominó del componente `ButtonBase` garantiza que el usuario sienta que el sistema está reaccionando instantáneamente. Normalmente, no se necesita una retroalimentación especial durante retrasos entre 0.1 y 1.0 segundo. Después de 1.0 segundo, puede desplegar un cargador para mantener el flujo de pensamiento del usuario sin interrupciones.

{{"demo": "pages/components/progress/DelayingAppearance.js"}}

## Limitaciones

Bajo cargas pesadas, puede perder la animación del trazo o ver anchos de anillos aleatorios de CircularProgress. Debería ejecutar operaciones de procesamiento intensivas en un trabajador web o por lotes para no bloquear el hilo de dibujo (render).

![carga pesada](/static/images/progress/heavy-load.gif)

When it's not possible, you can leverage the `disableShrink` property to mitigate the issue. See [this issue](https://github.com/mui-org/material-ui/issues/10327).

{{"demo": "pages/components/progress/CircularUnderLoad.js"}}