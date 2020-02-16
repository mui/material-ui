---
components: CssBaseline, ScopedCssBaseline
---

# CSS-Baseline

<p class="description">Die Material-UI bietet eine CssBaseline-Komponente, um eine elegante, konsistente und einfache Basis zu schaffen, auf der aufgebaut werden kann.</p>

## Global reset

Möglicherweise kennen Sie [normalize.css](https://github.com/necolas/normalize.css), eine Sammlung von HTML-Element- und Attributstil-Normalisierungen.

```jsx
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function MyApp() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* The rest of your application */}
    </React.Fragment>
  );
}
```

## Scoping on children

However, you might be progressively migrating a website to Material-UI, using a global reset might not be an option. It's possible to apply the baseline only to the children by using the `ScopedCssBaseline` component.

```jsx
import React from 'react';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';

export default function MyApp() {
  return (
    <ScopedCssBaseline>
      {/* The rest of your application */}
    </ScopedCssBaseline>
  );
}
```

## Approach

### Seite

The `<html>` and `<body>` elements are updated to provide better page-wide defaults. More specifically:

- Der Rand in allen Browsern wird entfernt.
- Die Standardhintergrundfarbe des Materialdesigns wird angewendet. Es verwendet [`theme.palette.background.default`](/customization/default-theme/?expand-path=$.palette.background) für normale Geräte und einen weißen Hintergrund für Drucker.

### Layout

- `box-sizing` wird global auf dem `<html>` Element auf `border-box` gesetzt. Jedes Element, einschließlich `*::before` und `*::after` erbt dieser Eigenschaft. Dadurch wird sichergestellt, dass die deklarierte Breite des Elements niemals durch Auffüllung oder Rand überschritten wird.

### Typografie

- Für das `<html>`-Element wird keine Basisschriftgröße deklariert, es wird jedoch von 16px ausgegangen (Standardeinstellung des Browsers). Sie können mehr über die Auswirkungen lernen von den sich ändernden `<html>` Standard - Schriftgröße auf [der Theme Dokumentation](/customization/typography/#typography-html-font-size) Seite.
- Set the `theme.typography.body2` style on the `<body>` element.
- Set the font-weight to `theme.typography.fontWeightBold` for the `<b>` and `<strong>` elements.
- Das Antialiasing von Schriftarten ist aktiviert, um die Roboto-Schrift besser anzuzeigen.