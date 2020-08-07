---
title: Toggle Button React component
components: ToggleButton, ToggleButtonGroup
---

# トグルボタン

<p class="description">トグルボタンを使用して、関連するオプションをグループ化できます。</p>

ToggleButton sets `aria-pressed="<bool>"` according to the button state. You should label each button with `aria-label`.

## Exclusive selection

Text justification toggle buttons present options for left, right, center, full, and justified text with only one item available for selection at a time. Selecting one option deselects any other.

{{"demo": "pages/components/toggle-button/ToggleButtons.js"}}

## Multiple selection

Logically-grouped options, like bold, italic, and underline, allow multiple options to be selected.

{{"demo": "pages/components/toggle-button/ToggleButtonsMultiple.js"}}

## サイズ

大きなボタンと小さなボタンがありますか? `size`propを使用します。

{{"demo": "pages/components/toggle-button/ToggleButtonSizes.js"}}

## Vertical buttons

{{"demo": "pages/components/toggle-button/VerticalToggleButtons.js"}}

## Enforce value set

If you want to enforce at least one button to be active, you can adapt your handleChange function.

```jsx
const handleFormat = (event, newFormats) => {
  if (newFormats.length) {
    setFormats(newFormats);
  }
};

const handleAlignment = (event, newAlignment) => {
  if (newAlignment !== null) {
    setAlignment(newAlignment);
  }
};
```

{{"demo": "pages/components/toggle-button/ToggleButtonNotEmpty.js"}}

## スタンドアロンのトグルボタン

{{"demo": "pages/components/toggle-button/StandaloneToggleButton.js"}}

## Customized toggle button

コンポーネントのカスタマイズ例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/toggle-button/CustomizedDividers.js", "bg": true}}

## アクセシビリティ

- ToggleButtonGroup has `role="group"`. You should provide an accessible label with `aria-label="label"`, `aria-labelledby="id"` or `<label>`.
- ToggleButton sets `aria-pressed="<bool>"` according to the button state. You should label each button with `aria-label`.