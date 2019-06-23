---
title: Radio buttons コンポーネント
components: Radio, RadioGroup, FormControl, FormLabel, FormControlLabel
---

# Radio buttons

<p class="description">Radio buttons allow the user to select one option from a set.</p>

Use [radio buttons](https://material.io/design/components/selection-controls.html#radio-buttons) when the user needs to see all available options. If available options can be collapsed, consider using a dropdown menu because it uses less space.

Radio buttons should have the most commonly used option selected by default.

`RadioGroup` is a helpful wrapper used to group `Radio` components that provides an easier API, and proper keyboard accessibility to the group.

{{"demo": "pages/components/radio-buttons/RadioButtonsGroup.js"}}

## Standalone Radio Buttons

`Radio` can also be used standalone, without the wrapper.

{{"demo": "pages/components/radio-buttons/RadioButtons.js"}}

## ラベルの配置

ラベルの配置は自由に変更できます。

{{"demo": "pages/components/radio-buttons/FormControlLabelPosition.js"}}

## アクセシビリティ

ラジオボタン、チェックボックス、スイッチなどのすべてのフォームコントロールにラベルを付ける必要があります。 ほとんどの場合、 `<label>` 要素（[FormControlLabel](/api/form-control-label/)）を使用して行われます。

ラベルを使用できない場合は、入力コンポーネントに直接属性を追加する必要があります。 この場合、追加の属性（例： `aria-label`, `aria-labelledby`, `title`)を経由して `inputProps` プロパティを追加します。

```jsx
<RadioButton
  value="radioA"
  inputProps={{ 'aria-label': 'Radio A' } }
/>
```

## ガイド

- [Checkboxと Radio Buttons](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)