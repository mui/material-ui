---
components: Typografie
---

# Typografie

<p class="description">Verwenden Sie die Typografie, um Ihr Design und Ihren Inhalt so klar und effizient wie möglich darzustellen.</p>

Zu viele Schriftgrößen und -stile gleichzeitig können jedes Layout beeinträchtigen. Eine [typografische Skala](https://material.io/design/typography/#type-scale) hat einen begrenzten Satz von Schriftgrößen, die gut mit dem Layoutraster zusammenarbeiten.

## Allgemein

Die *Roboto* Schriftart wird **nicht** automatisch durch Material UI geladen werden. Der Entwickler ist dafür verantwortlich, alle, in seiner Anwendung verwendeten, Schriftarten zu laden. Roboto Font bietet einige einfache Einstiegsmöglichkeiten. Für anspruchsvollere Konfiguration, besuche [den Theme Anpassung Abschnitt](/customization/typography/).

## Die Roboto Schrift

Unten ist ein Beispiel für ein Link-Markup zum Laden der Roboto-Schriftart von einem CDN dargestellt:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
```

## Mit npm installieren

Sie können [diese installieren](https://www.npmjs.com/package/typeface-roboto) durch den folgenden Befehl im Terminal:

`npm install typeface-roboto --save`

Dann können Sie es in Ihren Einstiegspunkt importieren.

```js
import 'typeface-roboto';
```

Weitere Informationen finden Sie im [Schriftprojekt](https://github.com/KyleAMathews/typefaces/tree/master/packages/roboto).

⚠️ Seien Sie vorsichtig, wenn Sie diesen Ansatz verwenden. Stellen Sie sicher, dass Ihr Bundler nicht alle Schriftvarianten läd (100/300/400/500/700/900, kursiv / normal, SVG / woff). Durch das Einbetten aller Schriftdateien kann die Größe Ihres Bundles erheblich erhöht werden. Die Standard-Typografiekonfiguration für Material-UI basiert nur auf den Schriftstärken 300, 400 und 500.

## Komponente

{{"demo": "pages/components/typography/Types.js"}}

## Theme

In einigen Situationen können Sie möglicherweise die Komponente `Typography` nicht benutzen. Hoffentlich können Sie die Hauptfunktionalitäten der [`Typografie`](/customization/default-theme/?expend-path=$.typography) des Themas nutzen.

{{"demo": "pages/components/typography/TypographyTheme.js"}}

## Ändern des semantischen Elements

Die Komponente Typografie verwendet die Eigenschaft `variantMapping` um eine UI-Variante einem semantischen Element zuzuordnen. Es ist wichtig zu wissen, dass der Stil einer Typografie unabhängig von dem zugrunde liegenden semantischen Element ist.

- Sie können das zugrunde liegende Element einmalig mit der Eigenschaft `component` ändern:

```jsx
{/ * Wir haben bereits eine h1 auf der Seite, wir wollen diese nicht kopieren. * /}
<Typography variant="h1" component="h2">
  h1. Überschrift
</Typography>
```

- Sie können das Mapping [global mit dem Theme](/customization/globals/#default-props) ändern:

```js
const theme = createMuiTheme({
  props: {
    MuiTypography: {
      variantMapping: {
        h1: 'h2',
        h2: 'h2',
        h3: 'h2',
        h4: 'h2',
        h5: 'h2',
        h6: 'h2',
        subtitle1: 'h2',
        subtitle2: 'h2',
        body1: 'span',
        body2: 'span',
      },
    },
  },
});
```