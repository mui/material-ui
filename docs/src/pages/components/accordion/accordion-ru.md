---
title: Компонент React Accordion
components: Accordion, AccordionActions, AccordionDetails, AccordionSummary
githubLabel: 'component: Accordion'
materialDesign: https://material.io/archive/guidelines/components/expansion-panels.html
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#accordion'
---

# Accordion (панель расширения)

<p class="description">Панель расширения содержит потоки создания и позволяет легко редактировать элементы.</p>

[Accordion](https://material.io/archive/guidelines/components/expansion-panels.html) это простой контейнер, который может использоваться отдельно, либо как часть более крупного компонента, такого как Card (карточка).

{{"component": "modules/components/ComponentLinkHeader.js"}}

> **Note:** Expansion panels are no longer documented in the [Material Design guidelines](https://material.io/), but Material-UI will continue to support them. It was formerly known as the "expansion panel".

## Простая Accordion

{{"demo": "pages/components/accordion/SimpleAccordion.js", "bg": true}}

## Контролируемый аккордеон

Используя компонент `Accordion`, расширив его поведение по умолчанию, можно получить "аккордеон".

{{"demo": "pages/components/accordion/ControlledAccordions.js", "bg": true}}

## Customized accordions

Ниже находится пример кастомизации компонента. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/accordion/CustomizedAccordions.js"}}

## Производительность

Содержимое Accordions монтируется по умолчанию, даже если панель не развернута. Это предопределенное поведение подразумевает рендеринг на стороне сервера и SEO. If you render expensive component trees inside your panels or simply render many panels it might be a good idea to change this default behavior by enabling the `unmountOnExit` in `TransitionProps`:

```jsx
<Accordion TransitionProps={{ unmountOnExit: true }} />
```

Как и при любой оптимизации производительности, не стоит переоценивать её. Сначала идентифицируйте узкие места и лишь затем пытайтесь применить эти стратегии.

## Доступность

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#accordion)

Для оптимальной доступности мы рекомендуем установить `id` и `aria-controls` на `AccordionSummary`. `Accordion` унаследует необходимые `aria-labelbyby` и `id` для области содержимого панели.
