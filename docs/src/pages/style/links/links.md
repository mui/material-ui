---
components: Link
---

# Links

<p class="description">The Link component allows you to show links on the page, open them in a new window.</p>

## Simple links

{{"demo": "pages/style/links/Links.js"}}

The Link component is built on top of the [Typography](/api/typography/) component.
You can leverage its properties.

For the best user experience links should stand out from the text on the page.

{{"demo": "pages/style/links/LinkUserExperience.js"}}

## Accessibility

- When providing the content for the link, avoid phrases like "click here" or "go to".
- If a link doesn't have a meaningful href, [it should be rendered using a `<button>` element](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md).

{{"demo": "pages/style/links/ButtonLink.js"}}
