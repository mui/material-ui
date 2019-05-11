---
title: Панель расширения (Компонент React)
components: ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary
---

# Expansion panels (Раскрывающиеся панели)

<p class="description">Панель расширения содержит потоки создания и позволяет легко редактировать элементы.</p>

[Expansion panel](https://material.io/archive/guidelines/components/expansion-panels.html) это простой контейнер, который может использоваться отдельно, либо как часть более крупного компонента, такого как Card (карточка).

> **Примечание:** компонента Expansion panel больше нет в документации по Material Design.

## Доступность

Для оптимальной доступности мы рекомендуем установить `id` и `aria-controls` на `ExpansionPanelSummary`. `ExpansionPanel` унаследует необходимые `aria-labelbyby` и `id` для области содержимого панели.

## Простая Expansion Panel

{{"demo": "pages/components/expansion-panels/SimpleExpansionPanel.js"}}

## Управляемый "Аккордеон"

Используя компонент `ExpansionPanel`, расширив его поведение по умолчанию, можно получить "аккордеон".

{{"demo": "pages/components/expansion-panels/ControlledExpansionPanels.js"}}

## Подзаголовок и столбцы

Содержимое панели можно структурировать, сгруппировав его в отдельные столбцы, кроме того можно добавить подзаголовок и подсказки для пользователя.

{{"demo": "pages/components/expansion-panels/DetailedExpansionPanel.js"}}

## Производительность

Содержимое ExpansionPanels монтируется по умолчанию, даже если панель не развернута. Это предопределенное поведение подразумевает рендеринг на стороне сервера и SEO. Если вы отображаете обширные деревья компонентов внутри ваших панелей или просто отображаете много панелей, было бы неплохо изменить это поведение по умолчанию, включив `unmountOnExit` в `TransitionProps`: `<ExpansionPanel TransitionProps={{ unmountOnExit: true }} />`. Как и при любой оптимизации производительности, не стоит переоценивать её. Сначала идентифицируйте узкие места и лишь затем пытайтесь применить эти стратегии.

## Customized expansion panels

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/expansion-panels/CustomizedExpansionPanels.js"}}