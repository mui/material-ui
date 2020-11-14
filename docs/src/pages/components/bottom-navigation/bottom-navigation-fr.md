---
title: Composant React de navigation inférieure
components: BottomNavigation, BottomNavigationAction
---

# Bottom Navigation (Barre de navigation inférieure)

<p class="description">Les barres de navigation inférieures permettent de se déplacer entre les destinations principales dans une application.</p>

[Les barres de navigation du bas](https://material.io/design/components/bottom-navigation.html) affichent trois à cinq destinations au bas d'un écran. Chaque destination est représentée par une icône et une étiquette de texte optionnelle. Lorsqu'une icône de navigation en bas de page est enfoncée, l'utilisateur est dirigé vers la destination de navigation de niveau supérieur associée à cette icône.

## Bottom Navigation (Barre de navigation inférieure)

Lorsqu'il n'y a que **trois actions** , afficher à la fois les icônes et les libellés de texte en tout temps.

{{"demo": "pages/components/bottom-navigation/SimpleBottomNavigation.js", "bg": true}}

## Navigation du bas sans étiquette

S'il y a **quatre actions** ou **cinq actions** , afficher les vues inactives uniquement sous forme d'icônes.

{{"demo": "pages/components/bottom-navigation/LabelBottomNavigation.js", "bg": true}}