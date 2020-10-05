# Da direita para a esquerda

<p class="description">Idiomas direita-para-esquerda como árabe, persa ou hebraico são suportados. Para alterar a direção dos componentes de Material-UI, você deve seguir as etapas a seguir.</p>

## Passos

### 1. HTML

Certifique-se de que o atributo `dir` é definido no corpo (body), caso contrário, os componentes nativos serão quebrados:

```html
<body dir="rtl">
```

### 2. Tema

Defina a direção no seu tema customizado:

```js
const theme = createMuiTheme({
  direction: 'rtl',
});
```

### 3. Install the rtl plugin

Você precisa deste plugin JSS para inverter os estilos: [jss-rtl](https://github.com/alitaheri/jss-rtl).

```sh
npm install jss-rtl
```

If you are using `emotion` or `styled-components`, you need this stylis plugin to flip the styles: [stylis-plugin-rtl](https://github.com/styled-components/stylis-plugin-rtl).

```sh
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

// Configure o JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function RTL(props) {
  return (
    <StylesProvider jss={jss}>
      {props.children}
    </StylesProvider>
  );
}
```

Note: both `emotion` and `styled-components` currently work with the v1 of the plugin.

Having installed the plugin in your project, Material-UI components still require it to be loaded by the style engine instance that you use. Find bellow guides on how you can load it.

### 3. Load the rtl plugin

#### 3.1 JSS

Tendo instalado o plugin em seu projeto, os componentes de Material-UI ainda exigem que ele seja carregado pela instância do jss, conforme descrito abaixo. Internamente, withStyles está usando este plugin JSS quando `direção: 'rtl'` está definido no tema. Vá para o [README do plugin](https://github.com/alitaheri/jss-rtl) para aprender mais sobre isso.

Depois de criar uma nova instância do JSS com o plugin, você precisará disponibilizá-la para todos os componentes na árvore de componentes. O componente [`StylesProvider`](/styles/api/#stylesprovider) permite isso:

```jsx
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

// Configure o JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function RTL(props) {
  return (
    <StylesProvider jss={jss}>
      {props.children}
    </StylesProvider>
  );
}
```

#### 3.2 emotion

Depois de criar uma nova instância do JSS com o plugin, você precisará disponibilizá-la para todos os componentes na árvore de componentes. O componente [`StylesProvider`](/styles/api/#stylesprovider) permite isso:

```jsx
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/core';
import createCache from '@emotion/cache';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
  speedy: true,
});

function RTL(props) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}
```

#### 3.3 styled-components

If you use `styled-components` as your style engine, you can use the [StyleSheetManager](https://styled-components.com/docs/api#stylesheetmanager) and provide the stylis-plugin-rtl as an item in the `stylisPlugins` property:

```jsx
import { StyleSheetManager } from 'styled-components';
import rtlPlugin from 'stylis-plugin-rtl';

function RTL(props) {
  return (
    <StyleSheetManager stylisPlugins={[rtlPlugin]}>
      {props.children}
    </StyleSheetManager>
  );
}
```

## Demonstração

_Use o botão de alternância de direção no canto superior direito para inverter toda a documentação_

{{"demo": "pages/guides/right-to-left/Direction.js"}}

## Optando pela transformação do rtl

### JSS

Se você quiser evitar que um conjunto de regras específico seja afetado pela transformação `rtl`, você pode adicionar `flip: false` no inicio.

_Use o botão de alternância de direção no canto superior direito para ver o efeito._

{{"demo": "pages/guides/right-to-left/RtlOptOut.js", "hideEditButton": true}}

### emotion & styled-components

You have to use the template literal syntax and add the `/* @noflip */` directive before the rule or property for which you want to disable right-to-left styles.

_Use o botão de alternância de direção no canto superior direito para ver o efeito._

{{"demo": "pages/guides/right-to-left/RtlOptOutStylis.js", "hideEditButton": true}}
