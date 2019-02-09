# Utilisation

<p class="description">Commencez rapidement avec React et Material-UI.</p>

Les composants Material-UI fonctionnent de manière isolée. **Ils sont auto-soutien**, ils d'injecter, et seulement injecter, les styles nécessaires. They don't rely on any global style-sheets such as [normalize.css](https://github.com/necolas/normalize.css/).

Vous pouvez utiliser n'importe lequel des composants comme indiqué dans la documentation. Veuillez vous référer à chaque [page de démonstration](/demos/buttons/) pour voir comment les composants doivent être importés.

## Démarrage rapide

Voici un exemple rapide pour vous aider à commencer, **c'est tout ce dont vous avez besoin** :

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

Yes, this really is all you need to get started, as you can see in this live and interactive demo:

{{"demo": "pages/getting-started/usage/Usage.js", "hideHeader": true}}

## Variables globales

Material-UI usage experience can be improved with a handful of important globals that you’ll need to be aware of.

### Responsive meta tag

Material-UI is developed mobile first, a strategy in which we first write code for mobile devices and then scale up components as necessary using CSS media queries. To ensure proper rendering and touch zooming for all devices, add the responsive viewport meta tag to your `<head>` element.

```html
<meta
  name="viewport"
  content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no">
```

### CssBaseline

Material-UI provides an optional [CssBaseline](/style/css-baseline/) component. It's fixing some inconsistencies across browsers and devices while providing slightly more opinionated resets to common HTML elements.

## Versioned Documentation

This documentation always reflects the latest stable version of Material-UI. You can find older versions of the documentation on a [separate page](/versions/).

## Etapes suivantes

Maintenant que vous avez une idée de la configuration de base, il est temps d'en apprendre d'avantage sur:

- How to provide [the Material Design font and typography](/style/typography/).
- Comment tirer parti de la [solution de thème](/customization/themes/).
- How to [override](/customization/overrides/) the look and feel of the components.