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

Опыт использования Material-UI может быть улучшен с помощью ряда важных глобальных настроек, о которых вам нужно знать.

### Responsive meta tag

Material-UI сначала разрабатывается для мобильных устройств - подход, при котором мы сначала пишем код для мобильных устройств, а затем масштабируем компоненты по мере необходимости, используя медиазапросы CSS. Чтобы обеспечить правильный рендеринг и масштабирование касанием для всех устройств, добавьте метатег реагирующего окна просмотра в элемент 

<head>
  .</p> 
  
  <pre><code class="html">&lt;meta
  name="viewport"
  content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
/&gt;
</code></pre>
  
  <h3>
    CssBaseline
  </h3>
  
  <p>
    Material-UI provides an optional <a href="/components/css-baseline/">CssBaseline</a> component. It fixes some inconsistencies across browsers and devices while providing slightly more opinionated resets to common HTML elements.
  </p>
  
  <h2>
    Versioned Documentation
  </h2>
  
  <p>
    This documentation always reflects the latest stable version of Material-UI. You can find older versions of the documentation on a <a href="/versions/">separate page</a>.
  </p>
  
  <h2>
    Next steps
  </h2>
  
  <p>
    Now that you have an idea of the basic setup, it's time to learn more about:
  </p>
  
  <ul>
    <li>
      How to provide <a href="/components/typography/">the Material Design font and typography</a>.
    </li>
    <li>
      How to take advantage of the <a href="/customization/themes/">theming solution</a>.
    </li>
    <li>
      How to <a href="/customization/components/">override</a> the look and feel of the components.
    </li>
  </ul>