---
productId: material-ui
title: React Breadcrumbs component
components: Breadcrumbs, Link, Typography
githubLabel: 'component: breadcrumbs'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/
---

# Breadcrumbs

<p class="description">A breadcrumbs is a list of links that help visualize a page's location within a site's hierarchical structure, it allows navigation up to any of the ancestors.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Basic breadcrumbs

{{"demo": "BasicBreadcrumbs.js"}}

## Active last breadcrumb

Keep the last breadcrumb interactive.

{{"demo": "ActiveLastBreadcrumb.js"}}

## Custom separator

In the following examples, we are using two string separators and an SVG icon.

{{"demo": "CustomSeparator.js"}}

## Breadcrumbs with icons

{{"demo": "IconBreadcrumbs.js"}}

## Collapsed breadcrumbs

{{"demo": "CollapsedBreadcrumbs.js"}}

## Customization

Here is an example of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedBreadcrumbs.js"}}

## Integration with react-router

{{"demo": "RouterBreadcrumbs.js", "bg": true}}

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

Be sure to add a `aria-label` description on the `Breadcrumbs` component.

The accessibility of this component relies on:

- The set of links is structured using an ordered list (`<ol>` element).
- To prevent screen reader announcement of the visual separators between links, they are hidden with `aria-hidden`.
- A nav element labeled with `aria-label` identifies the structure as a breadcrumb trail and makes it a navigation landmark so that it is easy to locate.

## Experimental APIs

### Page Container

The [Page Container](https://mui.com/toolpad/core/react-page-container/) from `@toolpad/core` is the ideal wrapper for the content of your dashboard. It shows the current page title, and provides breadcrumbs to navigate back into the current hierarchy. It makes your page responsive through the use of the Material UI Container component under the hood.

{{"demo": "BasicPageContainer.js", "height": 300}}
