---
title: Composant React de navigation inférieure
components: BottomNavigation, BottomNavigationAction
githubLabel:
  component: BottomNavigation
materialDesign: https://material.io/components/bottom-navigation
---

# Bottom Navigation (Barre de navigation inférieure)

<p class="description">Les barres de navigation inférieures permettent de se déplacer entre les destinations principales dans une application.</p>

[La barre de navigation inférieure](https://material.io/design/components/bottom-navigation.html) affichage de trois à cinq destinations au bas de l'écran. Chaque destination est représentée par une icône et une étiquette de texte optionnelle. Lorsqu'une icône de navigation en bas de page est enfoncée, l'utilisateur est dirigé vers la destination de navigation de niveau supérieur associée à cette icône.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Bottom Navigation (Barre de navigation inférieure)

Si il y a **quatre** ou **cinq** actions, affichage inactif points de vue uniquement sous forme d'icônes.

{{"demo": "pages/components/bottom-navigation/SimpleBottomNavigation.js", "bg": true}}

## Navigation du bas sans étiquette

S'il y a **quatre actions** ou **cinq actions** , afficher les vues inactives uniquement sous forme d'icônes.

{{"demo": "pages/components/bottom-navigation/LabelBottomNavigation.js", "bg": true}}

## Fixed positioning

This demo keeps bottom navigation fixed to the bottom, no matter the amount of content on-screen.

{{"demo": "pages/components/bottom-navigation/FixedBottomNavigation.js", "bg": true, "iframe": true, "maxWidth": 600}}
