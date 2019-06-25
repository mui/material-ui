---
title: Listコンポーネント
components: Collapse, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
---

# List

<p class="description">Listは、テキストまたは画像が連続する垂直方向の索引です。</p>

[List](https://material.io/design/components/lists.html) は、テキストまたは画像が連続するまとまりです。 それらは、アイコンとテキストで表される主要または補足的なアクションを含む項目で構成されています。

## シンプルなList

{{"demo": "pages/components/lists/SimpleList.js"}}

上のデモの最後の項目は、リンクを表示方法を示しています。

```jsx
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

//...

<ListItemLink href="#simple-list">
  <ListItemText primary="Spam" />
</ListItemLink>
```

ドキュメントには[このセクションに続くReact Routerを用いたデモ](/guides/composition/#react-router)があります。

## ネストしたList

{{"demo": "pages/components/lists/NestedList.js"}}

## フォルダのList

{{"demo": "pages/components/lists/FolderList.js"}}

## インタラクティブ

以下は、さまざまな設定の視覚的な結果を調べることができるインタラクティブなデモです。

{{"demo": "pages/components/lists/InteractiveList.js"}}

## 選択されたListItem

{{"demo": "pages/components/lists/SelectedListItem.js"}}

## Listの項目の整列

3行以上を表示するときは、項目の配置を変更する必要があり、`alignItems="flex-start"`プロパティを設定してください。

{{"demo": "pages/components/lists/AlignItemsList.js"}}

## List Controls

### Checkbox

Checkboxは、主要なアクションまたは補助的なアクションのどちらかになります。

Checkboxは、Listの項目の主要なアクションであり状態を表します。コメントボタンは補助的なアクションであり別のターゲットになります。

{{"demo": "pages/components/lists/CheckboxList.js"}}

Checkboxは、Listの項目と異なるターゲットに対する補助的なアクションです。

{{"demo": "pages/components/lists/CheckboxListSecondary.js"}}

### Switch

Switchは補助的なアクションであり異なるターゲットです。

{{"demo": "pages/components/lists/SwitchListSecondary.js"}}

## ピン止めされたサブヘッダー付きList

スクロールする上で、サブヘッダーは次のサブヘッダーによって画面から押し出されるまで画面の上部に固定されたままになります。

この機能はCSSのSticky positioningに依存しています。 残念ながら、私たちがサポートしている全てのブラウザで[実装されている訳ではありません](https://caniuse.com/#search=sticky)。 サポートされていない場合、デフォルトは `disableSticky` となります。

{{"demo": "pages/components/lists/PinnedSubheaderList.js"}}

## 差し込み

{{"demo": "pages/components/lists/InsetList.js"}}

## Virtualized List

次の例では、 `リスト` コンポーネントで [react-window](https://github.com/bvaughn/react-window) を使用する方法を示します。 これは200行をレンダリングし、より多くを簡単に処理できます。 仮想化はパフォーマンスの問題に役立ちます。

{{"demo": "pages/components/lists/VirtualizedList.js"}}

可能であれば、 [react-window](https://github.com/bvaughn/react-window) の使用をお勧めします。 このライブラリがあなたのユースケースをカバーしていない場合は、 [react-virtualized](https://github.com/bvaughn/react-virtualized)、次に [react-virtuoso](https://github.com/petyosi/react-virtuoso)ような代替を使用することを検討する必要があります。