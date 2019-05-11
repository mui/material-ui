---
title: Breadcrumbs
components: Breadcrumbs, Link, Typography
---

# Хлебные крошки

<p class="description">Хлебные крошки позволяют пользователям выбирать из диапазона значений.</p>

## Простые хлебные крошки

{{"demo": "pages/components/breadcrumbs/SimpleBreadcrumbs.js"}}

## Пользовательский разделитель

В следующих примерах мы используем два строковых разделителя и SVG иконку.

{{"demo": "pages/components/breadcrumbs/CustomSeparator.js"}}

## Хлебные крошки с иконками

{{"demo": "pages/components/breadcrumbs/IconBreadcrumbs.js"}}

## Collapsed хлебные крошки

{{"demo": "pages/components/breadcrumbs/CollapsedBreadcrumbs.js"}}

## Пользовательские хлебные крошки

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/breadcrumbs/CustomizedBreadcrumbs.js"}}

## Доступность

Убедитесь что добавили `aria-label` в описание `Breadcrumbs` компонента.

Доступность этого компонента зависит от:

- Набор ссылок структурирован с использованием упорядоченного списка (элемент`<ol>`).
- Для того, чтобы программа чтения с экрана не объявляла визуальные разделители между ссылками, они скрыты с `aria-hidden`.
- Элемент навигации, помеченный `aria-label` идентифицирует структуру как "след" хлебной крошки и делает ее навигационным ориентиром, чтобы ее можно было легко найти.

## Интеграция с react-router

{{"demo": "pages/components/breadcrumbs/RouterBreadcrumbs.js"}}