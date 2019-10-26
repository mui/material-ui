---
title: Composant React Grid List
components: GridList, GridListTile, GridListTileBar, ListSubheader, IconButton
---

# Grid list

<p class="description">Les listes de grille affichent une collection d'images dans une grille organisée.</p>

[Les listes de grille](https://material.io/design/components/image-lists.html) représentent une collection d'éléments dans un motif répété. Ils aident à améliorer la compréhension visuelle du contenu qu'ils contiennent.

## Grid list contenant uniquement des images

Un exemple simple d'image défilable `GridList`.

{{"demo": "pages/components/grid-list/ImageGridList.js", "hideEditButton": true}}

## Grid list avec barres de titre

Cet exemple illustre l'utilisation de `GridListTileBar` pour ajouter une superposition à chaque `GridListTile`. La superposition peut accueillir un `titre`, `sous - titre` et une action secondaire - dans cet exemple un `IconButton`.

{{"demo": "pages/components/grid-list/TitlebarGridList.js", "hideEditButton": true}}

## Grid List sur une ligne

Cet exemple illustre une grid list défilante horizontale d'images. Les listes de grille défilant horizontalement sont déconseillées car le défilement interfère avec les habitudes de lecture, ce qui affecte la compréhension. Une exception notable est la liste d'images comportant une seule ligne, telle qu'une galerie, qui défile horizontalement.

{{"demo": "pages/components/grid-list/SingleLineGridList.js", "hideEditButton": true}}

## Grid list avancée

Cet exemple montre des tuiles , en utilisant les `rows` et `cols`props pour ajuster la taille de la tuile, et le `padding` prop pour ajuster l'espacement. Les tuiles ont une barre de titre personnalisée, placée en haut et avec un dégradé personnalisé `titleBackground`. L'action secondaire `IconButton` est positionnée sur la gauche.

{{"demo": "pages/components/grid-list/AdvancedGridList.js", "hideEditButton": true, "defaultCodeOpen": false}}