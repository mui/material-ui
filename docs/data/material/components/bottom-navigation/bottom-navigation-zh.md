---
product: material-ui
title: Bottom navigation React component
components: BottomNavigation, BottomNavigationAction
githubLabel: 'component: bottom navigation'
materialDesign: https://m2.material.io/components/bottom-navigation
---

# Bottom navigation

<p class="description">使用底部导航栏，您可以在应用程序的主要导航项之间跳转。</p>

底部导航栏（Bottom navigation）在屏幕下方显示三到五个导航项。 每一个导航项都由一个图标和一个可选文本标签表示。 当点击底部导航图标时，用户被切换到该图标关联的目标页面顶部。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Bottom navigation

当只有**三个**导航项时，导航栏会始终显示图标和文本标签。

{{"demo": "SimpleBottomNavigation.js", "bg": true}}

## Bottom navigation with no label

如果有**四个**或**五个**导航项，那些未被选中的导航项会以图标的样式显示。

{{"demo": "LabelBottomNavigation.js", "bg": true}}

## 固定位置

无论屏幕上有多少内容，该演示的内容都会将底部导航固定在底部。

{{"demo": "FixedBottomNavigation.js", "bg": true, "iframe": true, "maxWidth": 600}}

## 第三方路由库

一种常见的用例是仅在客户端上执行导航，而无需通过 HTTP 往返服务器。 针对这种用法，`Link` 组件了提供 `component` 属性来适配它。 Here is a [more detailed guide](/material-ui/guides/routing/).
