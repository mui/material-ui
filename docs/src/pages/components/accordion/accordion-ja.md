---
title: Accordion React component
components: Accordion, AccordionActions, AccordionDetails, AccordionSummary
---

# Accordion (拡張パネル)

<p class="description">Expansion panels(拡張パネル) には作成フローが含まれ、要素を簡単に編集できます。</p>

[拡張パネル](https://material.io/archive/guidelines/components/expansion-panels.html)は 独立した軽量のコンテナであるか、カードなどの大きなサーフェスに接続されています。

> **注：** 拡張パネルについては、[Material Design guidelines](https://material.io/)では説明されていませんが、Material-UIでは引き続きサポートされます。 It was formerly known as the "expansion panel".

## Simple Accordion

{{"demo": "pages/components/accordion/SimpleAccordion.js", "bg": true}}

## Controlled Accordion

パネルのデフォルトの動作を拡張し、`Accordion`コンポーネントを使用してアコーディオンを作成します。

{{"demo": "pages/components/accordion/ControlledAccordions.js", "bg": true}}

## カスタマイズされた拡張パネル

コンポーネントのカスタマイズ例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/accordion/CustomizedAccordions.js"}}

## Additional actions

In order to put an action such as a `Checkbox` or a button inside of the `AccordionSummary`, you need to stop the propagation of the focus and click events to prevent the panel from expanding/collapsing when using the action. You should also provide an `aria-label` for the action, otherwise the label of the nested action will be included in the label of the parent button that controls the accordion expansion.

{{"demo": "pages/components/accordion/ActionsInAccordionSummary.js", "bg": true}}

## パフォーマンス

The content of Accordions is mounted by default even if the accordion is not expanded. このデフォルトの動作では、サーバー側のレンダリングとSEOが考慮されています。 Accordionsのコンテンツは、パネルが展開されていない場合でもデフォルトでマウントされます。 このデフォルトの動作では、サーバー側のレンダリングとSEOが考慮されています。 If you render expensive component trees inside your panels or simply render many panels it might be a good idea to change this default behavior by enabling the `unmountOnExit` in `TransitionProps`:

```jsx
<Accordion TransitionProps={{ unmountOnExit: true }} />
```

他のパフォーマンス最適化と同様、これは特効薬ではありません。 まずボトルネックを特定してから、これらの最適化戦略を試してください。

## Secondary heading and Columns (第2の見出しと列)

複数の列を使用してコンテンツを構成でき、ユーザーを支援するためにヘルパーテキストをパネルに追加できます。

{{"demo": "pages/components/accordion/DetailedAccordion.js", "bg": true}}

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#accordion)

最適なアクセシビリティのために、 `AccordionSummary``id` と `aria-controls` を設定することをお勧めします。 `Accordion` は、パネルのコンテンツ領域に必要な `aria-labelledby` および `id` を導き出します。 最適なアクセシビリティのために、 `AccordionSummary``id` と `aria-controls` を設定することをお勧めします。 `Accordion` は、パネルのコンテンツ領域に必要な `aria-labelledby` および `id` を導き出します。
