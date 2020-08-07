---
title: Reactコンポーネント外のクリックを検出
components: ClickAwayListener
---

# Click away listener

<p class="description">クリックイベントが要素の外部で発生したかどうかを検出します。 ドキュメント内のどこかで発生したクリックを受信します。</p>

- [1.5 kB gzipped](/size-snapshot).
- ⚛️ Support portals

## 例

たとえば、ユーザーがページの他の場所をクリックしたときにメニューのドロップダウンを非表示にする必要がある場合は、次のようにします。

{{"demo": "pages/components/click-away-listener/ClickAway.js"}}

Notice that the component only accepts one child element. You can find a more advanced demo on the [Menu documentation section](/components/menus/#menulist-composition).

## Portal

The following demo uses [`Portal`](/components/portal/) to render the dropdown into a new "subtree" outside of current DOM hierarchy.

{{"demo": "pages/components/click-away-listener/PortalClickAway.js"}}

## Leading edge

By default, the component responds to the trailing events (click + touch end). However, you can configure it to respond to the leading events (mouse down + touch start).

{{"demo": "pages/components/click-away-listener/LeadingClickAway.js"}}

> ⚠️ In this mode, only interactions on the scrollbar of the document is ignored.