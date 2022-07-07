---
product: material-ui
title: React Breadcrumbs component
components: Breadcrumbs, Link, Typography
githubLabel: 'component: breadcrumbs'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/
---

# Breadcrumbs

<p class="description">Breadcrumbs consist of a list of links that help a user visualize a page's location within the hierarchical structure of a website, and allow navigation up to any of its "ancestors".</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

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
