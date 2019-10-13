---
title: Composant React de barre d'application
components: AppBar, Toolbar, Menu
---

# App Bar (Barre d'application)

<p class="description">La barre d'application affiche des informations et des actions relatives à l'écran actuel.</p>

[La barre d'application](https://material.io/design/components/app-bars-top.html) de la page fournit le contenu et les actions liés à l'écran actuel. Il est utilisé pour la marque, les titres d'écran, la navigation et les actions.

Il peut se transformer en une barre d’action contextuelle ou en tant que barre de navigation.

## Barre d'application simple

{{"demo": "pages/components/app-bar/ButtonAppBar.js"}}

## Barre d'application avec champ de recherche principal

Une barre de recherche principale.

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js"}}

## Barre d'application avec menu

{{"demo": "pages/components/app-bar/MenuAppBar.js"}}

## Barre d'application avec champ de recherche

Une barre de recherche latérale.

{{"demo": "pages/components/app-bar/SearchAppBar.js"}}

## Dense (desktop only)

{{"demo": "pages/components/app-bar/DenseAppBar.js"}}

## Prominent

A prominent app bar.

{{"demo": "pages/components/app-bar/ProminentAppBar.js"}}

## Bottom App Bar

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 500}}

## Fixed placement

When you render the app bar position fixed, the dimension of the element doesn't impact the rest of the page. This can cause some part of your content to be invisible, behind the app bar. Here are 3 possible solutions:

1. You can use `position="sticky"` instead of fixed. ⚠️ sticky is not supported by IE 11.
2. You can render a second `<Toolbar />` component:

```jsx
function App() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
```

3. You can use `theme.mixins.toolbar` CSS:

```jsx
const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
}))

function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </React.Fragment>
  )
};
```

## Scrolling

You can use the `useScrollTrigger()` hook to respond to user scroll actions.

### Barre d'application masquable

The app bar hides on scroll down to leave more space for reading.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": true, "maxWidth": 500}}

### Barre d'application élevable

The app bar elevates on scroll to communicate that the user is not at the top of the page.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": true, "maxWidth": 500}}

### Back to top

A floating action buttons appears on scroll to make it easy to get back to the top of the page.

{{"demo": "pages/components/app-bar/BackToTop.js", "iframe": true, "maxWidth": 500}}

### `useScrollTrigger([options]) => trigger`

#### Paramètres

1. `options` (*Object* [optional]):

- `options.disableHysteresis` (*Boolean* [optional]): Valeur par défaut `false`. Désactive l'hystérésis. Ignore le sens de défilement lors de la détermination de la valeur `trigger`.
- `options.target` (*Node* [optional]): Valeur par défaut `window`.
- `options.threshold` (*Nombre* [optional]): Valeur par défaut `100`. Modifier la valeur de `déclenchement` quand lorsque le défilement vertical dépasse strictement ce seuil (exclusif).

#### Valeur de retour

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