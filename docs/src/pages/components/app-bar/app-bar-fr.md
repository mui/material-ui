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

## Simple barre d'Application

{{"demo": "pages/components/app-bar/SimpleAppBar.js"}}

## Barre d'application avec un champ de recherche principal

Une barre de recherche principale.

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js"}}

## La barre d'application avec le menu

{{"demo": "pages/components/app-bar/MenuAppBar.js"}}

## Barre d'applications avec champ de recherche

Une barre de recherche latérale.

{{"demo": "pages/components/app-bar/SearchAppBar.js"}}

## Dense (bureau uniquement)

{{"demo": "pages/components/app-bar/DenseAppBar.js"}}

## Barre inférieure

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 500}}

## Scrolling

### Hide App Bar

An App Bar that hides on scroll.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": "true", "maxWidth": 500}}

### Elevate App Bar

An App Bar that elevates on scroll.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": "true", "maxWidth": 500}}

### `useScrollTrigger([options]) => trigger`

#### Arguments

1. `options` (*Object* [optional]):

- `options.disableHysteresis` (*Boolan* [optional]): Defaults to `false`. Disable the hysteresis. Ignore the scroll direction when determining the `trigger` value.
- `options.target` (*Node* [optional]): Defaults to `window`.
- `options.threshold` (*Number* [optional]): Defaults to `100`. Change the `trigger` value when the vertical scroll crosses this threshold.

#### Returns

`trigger`: Does the scroll position match the criteria?

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