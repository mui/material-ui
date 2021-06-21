---
title: Компонент React Accordion
components: Accordion, AccordionActions, AccordionDetails, AccordionSummary
---

# Accordion

<p class="description">Аккордеоны содержат потоки создания и позволяют осуществить легковесное редактирование элемента.</p>

[Accordion](https://material.io/archive/guidelines/components/expansion-panels.html) это легковесный контейнер, который может использоваться отдельно или как часть более крупного компонента, такого как Card.

> **На заметку:** Аккордеоны больше не задокументированы в [руководствах Material Design](https://material.io/), но Material-UI будет продолжать поддерживать их. Ранее они были известны как "expansion panels".

## Простой аккордеон

{{"demo": "pages/components/accordion/SimpleAccordion.js", "bg": true}}

## Контролируемый аккордеон

Используя компонент `Accordion`, расширив его поведение по умолчанию, можно получить "аккордеон".

{{"demo": "pages/components/accordion/ControlledAccordions.js", "bg": true}}

## Настраиваемый аккордеон

Ниже находится пример кастомизации компонента. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/accordion/CustomizedAccordions.js"}}

## Действия внутри аккордеона

Чтобы предотвратить сворачивание/разворачивания аккордеона при нажатии на `Checkbox` или на кнопку внутри `AccordionSummary`, необходимо прервать всплытие событий нажатия и фокуса. Также вы должны указать `aria-label` для действий, иначе label действия будет включен в label кнопки разворачивания аккордеона.

{{"demo": "pages/components/accordion/ActionsInAccordionSummary.js", "bg": true}}

## Производительность

Содержимое аккордеонов монтируется по умолчанию, даже если панель не развернута. Это поведение подразумевает рендеринг на стороне сервера и SEO. Если внутри аккордеона находятся ресурсоемкие, для рендеринга, иерархии компонентов или просто на странице много аккордеонов, то возможно хорошей идеей будет изменить поведение по умолчанию включив `unmountOnExit` в `TransitionProps`:

```jsx
<Accordion TransitionProps={{ unmountOnExit: true }} />
```

Как и при любой оптимизации производительности, эта функция не панацея. Сначала идентифицируйте узкие места и лишь затем пытайтесь применить эти стратегии.

## Подзаголовок и столбцы

Содержимое панели можно структурировать, сгруппировав его в отдельные столбцы, кроме того можно добавить подзаголовок и подсказки для пользователя.

{{"demo": "pages/components/accordion/DetailedAccordion.js", "bg": true}}

## Доступность

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#accordion)

Для оптимальной доступности мы рекомендуем установить `id` и `aria-controls` на `AccordionSummary`. `Accordion` унаследует необходимые `aria-labelbyby` и `id` для области содержимого панели.
