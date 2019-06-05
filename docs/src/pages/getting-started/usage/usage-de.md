# Nutzung

<p class="description">Beginnen Sie mit React und Material-UI in kürzester Zeit.</p>

Material-UI-Komponenten arbeiten isoliert. **Sie sind selbst unterstützend** und injizieren, nur die Stile, die zum Anzeigen benötigt werden. Sie beruhen nicht auf einem globalen Stylesheet wie [normalize.css](https://github.com/necolas/normalize.css/).

Sie können jede Komponente, wie in der Dokumentation beschrieben, verwenden. Bitte beachten Sie die [Demoseite jeder Komponente](/components/buttons/), um zu sehen, wie sie importiert werden sollten.

## Direkt einsteigen

Hier ist ein kurzes Beispiel für den Einstieg. **Es ist wirklich alles, was Sie brauchen**:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

function App() {
  return (
    <Button variant="contained" color="primary">
      Hallo Welt
    </Button>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Ja, das ist tatsächlich alles, das Sie für den Start brauchen. In dieser interaktiven Live-Demo können Sie dies ausprobieren:

{{"demo": "pages/getting-started/usage/Usage.js", "hideHeader": true}}

## Globale Objekte

Die Nutzungserfahrung mit der Material-UI kann mit einer Vielzahl wichtiger Globaler Objekte, die sie beachten müssen, verbessert werden.

### Responsiver meta-tag

Material-UI wurde zuerst für Mobilgeräte entwickelt. Bei dieser Strategie schreiben wir zunächst Code für mobile Geräte und skalieren dann Komponenten nach Bedarf mithilfe sogenannter CSS media queries. Um eine korrektes Darstellen und Zoomen durch Berührungen für alle Geräte sicherzustellen, fügen Sie den auch viewport meta tag genannten responsiven Tag zu Ihrem `<head>`-Element.

```html
<meta
  name="viewport"
  content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
/>
```

### CssBaseline

Material-UI bietet eine optionale [CssBaseline](/components/css-baseline/)-Komponente an. It fixes some inconsistencies across browsers and devices while providing slightly more opinionated resets to common HTML elements.

## Versionierte Dokumentation

Diese Dokumentation benutzt immer die neueste stabile Version von Material-UI. Ältere Versionen der Dokumentation finden Sie auf einer [separaten Seite](/versions/).

## Nächste Schritte

Nun, da Sie eine Vorstellung von den grundlegenden Schritten haben, ist es an der Zeit, mehr darüber zu erfahren:

- Wie man [die Material Design Schriftart und Typografie](/components/typography/) bereitstellt.
- Wie man die [theming-Lösung nutzen kann](/customization/themes/).
- Wie man das Aussehen und das Verhalten der Komponenten [überschreibt](/customization/components/).