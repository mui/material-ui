---
title: Componente React Migas de pan
components: Breadcrumbs, Link, Typography
---

# Migas de pan

<p class="description">Las Migas de pan permiten a los usuarios realizar selecciones desde un rango de valores.</p>

## Migas de pan simples

{{"demo": "pages/components/breadcrumbs/SimpleBreadcrumbs.js"}}

## Active last breadcrumb

Keep the last breadcrumb interactive.

{{"demo": "pages/components/breadcrumbs/ActiveLastBreadcrumb.js"}}

## Custom separator

In the following examples, we are using two string separators, and an SVG icon.

{{"demo": "pages/components/breadcrumbs/CustomSeparator.js"}}

## Breadcrumbs with icons

{{"demo": "pages/components/breadcrumbs/IconBreadcrumbs.js"}}

## Collapsed breadcrumbs

{{"demo": "pages/components/breadcrumbs/CollapsedBreadcrumbs.js"}}

## Customized breadcrumbs

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/breadcrumbs/CustomizedBreadcrumbs.js"}}

## Integración con react-router

{{"demo": "pages/components/breadcrumbs/RouterBreadcrumbs.js", "bg": true}}

## Accesibilidad

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#breadcrumb)

Be sure to add a `aria-label` description on the `Breadcrumbs` component.

La accesibilidad de este componente se basa en:

- El conjunto de vínculos está estructurado usando una lista ordenada (elemento `<ol>`).
- Para prevenir el anuncio del lector de pantalla de los separadores visuales entre los vínculos, se ocultan con `aria-hidden`.
- Un elemento de navegación con la etiqueta `aria-label` identifica la estructura como un rastro de migas de pan y la convierte en un punto de referencia para que sea fácil de ubicar.