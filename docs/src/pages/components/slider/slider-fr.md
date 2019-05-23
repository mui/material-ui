---
title: Slider React component
components: Slider
---

# Slider (curseur)

<p class="description">Les curseurs permettent aux utilisateurs d'effectuer des sélections à partir d'une plage de valeurs.</p>

[Les curseurs](https://material.io/design/components/sliders.html) reflètent une plage de valeurs sur une barre, à partir de laquelle les utilisateurs peuvent sélectionner une seule valeur. Ils sont idéaux pour ajuster des paramètres tels que le volume, la luminosité ou l'application de filtres d'images.

Les curseurs peuvent avoir des icônes sur les deux extrémités de la barre, qui correspondent à une plage de valeurs.

#### Effets immédiats

Les modifications apportées avec les curseurs sont immédiates, ce qui permet à l’utilisateur de faire des ajustements jusqu’à ce qu’il trouve sa préférence. They shouldn’t be paired with settings that have even minor delays in providing user feedback.

#### Current state

Sliders reflect the current state of the settings they control.

## Slider simple

{{"demo": "pages/components/slider/SimpleSlider.js"}}

## Curseur avec étapes

{{"demo": "pages/components/slider/StepSlider.js"}}

## Curseur désactivé

{{"demo": "pages/components/slider/DisabledSlider.js"}}

## Curseur vertical

{{"demo": "pages/components/slider/VerticalSlider.js"}}

## Curseurs personnalisés

Voici un exemple de personnalisation du composant. Vous pouvez en apprendre plus à ce sujet sur la [page de documentation de personnalisation](/customization/components/).

{{"demo": "pages/components/slider/CustomizedSlider.js"}}

## Custom thumb

{{"demo": "pages/components/slider/CustomIconSlider.js"}}

## Custom value reducer

{{"demo": "pages/components/slider/CustomValueReducerSlider.js"}}