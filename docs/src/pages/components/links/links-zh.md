---
components: Link
---

# 链接

<p class="description">链接（Links）组件允许您使用主题颜色和版面设计轻松自定义锚定元素。</p>

## 简单的链接

链接（Links）组件构建在 [版面设计（Typography）](/api/typography/) 组件之上。 您可以利用其属性。

{{"demo": "pages/components/links/Links.js"}}

然而，链接（Link）组件有着不同于版面设计（Typography ）组件的默认属性

- 当链接需要突出显示，使用 `color="primary"`
- 链接在多数的情况下，将被用于作为版面设计（Typograpy）的子组件，这种情况使用`variant="inherit"`

## 安全提示

当你在使用Link组件下的 `target="_blank"`时 ，并同时在关联第三方内容的情况下， [推荐](https://developers. google. com/web/tools/lighthouse/audits/noopener) 始终配置 `rel ="noopener"` 或 `的rel ="noreferrer"` 。

- `rel="noopener"` 阻止新页面访问 `window.opener` 属性并确保它分开在不同的进程中运行。 若不如此，目标页面有潜在可能性将你的页面重定向至一个恶意网址
- `rel ="noreferrer"` 具有相同的效果，但也阻止将 *Referer* 标头发送到新页面。 ⚠️ 去除referrer header会影响分析统计

## Third-party routing library（第三方路由库）

One common use case is to perform navigation on the client only, without an HTTP round-trip to the server. 为解决此用例 `组件`，`Link` 组件提供了一个属性：

这有一个[与 react-router 交互的例子](/guides/composition/#link)。

## 可访问性

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#link)

- 当提供链接对应的内容时，避免使用泛泛的描述，比如“点击这里”或“跳转”之类的词语 相反的，请使用 [具体详细的描述](https://developers.google.com/web/tools/lighthouse/audits/descriptive-link-text)说明.
- For the best user experience, links should stand out from the text on the page.
- 如果一个链接没有赋予一个有意义的href值, [它应该用一个 `<按钮>` 元素](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md)表示

{{"demo": "pages/components/links/ButtonLink.js"}}