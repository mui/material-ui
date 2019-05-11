---
title: Button React component
components: Button, Fab, IconButton, ButtonBase, Zoom
---

# ボタン

<p class="description">Buttonを使用すると、ユーザーは1回のタップでアクションを実行したり選択したりできます。</p>

[Button](https://material.io/design/components/buttons.html)は、ユーザが取りうるアクションを伝達します。一般的に次のようなUIのなかに配置されます。

- Dialogs
- Modal window
- Form
- Card
- Toolbar

## Contained Buttons

[Contained button](https://material.io/design/components/buttons.html#contained-button)は、力強く、強調と塗りつぶしによって区別されるようなボタンです。 アプリケーションの初歩的なアクションが含まれます。

一番最後のデモは、アップロード用のボタンの例になっています。

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

## Text Buttons

[Text button](https://material.io/design/components/buttons.html#text-button)は、一般的にそれほど目立たせる必要のないアクションに対して用いられます。例えば、次のようなコンポーネントの中で用いられます。

- Dialog
- Card

Cardの中でText Buttonを用いることで、Cardの内容に重点を置くことができます。

{{"demo": "pages/components/buttons/TextButtons.js"}}

## Outlined Buttons

[Outlined button](https://material.io/design/components/buttons.html#outlined-button)は、強調度合いが中くらいのボタンです。 重要なアクションを含みますが、アプリ内では最も重要ではない、といった場合に使われます。

### 代替手段

Outlined buttonは、Contained buttonと比べると強調が弱く、 Text buttonと比べると強調の強いボタンです。

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Floating Action Buttons

[floating action button](https://material.io/design/components/buttons-floating-action-button.html)(FAB) は画面上でもっとも重要で一般的なアクションを実行する際に使用します。 FABは画面の構成要素の中で最前面に配置され、一般的に円形で中央にアイコンが配置されます。 FABには次の二つのタイプがあります: regular extended

Only use a FAB if it is the most suitable way to present a screen’s primary action.

Only one floating action button is recommended per screen to represent the most common action.

{{"demo": "pages/components/buttons/FloatingActionButtons.js"}}

The floating action button animates onto the screen as an expanding piece of material, by default.

A floating action button that spans multiple lateral screens (such as tabbed screens) should briefly disappear, then reappear if its action changes.

The Zoom transition can be used to achieve this. Note that since both the exiting and entering animations are triggered at the same time, we use `enterDelay` to allow the outgoing Floating Action Button's animation to finish before the new one enters.

{{"demo": "pages/components/buttons/FloatingActionButtonZoom.js"}}

## Sizes

Fancy larger or smaller buttons? Use the `size` property.

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Buttons with icons and label

Sometimes you might want to have icons for certain button to enhance the UX of the application as we recognize logos more easily than plain text. For example, if you have a delete button you can label it with a dustbin icon.

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Icon Buttons

Icon buttons are commonly found in app bars and toolbars.

Icons are also appropriate for toggle buttons that allow a single choice to be selected or deselected, such as adding or removing a star to an item.

{{"demo": "pages/components/buttons/IconButtons.js"}}

## Customized buttons

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/buttons/CustomizedButtons.js"}}



## Complex Buttons

The Text Buttons, Contained Buttons, Floating Action Buttons and Icon Buttons are built on top of the same component: the `ButtonBase`. You can take advantage of this lower level component to build custom interactions.

{{"demo": "pages/components/buttons/ButtonBases.js"}}

## Third-party routing library

One common use case is to use the button to trigger a navigation to a new page. The `ButtonBase` component provides a property to handle this use case: `component`. However for certain focus polyfills `ButtonBase` requires the DOM node of the provided component. This is achieved by attaching a ref to the component and expecting that the component forwards this ref to the underlying DOM node. Given that a lot of our interactive components rely on `ButtonBase`, you should be able to take advantage of it everywhere:

{{"demo": "pages/components/buttons/ButtonRouter.js", "defaultCodeOpen": true}}

*Note: Creating the Button components is necessary to prevent unexpected unmounting. You can read more about it in our [component property guide](/guides/composition/#component-property).*