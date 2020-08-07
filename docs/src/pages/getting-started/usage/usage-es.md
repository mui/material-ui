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

{{"demo": "pages/getting-started/usage/Usage.js", "hideToolbar": true, "bg": true}}

## Globales

La experiencia de uso de Material-UI puede mejorar con algunas globales importantes que deberás tener en cuenta.

### Meta tag responsivo

Para asegurar un renderizado adecuado y zoom táctil en todos los dispositivos, añade la meta-etiqueta para vista responsiva en el elemento `<head>`. Material-UI es desarrollado bajo el esquema "móviles primero", una estrategia en la que primero escribimos código para dispositivos móviles, y después escalamos los componentes según sea necesario utilizando CSS Media Queries.

```html
<meta
  name="viewport"
  content="minimum-scale=1, initial-scale=1, width=device-width"
/>
```

### CssBaseline

Material-UI proporciona un componente opcional llamado [CssBaseline](/components/css-baseline/). Regulariza algunas inconsistencias entre navegadores y dispositivos, aunque provee reseteos ligeramente más dogmáticos respecto a elementos HTML comunes.

## Documentación versionada

Esta documentación siempre refleja la última versión estable de Material-UI. Podrás encontrar versiones antiguas en una [página apartada](https://material-ui.com/versions/).

## Siguientes pasos

Ahora que tienes una idea de la organización básica, es hora de aprender más acerca de:

- Cómo proporcionar [la fuente y tipografía de Material Design](/components/typography/).
- Cómo aprovechar la [solución de plantilla](/customization/theming/).
- Cómo [reemplazar](/customization/components/) el aspecto de los componentes.