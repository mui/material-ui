---
title: Chip コンポーネント
components: Chip
---

# Chips

<p class="description">Chipsは、入力、属性、やアクションを表すコンパクトな要素です。</p>

[Chips](https://material.io/design/components/chips.html) 使用すると、ユーザーは情報を入力したり、選択を行ったり、コンテンツをフィルター処理したり、アクションを起動したりできます。

ここで、スタンドアロンコンポーネントとして含まれているが、最も一般的な用途は、 何らかの形の入力ので、ここで示した挙動の一部はコンテキストに表示されません。 

## Chip

Chipsの例としてアバター画像やSVGアイコンや文字などがあります。

- `onClick` プロパティが定義されたチップは、フォーカスの変更外観、 ホバー、およびクリックすることができます。
- `onDelete` プロパティが定義されたチップは、ホバー時の外観を変更する削除 アイコンを表示します。

{{"デモ": "pages/components/chips/Chips.js"}}

### Outlined Chips

Outlined chipsは代替スタイルを提供します。

{{"デモ": "pages/components/chips/OutlinedChips.js"}}

## Chip array

値の配列から複数のチップをレンダリングする例。 チップを削除すると、それがアレイから削除されます。 何のため、ことに注意してください `のonClick` プロパティが定義されていないchipはフォーカスされないだけでなく、 クリックされたか、触られた間、gaindepthもありません。

{{"demo":"pages/components/chips/ChipsArray.js"}}

## Small Chip

あなたは小さなチップを定義するために `サイズ` propsを使うことができます。

### Default variant

{{"demo":"pages/components/chips/SmallChips.js"}}

### Outlined variant

{{"demo":"pages/components/chips/SmallOutlinedChips.js"}}

## Chip Playground

{{"demo":"pages/components/chips/ChipsPlayground.js","hideHeader":true}}