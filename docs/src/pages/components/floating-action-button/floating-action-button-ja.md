---
title: React Fab component
components: Fab
githubLabel: 'component: Fab'
materialDesign: https://material.io/components/buttons-floating-action-button
---

# Floating action button

<p class="description">A floating action button (FAB) performs the primary, or most common, action on a screen.</p>

A [floating action button](https://material.io/design/components/buttons-floating-action-button.html) appears in front of all screen content, typically as a circular shape with an icon in its center. FABには次の二つのタイプがあります: regular extended

Only one component is recommended per screen to represent the most common action. Only use a FAB if it is the most suitable way to present a screen's primary action.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Floating Action Button

{{"demo": "pages/components/floating-action-button/FloatingActionButtons.js"}}

## Size

Use the `size` prop for larger or smaller floating action buttons.

{{"demo": "pages/components/floating-action-button/FloatingActionButtonSize.js"}}

## Animation

デフォルトでは、フローティングアクションボタンは、拡大する素材として画面上にアニメーション表示されます。

複数の横方向の画面（タブ付き画面など）にまたがるフローティングアクションボタンは、一時的に消えてから、アクションが変わると再表示されます。

これを実現するにはズームトランジションを使用できます。 これを実現するにはズームトランジションを使用できます。 これを実現するにはズームトランジションを使用できます。 これを実現するにはズームトランジションを使用できます。 終了アニメーションと入力アニメーションの両方が同時にトリガーされるため、新しいフローティングアクションボタンのアニメーションが開始される前に終了するように`enterDelay`を使用します。

{{"demo": "pages/components/floating-action-button/FloatingActionButtonZoom.js", "bg": true}}
