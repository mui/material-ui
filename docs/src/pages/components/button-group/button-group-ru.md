---
title: Компонент React ButtonGroup
components: Button, ButtonGroup
githubLabel: 'component: ButtonGroup'
---

# Группа кнопок

<p class="description">Компонент ButtonGroup можно использовать для группирования связанных кнопок.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Базовые свойства кнопок

The standard Button variants are supported.

{{"demo": "pages/components/button-group/BasicButtonGroup.js"}}

## Sizes and colors

The `size` and `color` props can be used to control the appearance of the ButtonGroup.

{{"demo": "pages/components/button-group/GroupSizesColors.js"}}

## Vertical group

The ButtonGroup can be displayed veritcally using the `orientation` prop.

{{"demo": "pages/components/button-group/GroupOrientation.js"}}

## Split button

`ButtonGroup` can also be used to create a split button. Выпадающий список может изменить действие кнопки (как в этом примере), или использоваться для немедленного вызова действия.

{{"demo": "pages/components/button-group/SplitButton.js"}}

## Disabled elevation

Вы можете убрать эффект "всплытия" с помощью пропа `disableElevation`.

{{"demo": "pages/components/button-group/DisableElevation.js"}}
