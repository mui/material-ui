---
title: Breadcrumbs
components: Breadcrumbs, Link, Typography
---

# Хлебные крошки

<p class="description">Хлебные крошки позволяют пользователям выбирать из диапазона значений.</p>

## Простые хлебные крошки

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

Ниже находится пример кастомизации компонента. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/breadcrumbs/CustomizedBreadcrumbs.js"}}

## Integration with react-router

{{"demo": "pages/components/breadcrumbs/RouterBreadcrumbs.js", "bg": true}}

## Доступность

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#breadcrumb)

Be sure to add a `aria-label` description on the `Breadcrumbs` component.

Доступность этого компонента зависит от:

- Набор ссылок структурирован с использованием упорядоченного списка (элемент`<ol>`).
- Для того, чтобы программа чтения с экрана не объявляла визуальные разделители между ссылками, они скрыты с `aria-hidden`.
- Элемент навигации, помеченный `aria-label` идентифицирует структуру как "след" хлебной крошки и делает ее навигационным ориентиром, чтобы ее можно было легко найти.