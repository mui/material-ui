---
components: Link
---

# 链接

<p class="description">链接（Links）组件允许您使用主题颜色和版面设计轻松自定义锚定元素。</p>

## 简单的链接

链接（Links）组件构建在 [版面设计（Typography）](/api/typography/) 组件之上。 您可以利用其属性。

{{"demo": "pages/components/links/Links.js"}}

However, the Link component has different default properties than the Typography component:

- 当链接需要突出显示，使用 `color="primary"`
- `variant="inherit"` as the link will, most of the time, be used as a child of a Typography component.

## 安全提示

When you use `target="_blank"` with Links, it is [recommended](https://developers.google.com/web/tools/lighthouse/audits/noopener) to always set `rel="noopener"` or `rel="noreferrer"` when linking to third party content.

- `rel="noopener"` prevents the new page from being able to access the `window.opener` property and ensures it runs in a separate process. Without this, the target page can potentially redirect your page to a malicious URL.
- `rel="noreferrer"` has the same effect, but also prevents the *Referer* header from being sent to the new page. ⚠️ Removing the referrer header will affect analytics.

## Third-party routing library（第三方路由库）

One common use case is to perform navigation on the client only, without an HTTP round-trip to the server. The `Link` component provides a property to handle this use case: `component`.

Here is an [integration example with react-router](/guides/composition/#link).

## 可访问性

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#link)

- When providing the content for the link, avoid generic descriptions like "click here" or "go to". Instead, use [specific descriptions](https://developers.google.com/web/tools/lighthouse/audits/descriptive-link-text).
- For the best user experience, links should stand out from the text on the page.
- If a link doesn't have a meaningful href, [it should be rendered using a `<button>` element](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md).

{{"demo": "pages/components/links/ButtonLink.js"}}