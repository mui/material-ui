---
title: Компонент React Typography
components: Typography
---

# Typography

<p class="description">Используйте оформление для максимально четкого и эффективного представления своего дизайна и содержания.</p>

Слишком много типов размеров и стилей одновременно могут портить любой макет. [Типографический масштаб](https://material.io/design/typography/#type-scale) имеет ограниченный набор размеров типов, которые хорошо работают вместе с макетной сеткой.

## Основное

Шрифт *Roboto* **не будет** автоматически загружен в Material-UI. Разработчик отвечает за загрузку всех шрифтов, используемых в его приложении. Есть несколько простых способов начать использование шрифта Roboto. Для более продвинутой конфигурации ознакомьтесь с [разделом настроек темы](/customization/typography/).

## Шрифт Roboto через CDN

Ниже показан пример HTML-разметки, используемой для загрузки шрифта Roboto с CDN:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

## Установка используя npm

Вы можете [установить его](https://www.npmjs.com/package/fontsource-roboto) набрав команду ниже в терминале:

`npm install fontsource-roboto`

Затем вы можете импортировать его в вашу точку входа.

```js
import 'fontsource-roboto';
```

Для получения дополнительной информации ознакомьтесь с [Fontsource](https://github.com/DecliningLotus/fontsource/blob/master/packages/roboto/README.md).

⚠️ Будьте осторожны при использовании этого подхода. Убедитесь, что ваш сборщик не загружает все вариации шрифта (100/300/400/500/700/900, italic/regular, SVG/woff). Fontsource может быть настроен на загрузку определенных подмножеств, жирности и стилей. Включение всех файлов шрифтов может значительно увеличить размер вашего итогового файла. Стандартная конфигурация оформления в стиле Material-UI зависит только от жирности шрифта: 300, 400, 500 и 700.

## Компоненты

{{"demo": "pages/components/typography/Types.js"}}

## Темы

В некоторых ситуациях вы не сможете использовать компонент `Typography`. Надеемся, что вы сможете воспользоваться ключами свойства темы [`typograpthy`](/customization/default-theme/?expand-path=$.typography).

{{"demo": "pages/components/typography/TypographyTheme.js"}}

## Изменение семантического элемента

Компонент `Typography` использует свойство `variantMapping`, чтобы связать вариант интерфейса с семантическим элементом. Важно понимать, что стиль оформления не зависит от исходного семантического элемента.

- Вы можете изменить лежащий в основе элемент один раз с помощью свойства `component`:

```jsx
Heading
</Typography> {/* There is already an h1 in the page, let's not duplicate it. */}
<Typography variant="h1" component="h2">
  h1. Заголовок
</Typography>
```

- Вы можете изменить сопоставление вариантов [глобально используя тему](/customization/globals/#default-props):

```js
const theme = createMuiTheme({
  props: {
    MuiTypography: {
      variantMapping: {
        h1: 'h2',
        h2: 'h2',
        h3: 'h2',
        h4: 'h2',
        h5: 'h2',
        h6: 'h2',
        subtitle1: 'h2',
        subtitle2: 'h2',
        body1: 'span',
        body2: 'span',
      },
    },
  },
});
```

## Доступность

Несколько ключевых факторов для доступности оформления:

- **Цвет**. Предоставьте достаточный уровень контраста между текстом и его фоном, проверьте минимально рекомендованное [WCAG 2.0 цветовое соотношение контраста](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) (4.5:1).
- **Размер шрифта**. Используйте [относительные единицы (rem)](/customization/typography/#font-size) для соответствия настройкам пользователя.
- **Иерархия заголовков**. [Не пропускайте](https://www.w3.org/WAI/tutorials/page-structure/headings/) уровни заголовков. Чтобы решить эту задачу, вам нужно [отделить семантику от стиля](#changing-the-semantic-element).