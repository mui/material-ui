---
title: Нижняя панель навигации, компонент React
components: BottomNavigation, BottomNavigationAction
githubLabel:
  component: BottomNavigation
materialDesign: https://material.io/components/bottom-navigation
---

# Bottom Navigation (Нижняя панель навигации)

<p class="description">Нижние панели навигации позволяют перемещаться между основными пунктами назначения в приложении.</p>

[Нижняя панель навигации](https://material.io/design/components/bottom-navigation.html) отображает от трех до пяти элементов перехода внизу экрана. Каждый элемент перехода представлен значком и необязательной текстовой меткой. При нажатии на нижний значок навигации пользователь попадает на страницу, связанную с этим значком.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Bottom Navigation (Нижняя панель навигации)

Если существует **четыре** или **пять** действий, стоит отображать неактивные элементы только в виде значков.

{{"demo": "pages/components/bottom-navigation/SimpleBottomNavigation.js", "bg": true}}

## Нижняя навигация без текста

Если существует **четыре** или **пять** действий, стоит отображать неактивные элементы только в виде значков.

{{"demo": "pages/components/bottom-navigation/LabelBottomNavigation.js", "bg": true}}

## Fixed positioning

This demo keeps bottom navigation fixed to the bottom, no matter the amount of content on-screen.

{{"demo": "pages/components/bottom-navigation/FixedBottomNavigation.js", "bg": true, "iframe": true, "maxWidth": 600}}
