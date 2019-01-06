---
components: Link
---

# Links

<p class="description">The Link component creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL.</p>

## Simple links

The Link component is built on top of the [Typography](/api/typography/) component.
You can leverage its properties.

{{"demo": "pages/style/links/Links.js"}}

For the best user experience links should stand out from the text on the page.

{{"demo": "pages/style/links/LinkUserExperience.js"}}

## Accessibility

- When providing the content for the link, avoid phrases like "click here" or "go to".
- If a link doesn't have a meaningful href, [it should be rendered using a `<button>` element](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md).

{{"demo": "pages/style/links/ButtonLink.js"}}

## Recommendations

When you use `target="_blank"` with Links it is recommended to always use `rel="noopener"` or `rel="noreferrer"`

`rel="noopener"` prevents the new page from being able to access the window.opener property and ensures it runs in a separate process.
Without this the other page can potentially redirect your page to a malicious URL.

`rel="noreferrer""` has the same effect, but also prevents the Referer header from being sent to the new page.

Removing the referer header will affect analytics. By stripping the referral value, the traffic from these links will be
misattributed — instead of showing as referral traffic, they will be attributed as “direct” in Google Analytics. Or, if
you have another analytics program, you may see the visits in a noreferral bucket.