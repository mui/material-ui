---
components: Link
githubLabel:
  component: Link
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#link'
---

# Links 链接

<p class="description">您可以通过链接（Links）组件，轻松的使用主题颜色和字体铸排的样式来自定义锚定元素。</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 简单的链接

链接（Links）组件构建在 [版面设计（Typography）](/api/typography/) 组件之上。

{{"demo": "pages/components/links/Links.js"}}

当你在使用Link组件下的 `target="_blank"`时 ，并同时在关联第三方内容的情况下， [推荐](https://developers.google.com/web/tools/lighthouse/audits/noopener) 始终配置 `rel ="noopener"` 或 `的rel ="noreferrer"` 。

- 当链接需要突出显示时，设置 `color="primary"`。
- 在多数的情况下，当链接需要作为文字铸排的子组件使用，则设置 `variant="inherit"`。

## 安全性

当你将 `target="_blank"`和链接组件一起使用时，若想和第三方的内容相连，我们[推荐](https://developers.google.com/web/tools/lighthouse/audits/noopener)始终配置 `rel="noopener"` 或者 `rel="noreferrer"`。

- `rel="noopener"` 会阻止新页面访问 `window.opener` 属性，并确保它在单独的进程运行。 若不如此，目标页面有极大可能将你的页面重定向至一个恶意网址。
- `rel ="noreferrer"` 具有相同的效果，但也阻止将 *Referer* 标头发送到新页面。 ⚠️ 去除 referrer header 会影响分析。

## Third-party routing library（第三方路由库）

一种常见的用例是仅在客户端上执行导航，而无需通过 HTTP 往返服务器。 为解决此用例 `组件`，`Link` 组件提供了一个属性：

这有一个[与 react-router 交互的例子](/guides/composition/#link)。

## 无障碍设计

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#link)

- 当提供链接对应的内容时，避免使用泛泛的描述，比如“点击这里”或“跳转”之类。 相反的，请使用 [具体详细的描述](https://developers.google.com/web/tools/lighthouse/audits/descriptive-link-text)说明。
- 为了获得最佳的用户体验，链接应该从页面上的文字中脱颖而出。
- 如果一个链接没有赋予一个有意义的 href 值，[它应该加载成一个`<按钮>`元素](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md)。

{{"demo": "pages/components/links/ButtonLink.js"}}
