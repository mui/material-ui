---
title: Нижняя панель навигации, компонент React
components: BottomNavigation, BottomNavigationAction
---

# Bottom Navigation (Нижняя панель навигации)

<p class="description">Нижние панели навигации позволяют перемещаться между основными пунктами назначения в приложении.</p>

[Нижняя панель навигации](https://material.io/design/components/bottom-navigation.html) отображает от трех до пяти элементов перехода внизу экрана. Каждый элемент перехода представлен значком и необязательной текстовой меткой. При нажатии на нижний значок навигации пользователь попадает на страницу, связанную с этим значком.

## Bottom Navigation (Нижняя панель навигации)

Если есть только **три действия**, стоит всегда отображать и значки и текстовые метки.

{{"demo": "pages/components/bottom-navigation/SimpleBottomNavigation.js", "bg": true}}

## Нижняя навигация без текста

Если существует **четыре** или **пять** действий, стоит отображать неактивные элементы только в виде значков.

{{"demo": "pages/components/bottom-navigation/LabelBottomNavigation.js", "bg": true}}