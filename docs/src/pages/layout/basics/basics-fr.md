# Bases

<p class="description">Les layouts Material Design encouragent à la cohérence entre les plate-formes, environnements et tailles d'écran en utilisant des éléments et des espacements uniformes.</p>

## UI responsive

Les [layouts responsive](https://material.io/design/layout/responsive-layout-grid.html) Material Design s'adaptent à toutes les tailles d'écran possibles. Nous fournissons les helpers suivants pour rendre l'UI responsive :

- [Grid](/layout/grid/) : La grille crée une cohérence visuelle entre les layouts tout en permettant une certaine flexibilité pour une large variété de designs ;
- [Breakpoints](/layout/breakpoints/) : Nous fournissons une API bas niveau qui permet l'utilisation de breakpoints dans de nombreux contextes ;
- [useMediaQuery](/layout/use-media-query/) : Ceci est un hook media query CSS pour React ;
- [Hidden](/layout/hidden/) : ce composant peut être utilisé pour modifier la visibilité des éléments.

## z-index

De nombreux composants Material-UI utilisent `z-index`, la propriété CSS qui aide à contrôler le layout en fournissant un troisième axe pour organiser le contenu. Nous utilisons une échelle de z-index par défaut dans Material-UI qui a été conçue pour superposer proprement les menus, modales, snackbars, tooltips, etc...

[Ces valeurs](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/styles/zIndex.js) commencent à un nombre arbitraire, élevé et suffisamment spécifique pour idéalement éviter les conflits.

- mobile stepper: 1000
- app bar: 1100
- drawer: 1200
- modal: 1300
- snackbar: 1400
- tooltip: 1500

Ces valeurs peuvent être personnalisées. Vous les trouverez dans le thème à la clé [`z-index`](/customization/default-theme/?expend-path=$.zIndex). Nous n'encourageons pas la personnalisation de valeurs individuelles ; si vous devez en modifiez une, vous devrez très probablement les modifier toutes.