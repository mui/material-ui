---
title: Button React component
components: Button, Fab, IconButton, ButtonBase, Zoom
---
# Кнопки

<p class="description">Кнопки позволяют пользователям выполнять действия и делать выбор одним нажатием.</p>

[Кнопки](https://material.io/design/components/buttons.html) сообщают о действиях, которые могут выполнять пользователи. Они обычно размещаются в вашем интерфейсе, например:

- Dialogs
- Всплывающие окно
- Формы
- Карты
- Панели инструментов

## Блочные кнопки

[Блочные кнопки](https://material.io/design/components/buttons.html#contained-button) имеют высокий акцент, отличаются использованием возвышения и заполнения. Они содержат действия, которые являются основными для вашего приложения.

Этот пример показывает, как использовать кнопку загрузки.

{{"demo": "pages/demos/buttons/ContainedButtons.js"}}

## Текстовые кнопки

[Текстовые кнопки](https://material.io/design/components/buttons.html#text-button) обычно используются для менее выраженных действий, в том числе расположенных:

- В диалогах
- В cards

В Cards текстовые кнопки помогают сохранить акцент на содержании карточки.

{{"demo": "pages/demos/buttons/TextButtons.js"}}

## Контурные кнопки

[Контурные кнопки](https://material.io/design/components/buttons.html#outlined-button) - это кнопки со средним акцентом. Они содержат действия, которые важны, но не являются основными действиеми в приложении.

### Альтернатива

Выделенные кнопки также являются альтернативой выделенным кнопкам или более высокая альтернатива текстовым кнопкам.

{{"demo": "pages/demos/buttons/OutlinedButtons.js"}}

## Плавающие кнопки действий

[Плавающие кнопки действий](https://material.io/design/components/buttons-floating-action-button.html) выполняет основное или наиболее распространенное действие на экране. Они отображаются над всем содержимым экрана, обычно в виде круглой формы со значком в центре. FABs бывают двух типов: обычные и расширенные.

Используйте плавающую кнопку действий (FAB) только в том случае, если это наиболее подходящий способ представить основное действие экрана.

Для отображения наиболее распространенных действий рекомендуется использовать только одну кнопку с плавающим действием.

{{"demo": "pages/demos/buttons/FloatingActionButtons.js"}}

По умолчанию анимация кнопки с плавающим действием на экране является expanding.

Кнопка с плавающим действием, которая охватывает несколько боковых экранов (например, экраны с вкладками), должна анимироватьза при пререходах.

Переход Zoom может быть использован для достижения этой цели. Обратите внимание, что так как выход и вход анимации запускаются одновременно, мы используем ` enterDelay `, чтобы разрешить исходящим кнопкам плавающего действия анимироватьза постепенно.

{{"demo": "pages/demos/buttons/FloatingActionButtonZoom.js"}}

## Размеры

Хотите изменить размеры? Используйте параметр `size`.

{{"demo": "pages/demos/buttons/ButtonSizes.js"}}

## Кнопки с иконками и текстом

Иногда вы можете захотеть добавить текст для определенной кнопки, чтобы улучшить UX, поскольку мы распознаем логотипы легче, чем обычный текст. Например, если у вас есть кнопка удаления, вы можете пометить ее значком мусорной корзины.

{{"demo": "pages/demos/buttons/IconLabelButtons.js"}}

## Кнопки с иконками

Кнопки с иконками обычно находятся на панелях навигации и на панелях инструментов.

Icons are also appropriate for toggle buttons that allow a single choice to be selected or deselected, such as adding or removing a star to an item.

{{"demo": "pages/demos/buttons/IconButtons.js"}}

## Индивидуальные кнопки

Если вы читали [overrides documentation page](/customization/overrides/) но вы не уверены, вот примеры того, как вы можете изменить основной цвет кнопки, используя классы, и используя тему; и кнопки в стиле Bootstrap.

⚠️ While the material design specification encourages theming, these examples are off the beaten path.

{{"demo": "pages/demos/buttons/CustomizedButtons.js"}}

## Complex Buttons

The Text Buttons, Contained Buttons, Floating Action Buttons and Icon Buttons are built on top of the same component: the `ButtonBase`. You can take advantage of this lower level component to build custom interactions.

{{"demo": "pages/demos/buttons/ButtonBases.js"}}

## Third-party routing library

One common use case is to use the button to trigger a navigation to a new page. The `ButtonBase` component provides a property to handle this use case: `component`. Given that a lot of our interactive components rely on `ButtonBase`, you should be able to take advantage of it everywhere:

```jsx
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

<Button component={Link} to="/open-collective">
  Link
</Button>
```

or if you want to avoid properties collision:

```jsx
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

const MyLink = props => <Link to="/open-collective" {...props} />

<Button component={MyLink}>
  Link
</Button>
```

*Note: Creating `MyLink` is necessary to prevent unexpected unmounting. You can read more about it in our [component property guide](/guides/composition/#component-property).*