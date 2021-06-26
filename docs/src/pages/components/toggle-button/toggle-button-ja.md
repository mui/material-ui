---
title: Toggle Button React component
components: ToggleButton, ToggleButtonGroup
---

# トグルボタン

<p class="description">トグルボタンを使用して、関連するオプションをグループ化できます。</p>

ToggleButton sets `aria-pressed="<bool>"` according to the button state. ToggleButton sets `aria-pressed="<bool>"` according to the button state.

## 排他的な選択

Text justification toggle buttons present options for left, right, center, full, and justified text with only one item available for selection at a time. Selecting one option deselects any other.

{{"demo": "pages/components/toggle-button/ToggleButtons.js"}}

## 複数選択

Logically-grouped options, like bold, italic, and underline, allow multiple options to be selected.

{{"demo": "pages/components/toggle-button/ToggleButtonsMultiple.js"}}

## サイズ

大きなボタンと小さなボタンがありますか? `size`propを使用します。

{{"demo": "pages/components/toggle-button/ToggleButtonSizes.js"}}

## 垂直方向のボタン

{{"demo": "pages/components/toggle-button/VerticalToggleButtons.js"}}

## 値がセットされていることを強制する

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

## カスタマイズされたトグルボタン

コンポーネントのカスタマイズ例を次に示します。 コンポーネントのカスタマイズ例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/toggle-button/CustomizedDividers.js", "bg": true}}

## アクセシビリティ

- ToggleButtonGroup には `role="group"` が付与されています。 `aria-label="label"`, `aria-labelledby="id"` または `<label>` でアクセシビリティのためにラベルを指定する必要があります。 `aria-label="label"`, `aria-labelledby="id"` または `<label>` でアクセシビリティのためにラベルを指定する必要があります。
- ToggleButton は、ボタンの状態によって `aria-pressed="<bool>"` を設定します。 各ボタンに `aria-label` を付けてください。 各ボタンに `aria-label` を付けてください。