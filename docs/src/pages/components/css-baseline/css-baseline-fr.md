---
components: CssBaseline
---

# Principes CSS

<p class="description">Material-UI fournit un composant CssBaseline pour relancer une base élégante, cohérente et simple sur laquelle s'appuyer.</p>

Vous connaissez peut-être [normalize.css](https://github.com/necolas/normalize.css), une collection d'éléments HTML et de normalisations de style d'attributs.

```jsx
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function MyApp() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* The rest of your application */}
    </React.Fragment>
  );
}
```

## Approche

### Page

The `<html>` and `<body>` elements are updated to provide better page-wide defaults. More specifically:

- La marge dans tous les navigateurs est supprimée.
- La couleur d'arrière-plan par défaut de Material Design est appliquée. It's using [`theme.palette.background.default`](/customization/default-theme/?expand-path=$.palette.background) for standard devices and a white background for print devices.

### Disposition

- la taille de la boîte `box-sizing` est définie globalement sur l'élément `<html>` à `border-box`. Chaque élément, y compris `* :: before` et `* :: after` est déclaré hériter de cette propriété, ce qui garantit que la largeur déclarée de l'élément n'est jamais dépassée en raison d'un remplissage ou d'une bordure.

### Typographie

- Aucune taille de police de base n’est déclarée sur le `<html>`, mais 16px est utilisée (valeur par défaut du navigateur). Vous pouvez en apprendre davantage sur les implications de l' évolution du `<html>` taille de la police par défaut dans [la documentation abordant les thèmes](/customization/typography/#typography-html-font-size) page.
- Set the `theme.typography.body2` style on the `<body>` element.
- Set the font-weight to "bolder" for the `<b>` and `<strong>` elements. Bolder is one font weight heavier than the parent element (among the available weights of the font).
- L'anticrénelage des polices est activé pour un meilleur affichage de la police Roboto.