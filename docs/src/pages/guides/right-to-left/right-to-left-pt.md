# Da direita para a esquerda

<p class="description">Idiomas direita-para-esquerda como árabe, persa ou hebraico são suportados. To change the direction of MUI components you must follow the following steps.</p>

## Passos

### 1. HTML

Certifique-se de que o atributo `dir` é definido no corpo (body), caso contrário, os componentes nativos serão quebrados:

```html
<body dir="rtl">
```

As an alternative to the above, you can also wrap your application in an element with the `dir` attribute:

```jsx
function App() {
  return (
    <div dir="rtl">
      <MyComponent />
    </div>
  );
}
```

This can be helpful for creating components to toggle language settings in the live application.

### 2. Tema

Defina a direção no seu tema customizado:

```js
const theme = createTheme({
  direction: 'rtl',
});
```

### 3. Instale o plugin rtl

When using either `emotion` or `styled-components`, you need [`stylis-plugin-rtl`](https://github.com/styled-components/stylis-plugin-rtl) to flip the styles.

```sh
npm install stylis stylis-plugin-rtl
```

> **Note**: Only `emotion` is compatible with version 2 of the plugin. `styled-components` requires version 1. If you are using `styled-components` as a [styled engine](/guides/styled-engine/), make sure to install the correct version.

In case you are using `jss` (up to v4) or with the legacy `@mui/styles` package, you need [`jss-rtl`](https://github.com/alitaheri/jss-rtl) to flip the styles.

```sh
npm install jss-rtl
```

Having installed the plugin in your project, MUI components still require it to be loaded by the style engine instance that you use. Find bellow guides on how you can load it.

### 4. Carregando o plugin rtl

#### 4.1 emotion

If you use emotion as your style engine, you should create new cache instance that uses the `stylis-plugin-rtl` and provide that on the top of your application tree. The [CacheProvider](https://emotion.sh/docs/cache-provider) component enables this:

```jsx
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

function RTL(props) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}
```

#### 4.2 styled-components

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

#### 4.3 JSS

After installing the plugin in your project, you need to configure the JSS instance to load it. The next step is to make the new JSS instance available to all the components in the component tree. O componente [`StylesProvider`](/styles/api/#stylesprovider) permite isso:

```jsx
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@mui/styles';

// Configure JSS
const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

function RTL(props) {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
}
```

For more information on the plugin, head to the [plugin README](https://github.com/alitaheri/jss-rtl). **Note**: Internally, withStyles is using this JSS plugin when `direction: 'rtl'` is set on the theme.

## Demonstração

_Use o botão de alternância de direção no canto superior direito para inverter toda a documentação_

{{"demo": "pages/guides/right-to-left/Direction.js"}}

## Optando pela transformação do rtl

### emotion & styled-components

You have to use the template literal syntax and add the `/* @noflip */` directive before the rule or property for which you want to disable right-to-left styles.

```jsx
const AffectedText = styled('div')`
  text-align: left;
`;

const UnaffectedText = styled('div')`
  /* @noflip */
  text-align: left;
`;
```

{{"demo": "pages/guides/right-to-left/RtlOptOutStylis.js", "hideToolbar": true}}

### JSS

Se você quiser evitar que um conjunto de regras específico seja afetado pela transformação `rtl`, você pode adicionar `flip: false` no inicio.

```jsx
const useStyles = makeStyles(
  (theme) => ({
    affected: {
      textAlign: 'right',
    },
    unaffected: {
      flip: false,
      textAlign: 'right',
    },
  }),
  { defaultTheme },
);
```
