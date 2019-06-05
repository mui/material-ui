---
title: Container React Komponente
components: Container
---

# Container

<p class="description">Der Container zentriert Ihren Inhalt horizontal. Es ist das grundlegendste Layoutelement.</p>

Während Container geschachtelt werden können, benötigen die meisten Layouts keinen verschachtelten Container.

## Flexibel

Eine Breite des Fluidcontainers wird durch den Wert `maxWidth` begrenzt.

```jsx
<Container maxWidth="sm">
```

{{"demo": "pages/components/container/SimpleContainer.js", "iframe": true}}

## Fixiert

Wenn Sie es vorziehen, für einen festen Satz von Größen zu entwerfen, anstatt zu versuchen, ein vollständig fließendes Ansichtsfenster unterzubringen, können Sie die Eigenschaft `fixed` festlegen. Die maximale Breite stimmt mit der minimalen Breite des aktuellen Haltepunkts überein.

```jsx
<Container fixed>
```

{{"demo": "pages/components/container/FixedContainer.js", "iframe": true}}