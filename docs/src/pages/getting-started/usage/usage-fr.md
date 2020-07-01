# Utilisation

<p class="description">Commencez rapidement avec React et Material-UI.</p>

Les composants Material-UI fonctionnent de manière isolée. **They are self-supporting**, and will only inject the styles they need to display. Ils ne s'appuient sur aucune feuille de style globale telle que [normalize.css](https://github.com/necolas/normalize.css/).

Vous pouvez utiliser n'importe lequel des composants comme indiqué dans la documentation. Veuillez vous référer à chaque [page de démonstration](/components/buttons/) pour voir comment les composants doivent être importés.

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

Oui, c'est tout ce dont vous avez besoin pour commencer, comme vous pouvez le voir dans cette démo en direct et interactive :

{{"demo": "pages/getting-started/usage/Usage.js", "hideToolbar": true, "bg": true}}

## Variables globales

L'expérience d'utilisation de Material-UI peut être améliorée avec une poignée d'importants globaux que vous devez connaître.

### La balise meta responsive design (vue adaptative)

Pour que le rendu et le zoom tactile soient corrects pour tous les périphériques, ajoutez la balise meta viewport à votre élément `<head>`. Material-UI is developed mobile-first, a strategy in which we first write code for mobile devices, and then scale up components as necessary using CSS media queries.

```html
<meta
  name="viewport"
  content="minimum-scale=1, initial-scale=1, width=device-width"
/>
```

### CssBaseline

Material-UI fournit un composant [CssBaseline](/components/css-baseline/) facultatif. It fixes some inconsistencies across browsers and devices while providing slightly more opinionated resets to common HTML elements.

## Documentation versionnée

Cette documentation reflète toujours la dernière version stable de Material-UI. Vous pouvez trouver les anciennes versions de la documentation sur une [page séparée](https://material-ui.com/versions/).

## Etapes suivantes

Maintenant que vous avez une idée de la configuration de base, il est temps d'en apprendre d'avantage sur :

- Comment fournir [la police et la typographie Material Design](/components/typography/) .
- Comment tirer parti de la [solution de thème](/customization/theming/).
- Comment [modifier](/customization/components/), l'apparence des composants.