---
title: Tree View Reactコンポーネント
components: TreeView、TreeItem
---

# ツリービュー (Tree View)

<p class="description">ツリービューウィジェットには、階層リストが表示されます。</p>

ツリー・ビューを使用して、フォルダおよびファイルを表示するファイル・システム・ナビゲータを表すことができます。フォルダを表すアイテムを展開すると、フォルダの内容 (ファイル、フォルダ、またはその両方) が表示されます。

## Basic tree view

{{"demo": "pages/components/tree-view/FileSystemNavigator.js"}}

## 複数選択

Tree views also support multi selection.

{{"demo": "pages/components/tree-view/MultiSelectTreeView.js"}}

### Controlled tree view

The tree view also offers a controlled API.

{{"demo": "pages/components/tree-view/ControlledTreeView.js"}}

## Rich object

While the `TreeView`/`TreeItem` component API maximizes flexibility, an extra step is needed to handle a rich object.

Let's consider a data variable with the following shape, recursion can be used to handle it.

```js
const data = {
  id: 'root',
  name: 'Parent',
  children: [
    {
      id: '1',
      name: 'Child - 1',
    },
    // …
  ],
};
```

{{"demo": "pages/components/tree-view/RecursiveTreeView.js", "defaultCodeOpen": false}}

## カスタマイズされたツリービュー

### カスタムアイコン、ボーダーとアニメーション

{{"demo": "pages/components/tree-view/CustomizedTreeView.js"}}

### Gmailクローン

{{"demo": "pages/components/tree-view/GmailTreeView.js"}}

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#TreeView)

The component follows the WAI-ARIA authoring practices.