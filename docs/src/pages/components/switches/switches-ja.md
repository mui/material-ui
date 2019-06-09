---
title: Switch React component
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
---

# Switches

<p class="description">Switches toggle the state of a single setting on or off.</p>

[Switches](https://material.io/design/components/selection-controls.html#switches) are the preferred way to adjust settings on mobile. The option that the switch controls, as well as the state it’s in, should be made clear from the corresponding inline label.

{{"demo": "pages/components/switches/Switches.js"}}

## Switches with FormControlLabel

`Switch` can also be used with a label description thanks to the `FormControlLabel` component.

{{"demo": "pages/components/switches/SwitchLabels.js"}}

## Switches with FormGroup

`FormGroup` は、より簡単なAPIを提供する選択コントロールコンポーネントをグループ化するために使用される便利なラッパーです。 However, we encourage you to use a [Checkbox](#checkboxes) instead.

{{"demo": "pages/components/switches/SwitchesGroup.js"}}

## Customized switches

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/switches/CustomizedSwitches.js"}}

## ラベルの配置

ラベルの配置は自由に変更できます。

{{"demo": "pages/components/switches/FormControlLabelPosition.js"}}

## アクセシビリティ

ラジオボタン、チェックボックス、スイッチなどのすべてのフォームコントロールにラベルを付ける必要があります。 ほとんどの場合、 `<label>` 要素（[FormControlLabel](/api/form-control-label/)）を使用して行われます。

ラベルを使用できない場合は、入力コンポーネントに直接属性を追加する必要があります。 この場合、追加の属性（例： `aria-label`, `aria-labelledby`, `title`)を経由して `inputProps` プロパティを追加します。

```jsx
<Switch
  value="checkedA"
  inputProps={{ 'aria-label': 'Switch A' } }
/>
```