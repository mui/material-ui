# Implementación

<p class="description">Empieza a utilizar React y Material-UI al instante.</p>

Los componentes de Material-UI funcionan aisladamente. **Son autosuficientes**, y sólo inyectarán los estilos necesarios para su presentación. No dependen de ninguna hoja de estilos global como [normalize.css](https://github.com/necolas/normalize.css/).

Puedes utilizar cualquiera de los componentes como son demostrados en la documentación. Por favor, consulta la [página de demostración](/components/buttons/) de cada componente para ver cómo deben ser importados.

## Inicio rápido

Aquí está un ejemplo rápido para empezar. **Es, literalmente, todo lo que necesitas**:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

function App() {
  return (
    <Button variant="contained" color="primary">
      Hola Mundo!
    </Button>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Así es! Esto es todo lo que necesitas para empezar, como podrás comprobar con la siguiente demostración interactiva en vivo:

{{"demo": "pages/getting-started/usage/Usage.js", "hideHeader": true}}

## Globales

La experiencia de uso de Material-UI puede mejorar con algunas globales importantes que deberás tener en cuenta.

### Meta tag responsivo

Material-UI es desarrollado primero móvil: una estrategia mediante la cual primero escribimos código para dispositivos móviles y luego ampliamos los componentes proporcionalmente, a medida que sea necesario, utilizando los media queries de CSS. Para asegurar un renderizado adecuado y zoom táctil en todos los dispositivos, añade la meta-etiqueta para vista responsiva en el elemento `<head>`.

```html
<meta
  name="viewport"
  content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
/>
```

### CssBaseline

Material-UI proporciona un componente opcional llamado [CssBaseline](/components/css-baseline/). It fixes some inconsistencies across browsers and devices while providing slightly more opinionated resets to common HTML elements.

## Documentación versionada

Ésta documentación siempre refleja la última versión estable de Material-UI. Podrás encontrar versiones antiguas en una [página apartada](/versions/).

## Siguientes pasos

Ahora que tienes una idea de la organización básica, es hora de aprender más acerca de:

- Cómo proporcionar [la fuente y tipografía de Material Design](/components/typography/).
- Cómo aprovechar la [solución de plantilla](/customization/themes/).
- Cómo [reemplazar](/customization/components/) el aspecto de los componentes.