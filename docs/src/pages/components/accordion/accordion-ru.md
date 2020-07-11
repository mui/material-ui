---
title: Панель расширения (Компонент React)
components: Accordion, AccordionActions, AccordionDetails, AccordionSummary
---

# Accordion (панель расширения)

<p class="description">Панель расширения содержит потоки создания и позволяет легко редактировать элементы.</p>

[Accordion](https://material.io/archive/guidelines/components/expansion-panels.html) это простой контейнер, который может использоваться отдельно, либо как часть более крупного компонента, такого как Card (карточка).

> **Note:** Expansion panels are no longer documented in the [Material Design guidelines](https://material.io/), but Material-UI will continue to support them. It was formerly known as the "expansion panel".

## Простой аккордеон

{{"demo": "pages/components/accordion/SimpleAccordion.js", "bg": true}}

## Контролируемый аккордеон

Используя компонент `Accordion`, расширив его поведение по умолчанию, можно получить "аккордеон".

{{"demo": "pages/components/accordion/ControlledAccordions.js", "bg": true}}

## Настраиваемый аккоредон

Ниже находится пример кастомизации компонента. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/accordion/CustomizedAccordions.js"}}

## Additional actions

In order to put an action such as a `Checkbox` or a button inside of the `AccordionSummary`, you need to stop the propagation of the focus and click events to prevent the panel from expanding/collapsing when using the action. You should also provide an `aria-label` for the action, otherwise the label of the nested action will be included in the label of the parent button that controls the accordion expansion.

{{"demo": "pages/components/accordion/ActionsInAccordionSummary.js", "bg": true}}

## Производительность

Содержимое Accordions монтируется по умолчанию, даже если панель не развернута. Это предопределенное поведение подразумевает рендеринг на стороне сервера и SEO. If you render expensive component trees inside your panels or simply render many panels it might be a good idea to change this default behavior by enabling the `unmountOnExit` in `TransitionProps`:

```jsx
<Accordion TransitionProps={{ unmountOnExit: true }} />
```

Как и при любой оптимизации производительности, не стоит переоценивать её. Сначала идентифицируйте узкие места и лишь затем пытайтесь применить эти стратегии.

## Подзаголовок и столбцы

Содержимое панели можно структурировать, сгруппировав его в отдельные столбцы, кроме того можно добавить подзаголовок и подсказки для пользователя.

{{"demo": "pages/components/accordion/DetailedAccordion.js", "bg": true}}

## Доступность

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#accordion)

Для оптимальной доступности мы рекомендуем установить `id` и `aria-controls` на `AccordionSummary`. `Accordion` унаследует необходимые `aria-labelbyby` и `id` для области содержимого панели.
