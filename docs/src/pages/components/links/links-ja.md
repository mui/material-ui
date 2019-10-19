---
components: Link
---

# リンク

<p class="description">Linkコンポーネントを使用すると、テーマの色とタイポグラフィスタイルでアンカー要素を簡単にカスタマイズできます。</p>

## 簡単なリンク

Linkコンポーネントは、 [Typography](/api/typography/) コンポーネントの上に構築されています。 そのプロパティを活用できます。

{{"demo": "pages/components/links/Links.js"}}

ただし、Linkコンポーネントには、Typographyコンポーネントとは異なるデフォルトプロパティがあります。

- リンクが目立つようにするには、`color="primary"`とします。
- ほとんどの場合、リンクはタイポグラフィコンポーネントの子として使用されるため、`variant="inherit"` となります。

## Security

When you use `target="_blank"` with Links, it is [recommended](https://developers.google.com/web/tools/lighthouse/audits/noopener) to always set `rel="noopener"` or `rel="noreferrer"` when linking to third party content.

- `rel="noopener"` prevents the new page from being able to access the `window.opener` property and ensures it runs in a separate process. Without this, the target page can potentially redirect your page to a malicious URL.
- `rel="noreferrer"` has the same effect, but also prevents the *Referer* header from being sent to the new page. ⚠️ Removing the referrer header will affect analytics.

## サードパーティ製ルーティングライブラリ

One common use case is to perform navigation on the client only, without an HTTP round-trip to the server. The `Link` component provides a property to handle this use case: `component`.

Here is an [integration example with react-router](/guides/composition/#link).

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#link)

- When providing the content for the link, avoid generic descriptions like "click here" or "go to". Instead, use [specific descriptions](https://developers.google.com/web/tools/lighthouse/audits/descriptive-link-text).
- For the best user experience, links should stand out from the text on the page.
- If a link doesn't have a meaningful href, [it should be rendered using a `<button>` element](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md).

{{"demo": "pages/components/links/ButtonLink.js"}}