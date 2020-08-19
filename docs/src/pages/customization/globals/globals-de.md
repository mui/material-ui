# Globale Objekte

<p class="description">Mit dem Überschreibungsschlüssel können Sie das Erscheinungsbild aller Instanzen eines Komponententyps anpassen, während Sie mit dem Eigenschaften die Standardwerte der Requisiten einer Komponente ändern können.</p>

## CSS

Wenn die Konfigurationsvariablen nicht ausreichen, können Sie die Vorteile der `overrides` Schlüssel des `Theme` verwenden, um potenziell jeden einzelnen von Material-UI in den DOM eingefügten **Stil** zu ändern. Das ist eine sehr mächtige Funktion.

```js
const theme = createMuiTheme({
  components: {
    // Style sheet name ⚛️
    MuiButton: {
      overrides: {
        // Name of the rule
        textPrimary: {
          // Some CSS
          color: 'white',
        },
      },
    },
  },
});
```

{{"demo": "pages/customization/globals/GlobalCss.js"}}

Die Liste dieser Anpassungspunkte für jede Komponente ist unter der **Komponenten-API** Sektion dokumentiert. Zum Beispiel können Sie sich den [Button](/api/button/#css) anschauen. Alternativ können Sie sich immer die [Implementierung](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Button/Button.js) ansehen.

## Globales CSS

If you are using the [CssBaseline](/components/css-baseline/) component to apply global resets, it can also be used to apply global styles. Zum Beispiel:

```jsx
const theme = createMuiTheme({
  components: {
    MuiCssBaseline: {
      overrides: {
        '@global': {
          html: {
            WebkitFontSmoothing: 'auto',
          },
        },
      },
    },
  },
});

// ...
return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);
```

## Standard-Eigenschaften

Sie können die Standard-Eigenschaften aller Komponenten der Material-UI ändern. A `props` key is exposed in the `theme` for this use case.

```js
const theme = createMuiTheme({
  components: {
    // Name der Komponente ⚛️
    MuiButtonBase: {
      props: {
        // Die Standardeigenschaften, die verändert werden sollen
        disableRipple: true, // Keine Welleneffekte in der ganzen Applikation 💣!
      },
    },
  },
});
```

{{"demo": "pages/customization/globals/DefaultProps.js"}}