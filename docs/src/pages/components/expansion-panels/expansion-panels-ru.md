---
title: Панель расширения (Компонент React)
components: ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary
---

# Expansion Panel (панель расширения)

<p class="description">Панель расширения содержит потоки создания и позволяет легко редактировать элементы.</p>

[Expansion panel](https://material.io/archive/guidelines/components/expansion-panels.html) это простой контейнер, который может использоваться отдельно, либо как часть более крупного компонента, такого как Card (карточка).

> **Note:** Expansion panels are no longer documented in the [Material Design guidelines](https://material.io/), but Material-UI will continue to support them.

## Простая Expansion Panel

{{"demo": "pages/components/expansion-panels/SimpleExpansionPanel.js", "bg": true}}

## Контролируемый "Аккордеон"

Используя компонент `ExpansionPanel`, расширив его поведение по умолчанию, можно получить "аккордеон".

{{"demo": "pages/components/expansion-panels/ControlledExpansionPanels.js", "bg": true}}

## Customized expansion panels

Ниже находится пример кастомизации компонента. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/expansion-panels/CustomizedExpansionPanels.js"}}

## Additional actions

In order to put an action such as a `Checkbox` or a button inside of the `ExpansionPanelSummary`, you need to stop the propagation of the focus and click events to prevent the panel from expanding/collapsing when using the action. You should also provide an `aria-label` for the action, otherwise the label of the nested action will be included in the label of the parent button that controls the panel expansion.

{{"demo": "pages/components/expansion-panels/ActionsInExpansionPanelSummary.js", "bg": true}}

## Производительность

Содержимое ExpansionPanels монтируется по умолчанию, даже если панель не развернута. Это предопределенное поведение подразумевает рендеринг на стороне сервера и SEO. If you render expensive component trees inside your panels or simply render many panels it might be a good idea to change this default behavior by enabling the `unmountOnExit` in `TransitionProps`:

```jsx
<ExpansionPanel TransitionProps={{ unmountOnExit: true }} />
```

Как и при любой оптимизации производительности, не стоит переоценивать её. Сначала идентифицируйте узкие места и лишь затем пытайтесь применить эти стратегии.

## Подзаголовок и столбцы

Содержимое панели можно структурировать, сгруппировав его в отдельные столбцы, кроме того можно добавить подзаголовок и подсказки для пользователя.

{{"demo": "pages/components/expansion-panels/DetailedExpansionPanel.js", "bg": true}}

## Доступность

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#accordion)

Для оптимальной доступности мы рекомендуем установить `id` и `aria-controls` на `ExpansionPanelSummary`. `ExpansionPanel` унаследует необходимые `aria-labelbyby` и `id` для области содержимого панели.