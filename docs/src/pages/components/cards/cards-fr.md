---
title: Composant React Carte
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
---

# Cards (Cartes)

<p class="description">Les cartes contiennent du contenu et des actions sur un seul sujet.</p>

[cartes](https://material.io/design/components/cards.html) sont des surfaces qui affichent du contenu et des actions sur un seul sujet.

They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.

## Carte simple

Bien que les cartes puissent prendre en charge plusieurs actions, des contrôles de l'interface utilisateur et un menu de dépassement, utilisez la retenue et rappelez-vous que les cartes sont des points d'entrée pour des informations plus complexes et détaillées.

{{"demo": "pages/components/cards/SimpleCard.js", "bg": true}}

## Interaction complexe

Sur le bureau, le contenu de la carte peut s’étendre.

{{"demo": "pages/components/cards/RecipeReviewCard.js", "bg": true}}

## Média

Exemple de carte utilisant une image pour renforcer le contenu.

{{"demo": "pages/components/cards/MediaCard.js", "bg": true}}

Par défaut, nous utilisons la combinaison d'un élément `<div>` et *background-image* pour afficher le support. Cela peut être problématique dans certaines situations. Par exemple, vous voudrez peut-être afficher une vidéo ou une image sensible. Utilisez la propriété `component` pour ces cas d'utilisation:

{{"demo": "pages/components/cards/ImgMediaCard.js", "bg": true}}

> ⚠️ When `component="img"`, CardMedia relies on `object-fit` for centering the image. It's not supported by IE 11.

## Contrôles d'UI

Les actions supplémentaires au sein de la carte sont explicitement appelées à l'aide d'icônes, de texte et de contrôles d'interface utilisateur, généralement placés au bas de la carte.

Voici un exemple de carte de contrôle multimédia.

{{"demo": "pages/components/cards/MediaControlCard.js", "bg": true}}