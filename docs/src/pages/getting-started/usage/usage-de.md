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

{{"demo": "pages/getting-started/usage/Usage.js", "hideToolbar": true, "bg": true}}

## Globale Objekte

Die Nutzungserfahrung mit der Material-UI kann mit einer Vielzahl wichtiger Globaler Objekte, die sie beachten müssen, verbessert werden.

### Responsiver meta-tag

Um eine korrektes Darstellen und Zoomen durch Berührungen für alle Geräte sicherzustellen, fügen Sie den auch viewport meta tag genannten responsiven Tag zu Ihrem `<head>`-Element. Material-UI is developed mobile-first, a strategy in which we first write code for mobile devices, and then scale up components as necessary using CSS media queries.

```html
<meta
  name="viewport"
  content="minimum-scale=1, initial-scale=1, width=device-width"
/>
```

### CssBaseline

Material-UI bietet eine optionale [CssBaseline](/components/css-baseline/)-Komponente an. Mit dieser Komponente werden einige Inkonsistenzen zwischen Browsern und Geräten behoben, während sie bewährte Eigenschaften für häufig auftretende HTML-Elemente bereitstellt.

## Versionierte Dokumentation

Diese Dokumentation benutzt immer die neueste stabile Version von Material-UI. Ältere Versionen der Dokumentation finden Sie auf einer [separaten Seite](https://material-ui.com/versions/).

## Nächste Schritte

Nun, da Sie eine Vorstellung von den grundlegenden Schritten haben, ist es an der Zeit, mehr darüber zu erfahren:

- Wie man [die Material Design Schriftart und Typografie](/components/typography/) bereitstellt.
- Wie man die [theming-Lösung nutzen kann](/customization/theming/).
- Wie man das Aussehen und das Verhalten der Komponenten [überschreibt](/customization/components/).