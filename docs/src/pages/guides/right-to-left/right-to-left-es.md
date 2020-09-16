# Derecha-a-izquierda

<p class="description">Right-to-left languages such as Arabic, Persian or Hebrew are supported. Para cambiar la dirección de los componentes de Material-UI debe seguir los siguientes pasos.</p>

## Pasos

### 1. HTML

Asegúrese de que el atributo `dir` está establecido en el body, de lo contrario los componentes nativos no funcionarán:

```html
<body dir="rtl">
```

### 2. Tema

Establece la dirección en su tema personalizado:

```js
const theme = createMuiTheme({
  direction: 'rtl',
});
```

### 3. jss-rtl

Necesitas este plugin JSS para voltear los estilos: [jss-rtl](https://github.com/alitaheri/jss-rtl).

```sh
npm install jss-rtl
```

Después de haber instalado el plugin en su proyecto, los componentes de Material-UI todavía requieren que se cargue por la instancia jss, como se describe a continuación. Internamente, withStyles está utilizando este plugin JSS cuando `dirección: 'rtl'` está establecido en el tema. Dirígete al [plugin README](https://github.com/alitaheri/jss-rtl) para aprender más sobre él.

Una vez que haya creado una nueva instancia JSS con el plugin, necesitará ponerla a disposición de todos los componentes del árbol de componentes. The [`StylesProvider`](/styles/api/#stylesprovider) component enables this:

```jsx
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function RTL(props) {
  return (
    <StylesProvider jss={jss}>
      {props.children}
    </StylesProvider>
  );
}
```

## Demo

_Utilice el botón de cambiar de dirección en la esquina superior derecha para voltear toda la documentación_

{{"demo": "pages/guides/right-to-left/Direction.js"}}

## Opting out of rtl transformation

If you want to prevent a specific rule-set from being affected by the `rtl` transformation you can add `flip: false` at the beginning.

_Use the direction toggle button on the top right corner to see the effect._

{{"demo": "pages/guides/right-to-left/RtlOptOut.js", "hideEditButton": true}}
