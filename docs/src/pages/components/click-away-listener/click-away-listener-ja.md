---
title: Reactコンポーネント外のクリックを検出
components: ClickAwayListener
---

# Click away listener

<p class="description">クリックイベントが要素の外部で発生したかどうかを検出します。 ドキュメント内のどこかで発生したクリックを受信します。</p>

- 📦 [1.5 kB gzipped](/size-snapshot).

## 例

たとえば、ユーザーがページの他の場所をクリックしたときにメニューのドロップダウンを非表示にする必要がある場合は、次のようにします。

{{"demo": "pages/components/click-away-listener/ClickAway.js"}}

Notice that the component only accepts one child element. You can find a more advanced demo on the [Menu documentation section](/components/menus/#menulist-composition).