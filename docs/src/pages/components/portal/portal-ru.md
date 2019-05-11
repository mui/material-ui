---
title: Portal React component
components: Portal
---

# Portal

<p class="description">Компонент Portal отображает свои дочерние элементы в новом «поддереве» вне текущей иерархии компонентов.</p>

Дочерние элементы портала будут добавлены внутрь элемента, указанного в свойстве `container`.

Портал используется внутри компонентов [`Modal`](/utils/modal/) и [`Popper`](/utils/popper/). На сервере содержимое портала не отрисовывается. You have to wait for the client side hydratation to see the children.

## Simple Portal

{{"demo": "pages/components/portal/SimplePortal.js"}}