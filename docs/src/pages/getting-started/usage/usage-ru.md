# Использование

<p class="description">Начните работу с React и Material-UI в кратчайшие сроки.</p>

Компоненты Material-UI работают изолированно. **Они самодостаточны** и внедрят только те стили, которые им нужны для отображения. Они не зависят от каких-либо глобальных стилей, таких как [ normalize.css ](https://github.com/necolas/normalize.css/).

Вы можете использовать любой из компонентов, как показано в документации. Пожалуйста, обратитесь к [демо-странице](/components/buttons/) каждого компонента, чтобы увидеть, как они должны быть импортированы.

## Быстрый старт

Вот краткий пример для начала, **это буквально все что вам нужно**:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

function App() {
  return (
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Да, это действительно все, что вам нужно для начала, как вы можете увидеть в этой интерактивной демонстрации:

{{"demo": "pages/getting-started/usage/Usage.js", "hideToolbar": true, "bg": true}}

## Глобальная настройка

Опыт использования Material-UI может быть улучшен с помощью ряда важных глобальных настроек, о которых вам нужно знать.

### Responsive meta tag

Чтобы обеспечить правильный рендеринг и масштабирование касанием для всех устройств, добавьте метатег реагирующего окна просмотра в элемент `<head>`. Material-UI разработан используя подход Mobile First, согласно которому мы сначала пишем код для мобильных устройств, затем мастштабируем компоненты по мере необходимости, используя медиа-запросы CSS.

```html
<meta
  name="viewport"
  content="minimum-scale=1, initial-scale=1, width=device-width"
/>
```

### CssBaseline

Material-UI предоставляет опциональный компонент [CssBaseline](/components/css-baseline/). Он исправляет некоторые несоответствия между браузерами и устройствами, обеспечивая несколько более упорядоченный сброс стилей HTML элементов.

## Версионная документация

Данная документация всегда отражает последнюю стабильную версию Material-UI. You can find older versions of the documentation on a [separate page](https://material-ui.com/versions/).

## Дальнейшие шаги

Теперь, когда у вас есть представление о базовых настройках, можно узнать больше:

- Как предоставить [шрифт и оформление Material Design](/components/typography/).
- Как воспользоваться [механизмом тем](/customization/theming/).
- Как [переопределить](/customization/components/) внешний вид компонентов.