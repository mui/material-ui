# Droite à gauche

<p class="description">Pour modifier le sens des composants Materiau-UI, vous devez suivre les étapes suivantes. UIs for languages that are read from right-to-left (RTL), such as Arabic and Hebrew, should be mirrored.</p>

## Etapes

### 1. HTML

Make sure the `dir` attribute is set on the body, otherwise native components will break:

```html
<body dir="rtl">
```

### 2. Thème

Set the direction in your custom theme:

```js
const theme = createMuiTheme({
  direction: 'rtl',
});
```

### 3. jss-rtl

You need this JSS plugin to flip the styles: [jss-rtl](https://github.com/alitaheri/jss-rtl).

```sh
npm install jss-rtl
```

Having installed the plugin in your project, Material-UI components still require it to be loaded by the jss instance, as described below. Internally, withStyles is using this JSS plugin when `direction: 'rtl'` is set on the theme.

The [CSS-in-JS documentation](/customization/css-in-js/#opting-out-of-rtl-transformation) explains a bit more about how this plugin works. Head to the [plugin README](https://github.com/alitaheri/jss-rtl) to learn more about it.

Once you have created a new JSS instance with the plugin, you need to make it available to all the components in the component tree. JSS has a [`JssProvider`](https://github.com/cssinjs/react-jss) component for this:

```jsx
import { create } from 'jss';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// Gerador de nome de classe de Material-UI customizado.
const generateClassName = createGenerateClassName();

function RTL(props) {
  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      {props.children}
    </JssProvider>
  );
}
```

## Démo

*Utilisez le bouton de navigation situé dans le coin supérieur droit pour retourner toute la documentation*

{{"demo": "pages/guides/right-to-left/Direction.js"}}

## Désactiver la transformation RTL

If you want to prevent a specific rule-set from being affected by the `rtl` transformation you can add `flip: false` at the beginning:

*Use the direction toggle button on the top right corner to see the effect*

{{"demo": "pages/guides/right-to-left/RtlOptOut.js", "hideEditButton": true}}