---
title: Componente React Migas de pan
components: Breadcrumbs, Link, Typography
---
# Migas de pan

<p class="description">Las Migas de pan permiten a los usuarios realizar selecciones desde un rango de valores.</p>

## Migas de pan simples

{{"demo": "pages/demos/breadcrumbs/SimpleBreadcrumbs.js"}}

## Separador personalizado

En los siguientes ejemplos, estamos usando dos cadenas como separadores, y un ícono SVG.

{{"demo": "pages/demos/breadcrumbs/CustomSeparator.js"}}

## Migas de pan con íconos

{{"demo": "pages/demos/breadcrumbs/IconBreadcrumbs.js"}}

## Migas de pan colapsadas

{{"demo": "pages/demos/breadcrumbs/CollapsedBreadcrumbs.js"}}

## Migas de pan personalizadas

Si has estado leyendo la [página de documentación de anulaciones](/customization/overrides/) pero no estás con la confianza de abordarla, aquí hay un ejemplo de cómo puedes cambiar el diseño del vínculo de las migas de pan.

{{"demo": "pages/demos/breadcrumbs/CustomizedBreadcrumbs.js"}}

## Accesibilidad

Asegúrese de agregar una descripción `aria-label` en el componente `Breadcrumbs`.

La accesibilidad de este componente se basa en:

- El conjunto de vínculos está estructurado usando una lista ordenada (elemento `<ol>`).
- Para prevenir el anuncio del lector de pantalla de los separadores visuales entre los vínculos, se ocultan con `aria-hidden`.
- Un elemento de navegación con la etiqueta `aria-label` identifica la estructura como un rastro de migas de pan y la convierte en un punto de referencia para que sea fácil de ubicar.

## Integración con react-router

{{"demo": "pages/demos/breadcrumbs/RouterBreadcrumbs.js"}}