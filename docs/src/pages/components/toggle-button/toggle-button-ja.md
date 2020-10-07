---
title: Toggle Button React component
components: ToggleButton, ToggleButtonGroup
githubLabel: 'component: ToggleButton'
materialDesign: 'https://material.io/components/buttons#toggle-button'
---

# トグルボタン

<p class="description">トグルボタンを使用して、関連するオプションをグループ化できます。</p>

グループは共通のコンテナーを共用する必要があります。 ToggleButton sets `aria-pressed="<bool>"` according to the button state. ToggleButton sets `aria-pressed="<bool>"` according to the button state.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Exclusive selection

With exclusive selection, selecting one option deselects any other.

In this example text justification toggle buttons present options for left, center, right, and fully justified text (disabled), with only one item available for selection at a time.

{{"demo": "pages/components/toggle-button/ToggleButtons.js"}}

## Multiple selection

Multiple selection allows for logically-grouped options, like bold, italic, and underline, to have multiple options selected.

{{"demo": "pages/components/toggle-button/ToggleButtonsMultiple.js"}}

## サイズ

大きなボタンと小さなボタンがありますか? `size`プロパティを使用します。

{{"demo": "pages/components/toggle-button/ToggleButtonSizes.js"}}

## Vertical buttons

The buttons can be stacked vertically with the `orientation` prop set to "vertical".

{{"demo": "pages/components/toggle-button/VerticalToggleButtons.js"}}

## Enforce value set

If you want to enforce that at least one button must be active, you can adapt your handleChange function.

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

コンポーネントのカスタマイズ例を次に示します。 コンポーネントのカスタマイズ例を次に示します。 コンポーネントのカスタマイズ例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/toggle-button/CustomizedDividers.js", "bg": true}}

## アクセシビリティ

### ARIA

- ToggleButtonGroup has `role="group"`. You should provide an accessible label with `aria-label="label"`, `aria-labelledby="id"` or `<label>`.
- ToggleButton sets `aria-pressed="<bool>"` according to the button state. You should label each button with `aria-label`.

### Keyboard

At present, toggle buttons are in DOM order. Navigate between them with the tab key. The button behavior follows standard keyboard semantics.
