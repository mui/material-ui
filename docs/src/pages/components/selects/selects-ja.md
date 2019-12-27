---
title: Select React component
components: Select, NativeSelect
---

# Select (選択)

<p class="description">選択コンポーネントは、オプションのリストからユーザー提供の情報を収集するために使用されます。</p>

## 簡単な選択

メニューは、現在選択されているメニュー項目が放出要素の上に表示されるように、放出要素の上に配置されます。

{{"demo": "pages/components/selects/SimpleSelect.js"}}

## ネイティブを選択

プラットフォームのネイティブ選択を使用することで、モバイルでのユーザーエクスペリエンスを向上させることができます。 このようなパターンを許容します。

{{"demo": "pages/components/selects/NativeSelects.js"}}

## テキストフィールド

`TextField` ラッパーコンポーネントは、ラベル、入力、およびヘルプテキストを含む完全なフォームコントロールです。 このセクション</a>で、選択モード 例を見つけることができます。</p> 

## カスタマイズされた選択

コンポーネントのカスタマイズの例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

最初のステップは、 `InputBase` コンポーネントのスタイル設定です。 スタイルを設定したら、テキストフィールドとして直接使用するか、select `input` プロパティに提供して、 `select` フィールドを作成できます。

{{"demo": "pages/components/selects/CustomizedSelects.js"}}

## 複数選択

`Select` コンポーネントは、複数の選択を処理できます。 `multiple` プロパティで有効になります。

単一選択の場合と同様に、 `onChange` コールバックで `event.target.value` にアクセスすることにより、新しい値を引き出すことができます。 常に配列です。

{{"demo": "pages/components/selects/MultipleSelect.js"}}

## 制御開選択

{{"demo": "pages/components/selects/ControlledOpenSelect.js"}}

## ダイアログ付き

Material Designの仕様では推奨されていませんが、ダイアログ内でselectを使用できます。

{{"demo": "pages/components/selects/DialogSelect.js"}}

## Grouping

Display categories with the `ListSubheader` component or the native `<optgroup>` element.

{{"demo": "pages/components/selects/GroupedSelect.js"}}

## アクセシビリティ

To properly label your `Select` input you need an extra element with an `id` that contains a label. That `id` needs to match the `labelId` of the `Select` e.g.

```jsx
<InputLabel id="label">Age</InputLabel>
<Select labelId="label" id="select" value="20">
  <MenuItem value="10">Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
</Select>
```

Alternatively a `TextField` with an `id` and `label` creates the proper markup and ids for you:

```jsx
<TextField id="select" label="Age" value="20">
  <MenuItem value="10">Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
</TextField>
```