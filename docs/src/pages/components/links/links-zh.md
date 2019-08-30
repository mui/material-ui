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

## 无障碍功能

- 当提供链接对应的内容时，避免使用泛泛的描述，比如“点击这里”或“跳转”之类的词语 相反的，请使用 [具体详细的描述](https://developers.google.com/web/tools/lighthouse/audits/descriptive-link-text)说明.
- For the best user experience, links should stand out from the text on the page.
- 如果一个链接没有赋予一个有意义的href值, [它应该用一个 `<按钮>` 元素](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md)表示

{{"demo": "pages/components/links/ButtonLink.js"}}

## 安全

When you use `target="_blank"` with Links, it is [recommended](https://developers.google.com/web/tools/lighthouse/audits/noopener) to always set `rel="noopener"` or `rel="noreferrer"` when linking to third party content.

- `rel="noopener"` prevents the new page from being able to access the `window.opener` property and ensures it runs in a separate process. Without this, the target page can potentially redirect your page to a malicious URL.
- `rel="noreferrer"` has the same effect, but also prevents the *Referer* header from being sent to the new page. ⚠️ 去除referrer header会影响分析统计

## 第三方路由库

一个常见的用例是仅在客户端上执行导航，而不执行与服务器的.html往返。 为解决此用例 `组件`，`Link` 组件提供了一个属性：

{{"demo": "pages/components/links/LinkRouter.js", "defaultCodeOpen": true}}

*备注：为防止意外的卸载，创建Link组件是非常有必要的。 您可以在我们的 [组件属性指南](/guides/composition/#component-property)阅读更多相关信息。*