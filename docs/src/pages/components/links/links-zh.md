---
components: Link
---

# 链接

<p class="description">Link组件允许您使用主题颜色和排版样式轻松自定义锚元素。</p>

## 简单的链接

Link组件构建在 [Typography](/api/typography/) 组件之上。 您可以利用其属性。

{{"demo": "pages/components/links/Links.js"}}

However, the Link has different default properties than the Typography:

- `color="primary"` as the link needs to stand out.
- `variant="inherit"` as the link will, most of the time, be used as a child of a Typograpy component.

## 无障碍功能

- When providing the content for the link, avoid generic descriptions like "click here" or "go to". Instead, use [specific descriptions](https://developers.google.com/web/tools/lighthouse/audits/descriptive-link-text).
- For the best user experience links should stand out from the text on the page.
- If a link doesn't have a meaningful href, [it should be rendered using a `<button>` element](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md).

{{"demo": "pages/components/links/ButtonLink.js"}}

## 安全

当使用 `target="_blank"` 带链接的是 [推荐](https://developers.google.com/web/tools/lighthouse/audits/noopener) 总是设置 的`rel ="noopener"` 或 `的rel ="noreferrer"` 链接到第三方内容时。

- `rel="noopener"` prevents the new page from being able to access the window.opener property and ensures it runs in a separate process. Without this the target page can potentially redirect your page to a malicious URL.
- `rel ="noreferrer"` 具有相同的效果，但也阻止将 *Referer* 标头发送到新页面。 ⚠️ Removing the referrer header will affect analytics.

## 第三方路由库

一个常见的用例是仅在客户端上执行导航，而不执行与服务器的.html往返。 `Link` 组件提供了处理此用例的属性： `组件`。

{{"demo": "pages/components/links/LinkRouter.js", "defaultCodeOpen": true}}

*Note: Creating the Link components is necessary to prevent unexpected unmounting. 您可以在我们的 [组件属性指南](/guides/composition/#component-property)阅读更多相关信息。*