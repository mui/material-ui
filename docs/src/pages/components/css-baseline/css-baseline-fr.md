---
components: CssBaseline
---

# Principes CSS

<p class="description">Material-UI fournit un composant CssBaseline pour relancer une base élégante, cohérente et simple sur laquelle s'appuyer.</p>

Vous connaissez peut-être [normalize.css](https://github.com/necolas/normalize.css), une collection d'éléments HTML et de normalisations de style d'attributs.

```jsx
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

function MyApp() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* The rest of your application */}
    </React.Fragment>
  );
}

export default MyApp;
```

## Approche

### Page

Les éléments `<html>` et `<body>` sont mis à jour pour fournir de meilleurs paramètres par défaut pour l'ensemble de la page. Plus précisément:

- La marge dans tous les navigateurs est supprimée.
- La couleur d'arrière-plan par défaut de Material Design est appliquée. Ceci est réalisé à l'aide de [`thème.la palette.arrière-plan.par défaut`](/customization/default-theme/?expend-path=$.palette.background) pour les appareils standard et un fond blanc pour les périphériques d'impression.

### Disposition

- la taille de la boîte `box-sizing` est définie globalement sur l'élément `<html>` à `border-box`. Chaque élément, y compris `* :: before` et `* :: after` est déclaré hériter de cette propriété, ce qui garantit que la largeur déclarée de l'élément n'est jamais dépassée en raison d'un remplissage ou d'une bordure.

### Typographie

- L'anticrénelage des polices est activé pour un meilleur affichage de la police Roboto.
- Aucune taille de police de base n’est déclarée sur le `<html>`, mais 16px est utilisée (valeur par défaut du navigateur). Vous pouvez en apprendre davantage sur les implications de l' évolution du `<html>` taille de la police par défaut dans [la documentation abordant les thèmes](/customization/typography/#typography-html-font-size) page.