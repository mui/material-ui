---
title: Composant React Grid List
components: ImageList, ImageListItem, ImageListItemBar
materialDesign: https://material.io/components/image-lists
githubLabel: 'component: ImageList'
---

# Grid list

<p class="description">Les listes de grille affichent une collection d'images dans une grille organisée.</p>

[Les listes de grille](https://material.io/design/components/image-lists.html) représentent une collection d'éléments dans un motif répété. Ils aident à améliorer la compréhension visuelle du contenu qu'ils contiennent.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Grid list contenant uniquement des images

Standard image lists are best for items of equal importance. They have a uniform container size, ratio, and spacing.

{{"demo": "pages/components/image-list/StandardImageList.js"}}

## Grid list avec barres de titre

Quilted image lists emphasize certain items over others in a collection. They create hierarchy using varied container sizes and ratios.

{{"demo": "pages/components/image-list/QuiltedImageList.js"}}

## Grid List sur une ligne

Woven image lists use alternating container ratios to create a rhythmic layout. A woven image list is best for browsing peer content.

{{"demo": "pages/components/image-list/WovenImageList.js"}}

## Grid list avancée

Masonry image lists use dynamically sized container heights that reflect the aspect ratio of each image. This image list is best used for browsing uncropped peer content.

{{"demo": "pages/components/image-list/MasonryImageList.js"}}

## Image list with title bars

Cet exemple illustre l'utilisation de `ImageListItemBar` pour ajouter une superposition à chaque `ImageListItem`. La superposition peut accueillir un `titre`, `sous - titre` et une action secondaire - dans cet exemple un `IconButton`.

{{"demo": "pages/components/image-list/TitlebarImageList.js"}}

### Title bar below image (standard)

The title bar can be placed below the image.

{{"demo": "pages/components/image-list/TitlebarBelowImageList.js"}}

### Title bar below image (masonry)

{{"demo": "pages/components/image-list/TitlebarBelowMasonryImageList.js"}}

## Custom image list

Les tuiles ont une barre de titre personnalisée, placée en haut et avec un dégradé personnalisé `titleBackground`. L'action secondaire `IconButton` est positionnée sur la gauche. Les tuiles ont une barre de titre personnalisée, placée en haut et avec un dégradé personnalisé `titleBackground`.

{{"demo": "pages/components/image-list/CustomImageList.js", "defaultCodeOpen": false}}
