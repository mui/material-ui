---
title: Container React component
components: Container
githubLabel:
  component: Container
---

# Container

<p class="description">El container centra el contenido horizontalmente. Es el elemento más básico del layout.</p>

Si bien los contenedores pueden anidarse, la mayoria de los layouts no requieren un contenedor anidado.

[La función de estilo de la paleta](/system/palette/).

## Fluido

A fluid container width is bounded by the `maxWidth` prop value.

{{"demo": "pages/components/container/SimpleContainer.js", "iframe": true, "defaultCodeOpen": false}}

```jsx
<Container maxWidth="sm">
```

## Fijo

Si prefiere diseñar para un conjunto de tamaños fijos en vez de tratar de acomodar un viewport totalmente fluido, puede establecer la propiedad `fixed`. El ancho máximo coincide con el ancho mínimo del punto de separación actual.

{{"demo": "pages/components/container/FixedContainer.js", "iframe": true, "defaultCodeOpen": false}}

```jsx
<Container fixed>
```
