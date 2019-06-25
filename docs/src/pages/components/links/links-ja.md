---
components: Link
---

# リンク

<p class="description">The Link component allows you to easily customize anchor elements with your theme colors and typography styles.</p>

## Simple links

The Link component is built on top of the [Typography](/api/typography/) component. You can leverage its properties.

{{"demo": "pages/components/links/Links.js"}}

However, the Link has different default properties than the Typography:

- `color="primary"` as the link needs to stand out.
- `variant="inherit"` as the link will, most of the time, be used as a child of a Typograpy component.

## アクセシビリティ

- When providing the content for the link, avoid generic descriptions like "click here" or "go to". Instead, use [specific descriptions](https://developers.google.com/web/tools/lighthouse/audits/descriptive-link-text).
- For the best user experience links should stand out from the text on the page.
- If a link doesn't have a meaningful href, [it should be rendered using a `<button>` element](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md).

{{"demo": "pages/components/links/ButtonLink.js"}}

## Security

When you use `target="_blank"` with Links it is [recommended](https://developers.google.com/web/tools/lighthouse/audits/noopener) to always set `rel="noopener"` or `rel="noreferrer"` when linking to third party content.

- `rel="noopener"` prevents the new page from being able to access the window.opener property and ensures it runs in a separate process. Without this the target page can potentially redirect your page to a malicious URL.
- `rel="noreferrer""` has the same effect, but also prevents the *Referer* header from being sent to the new page. ⚠️ Removing the referrer header will affect analytics.

## サードパーティ製ルーティングライブラリ

One common use case is to perform the navigation on the client only, without doing a .html round-trip with the server. The `Link` component provides a property to handle this use case: `component`.

{{"demo": "pages/components/links/LinkRouter.js", "defaultCodeOpen": true}}

*Note: Creating the Link components is necessary to prevent unexpected unmounting. You can read more about it in our [component property guide](/guides/composition/#component-property).*