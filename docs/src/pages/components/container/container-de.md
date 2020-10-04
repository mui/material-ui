---
title: React Container component
components: Container
---

# Container

<p class="description">Der Container zentriert Ihren Inhalt horizontal. Er ist das grundlegendste Layoutelement.</p>

Container können verschachtelt werden, für die meisten Layouts ist dies aber nicht notwendig.

## Flexible Container

A fluid container width is bounded by the `maxWidth` property value.

{{"demo": "pages/components/container/SimpleContainer.js", "iframe": true, "defaultCodeOpen": false}}

```jsx
<Container maxWidth="sm">
```

## Fixiert

Wenn Sie es vorziehen, für einen festen Satz von Größen zu entwerfen, anstatt zu versuchen, ein vollständig fließendes Ansichtsfenster unterzubringen, können Sie die Eigenschaft `fixed` festlegen. Die maximale Breite stimmt mit der minimalen Breite des aktuellen Haltepunkts überein.

{{"demo": "pages/components/container/FixedContainer.js", "iframe": true, "defaultCodeOpen": false}}

```jsx
<Container fixed>
```