---
title: Layout React Komponente
components: Container
---
# Layout

<p class="description">Komponenten und Optionen zur Gestaltung Ihres Projekts.</p>

## CssBasline

Die [`CssBasline` Komponente](/getting-started/usage/#cssbaseline) entfernt den Standardbrowserrand des `<body>`-Elements. Verwenden Sie es oder stellen Sie sicher, dass der Rand entfernt wird:

```css
body {
  margin: 0;
}
```

## Container

Der Container zentriert Ihren Inhalt horizontal. Es ist das grundlegendste Layoutelement. Während Container geschachtelt werden können, benötigen die meisten Layouts keinen verschachtelten Container.

### Flexibel

Eine Breite des Fluidcontainers wird durch den Wert `maxWidth` begrenzt.

```jsx
<Container maxWidth="sm">
```

{{"demo": "pages/layout/layout/SimpleContainer.js", "iframe": true}}

### Fixiert

Wenn Sie es vorziehen, für einen festen Satz von Größen zu entwerfen, anstatt zu versuchen, ein vollständig fließendes Ansichtsfenster unterzubringen, können Sie die Eigenschaft `fixed` festlegen. Die maximale Breite stimmt mit der minimalen Breite des aktuellen Haltepunkts überein.

```jsx
<Container fixed>
```

{{"demo": "pages/layout/layout/FixedContainer.js", "iframe": true}}