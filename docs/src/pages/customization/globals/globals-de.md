# Globale Objekte

<p class="description">The overrides key enables you to customize the appearance of all instances of a component type, while the props key enables you to change the default value(s) of a component's props.</p>

## CSS

When the configuration variables aren't powerful enough, you can take advantage of the `overrides` key of the `theme` to potentially change **every single style** injected by Material-UI into the DOM. Das ist eine sehr mächtige Funktion.

```js
const theme = createMuiTheme({
  overrides: {
    MuiButton: { // Name der Komponente ⚛️ / Style-Sheet
      text: { // Name der Regel
        color: 'white', // Einige CSS
      },
    },
  },
});
```

{{"demo": "pages/customization/globals/GlobalCss.js"}}

Die Liste dieser Anpassungspunkte für jede Komponente ist unter der **Komponenten-API** Sektion dokumentiert. Zum Beispiel können Sie sich den [Button](/api/button/#css) anschauen. Alternativ können Sie sich immer die [Implementierung](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Button/Button.js) ansehen.

## Default props

You can change the default props of all the Material-UI components. Wir stellen einen `props` Schlüssel im `Theme` für diesen Anwendungsfall zur Verfügung.

```js
const theme = createMuiTheme({
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The default props to change
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
});
```

{{"demo": "pages/customization/globals/DefaultProps.js"}}