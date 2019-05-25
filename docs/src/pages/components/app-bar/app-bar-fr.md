---
title: Composant React de barre d'application
components: AppBar, Toolbar, Menu
---

# App Bar (Barre d'application)

<p class="description">La barre d'application affiche des informations et des actions relatives à l'écran actuel.</p>

[La barre d'application](https://material.io/design/components/app-bars-top.html) de la page fournit le contenu et les actions liés à l'écran actuel. Il est utilisé pour la marque, les titres d'écran, la navigation et les actions.

Il peut se transformer en une barre d’action contextuelle ou en tant que barre de navigation.

## Boutons de la barre d’application

{{"demo": "pages/components/app-bar/ButtonAppBar.js"}}

## Barre d'application simple

{{"demo": "pages/components/app-bar/SimpleAppBar.js"}}

## Barre d'application avec un champ de recherche principal

Une barre de recherche principale.

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js"}}

## La barre d'application avec le menu

{{"demo": "pages/components/app-bar/MenuAppBar.js"}}

## Barre d'application avec champ de recherche

Une barre de recherche latérale.

{{"demo": "pages/components/app-bar/SearchAppBar.js"}}

## Dense (bureau uniquement)

{{"demo": "pages/components/app-bar/DenseAppBar.js"}}

## Barre inférieure

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 500}}

## Défilement

### Barre d'application masquable

Une barre d'application qui se masque au défilement.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": "true", "maxWidth": 500}}

### Barre d'application élevable

Une barre d’application qui s’élève au défilement.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": "true", "maxWidth": 500}}

### `useScrollTrigger([options]) => trigger`

#### Paramètres

1. `options` (*Object* [optional]):
    
    - `options.disableHysteresis` (*Boolean* [optional]): Valeur par défaut `false`. Désactive l'hystérésis. Ignore le sens de défilement lors de la détermination de la valeur `trigger`.
    - `options.target` (*Node* [optional]): Valeur par défaut `window`.
    - `options.threshold` (*Number* [optional]): la valeur par défaut est `100`. Modifiez la valeur `trigger` lorsque le défilement vertical dépasse strictement ce seuil (exclusif).

#### Valeur de retour

`trigger`: Est-ce que la position de défilement respecte les critères ?

#### Exemples

```jsx
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

function HideOnScroll(props) {
  const trigger = useScrollTrigger();
  return (
    <Slide in={!trigger}>
      <div>Hello</div>
    </Slide>
  );
}
```