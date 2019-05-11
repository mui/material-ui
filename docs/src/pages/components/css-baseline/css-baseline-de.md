---
components: CssBaseline
---

# CSS-Baseline

<p class="description">Die Material-UI bietet eine CssBaseline-Komponente, um eine elegante, konsistente und einfache Basis zu schaffen, auf der aufgebaut werden kann.</p>

Möglicherweise kennen Sie [normalize.css](https://github.com/necolas/normalize.css), eine Sammlung von HTML-Element- und Attributstil-Normalisierungen.

```jsx
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

function MyApp() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* Der Rest deiner Applikation */}
    </React.Fragment>
  );
}

export default MyApp;
```

## Ansatz

### Seite

Die Elemente `<html>` und `<body>` werden aktualisiert, um bessere seitenweite Standardeinstellungen zu erhalten. Genauer:

- Der Rand in allen Browsern wird entfernt.
- Die Standardhintergrundfarbe des Materialdesigns wird angewendet. Es verwendet [`theme.palette.background.default`](/customization/default-theme/?expend-path=$.palette.background) für Standardgeräte und einen weißen Hintergrund für Druckgeräte.

### Layout

- `box-sizing` wird global auf dem `<html>` Element auf `border-box` gesetzt. Jedes Element, einschließlich `*::before` und `*::after` erbt dieser Eigenschaft. Dadurch wird sichergestellt, dass die deklarierte Breite des Elements niemals durch Auffüllung oder Rand überschritten wird.

### Typografie

- Das Antialiasing von Schriftarten ist aktiviert, um die Roboto-Schrift besser anzuzeigen.
- Für das `<html>`-Element wird keine Basisschriftgröße deklariert, es wird jedoch von 16px ausgegangen (Standardeinstellung des Browsers). Sie können mehr über die Auswirkungen lernen von den sich ändernden `<html>` Standard - Schriftgröße auf [der Theme Dokumentation](/customization/typography/#typography-html-font-size) Seite.