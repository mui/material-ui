---
title: Breadcrumbs
components: Breadcrumbs, Link, Typography
---
# Хлебные крошки

<p class="description">Хлебные крошки позволяют пользователям выбирать из диапазона значений.</p>

## Простые хлебные крошки

{{"demo": "pages/demos/breadcrumbs/SimpleBreadcrumbs.js"}}

## Пользовательский разделитель

В следующих примерах мы используем два строковых разделителя и SVG иконку.

{{"demo": "pages/demos/breadcrumbs/CustomSeparator.js"}}

## Хлебные крошки с иконками

{{"demo": "pages/demos/breadcrumbs/IconBreadcrumbs.js"}}

## Collapsed хлебные крошки

{{"demo": "pages/demos/breadcrumbs/CollapsedBreadcrumbs.js"}}

## Пользовательские хлебные крошки

If you have been reading the [overrides documentation page](/customization/overrides/) but you are not confident jumping in, here is one example of how you can change the breadcrumb link design.

{{"demo": "pages/demos/breadcrumbs/CustomizedBreadcrumbs.js"}}

## Accessibility

Be sure to add a `aria-label` description on the `Breadcrumbs` component.

The accessibility of this component relies on:

- The set of links is structured using an ordered list (`<ol>` element).
- To prevent screen reader announcement of the visual separators between links, they are hidden with `aria-hidden`.
- Элемент навигации, помеченный `aria-label` идентифицирует структуру как "след" хлебной крошки и делает ее навигационным ориентиром, чтобы ее можно было легко найти.

## Интеграция с react-router

{{"demo": "pages/demos/breadcrumbs/RouterBreadcrumbs.js"}}