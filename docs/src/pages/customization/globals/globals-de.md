# Globale Objekte

<p class="description">Mit dem Überschreibungsschlüssel können Sie das Erscheinungsbild aller Instanzen eines Komponententyps anpassen, während Sie mit dem Eigenschaften die Standardwerte der Requisiten einer Komponente ändern können.</p>

## CSS

Wenn die Konfigurationsvariablen nicht ausreichen, können Sie die Vorteile der `overrides` Schlüssel des `Theme` verwenden, um potenziell jeden einzelnen von Material-UI in den DOM eingefügten **Stil** zu ändern. Das ist eine sehr mächtige Funktion.

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

## Standard-Eigenschaften

Sie können die Standard-Eigenschaften aller Komponenten der Material-UI ändern. Wir stellen einen `props` Schlüssel im `Theme` für diesen Anwendungsfall zur Verfügung.

```js
const theme = createMuiTheme({
  props: {
    // Name der Komponente ⚛️
    MuiButtonBase: {
      // Die Standardeigenschaften, die verändert werden sollen
      disableRipple: true, // Keine Welleneffekte in der ganzen Applikation 💣!
    },
  },
});
```

{{"demo": "pages/customization/globals/DefaultProps.js"}}