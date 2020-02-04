---
title: React Bottom Navigation（底部导航栏）组件
components: BottomNavigation, BottomNavigationAction
---

# Bottom Navigation（底部导航栏）

<p class="description">使用底部导航栏，您可以在应用程序的主要导航项之间跳转。</p>

[底部导航栏](https://material.io/design/components/bottom-navigation.html)在屏幕下方显示三到五个导航项。 每一个导航项都由一个图标和一个可选文本标签表示。 当点击底部导航图标时，用户被切换到该图标关联的目标页面顶部。

## Bottom Navigation（底部导航栏）

当只有 **三个** 导航项时，导航栏会始终显示图标和文本标签。

{{"demo": "pages/components/bottom-navigation/SimpleBottomNavigation.js", "bg": true}}

## 无标签的底部导航栏

如果有**四个**或**五个**导航项，那些未被选中的导航项会以图标的样式显示。

{{"demo": "pages/components/bottom-navigation/LabelBottomNavigation.js", "bg": true}}