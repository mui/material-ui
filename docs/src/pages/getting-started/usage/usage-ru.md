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

{{"demo": "pages/getting-started/usage/Usage.js", "hideHeader": true}}

## Глобальная настройка

Material-UI usage experience can be improved with a handful of important globals that you’ll need to be aware of.

### Responsive meta tag

Material-UI is developed mobile first, a strategy in which we first write code for mobile devices and then scale up components as necessary using CSS media queries. To ensure proper rendering and touch zooming for all devices, add the responsive viewport meta tag to your `<head>` element.

```html
<meta
  name="viewport"
  content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
/>
```

### CssBaseline

Material-UI provides an optional [CssBaseline](/components/css-baseline/) component. It fixes some inconsistencies across browsers and devices while providing slightly more opinionated resets to common HTML elements.

## Versioned Documentation

This documentation always reflects the latest stable version of Material-UI. You can find older versions of the documentation on a [separate page](/versions/).

## Next steps

Now that you have an idea of the basic setup, it's time to learn more about:

- How to provide [the Material Design font and typography](/components/typography/).
- How to take advantage of the [theming solution](/customization/themes/).
- How to [override](/customization/components/) the look and feel of the components.