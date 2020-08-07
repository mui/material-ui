---
title: Container React component
components: Container
---

# Container

<p class="description">El container centra el contenido horizontalmente. Es el elemento más básico del layout.</p>

Si bien los contenedores pueden anidarse, la mayoria de los layouts no requieren un contenedor anidado. 

## Fluido

El ancho de un contenedor fluido está ligado al valor de la propiedad `maxWidth`.

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