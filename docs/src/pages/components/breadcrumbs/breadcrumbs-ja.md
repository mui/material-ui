---
title: Breadcrumbs React component
components: Breadcrumbs, Link, Typography
---

# Breadcrumbs

<p class="description">Breadcrumbs allow users to make selections from a range of values.</p>

## Simple breadcrumbs

{{"demo": "pages/components/breadcrumbs/SimpleBreadcrumbs.js"}}

## Custom separator

In the following examples, we are using two string separators, and an SVG icon.

{{"demo": "pages/components/breadcrumbs/CustomSeparator.js"}}

## Breadcrumbs with icons

{{"demo": "pages/components/breadcrumbs/IconBreadcrumbs.js"}}

## Collapsed breadcrumbs

{{"demo": "pages/components/breadcrumbs/CollapsedBreadcrumbs.js"}}

## Customized breadcrumbs

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/breadcrumbs/CustomizedBreadcrumbs.js"}}

## アクセシビリティ

Be sure to add a `aria-label` description on the `Breadcrumbs` component.

The accessibility of this component relies on:

- The set of links is structured using an ordered list (`<ol>` element).
- To prevent screen reader announcement of the visual separators between links, they are hidden with `aria-hidden`.
- A nav element labeled with `aria-label` identifies the structure as a breadcrumb trail and makes it a navigation landmark so that it is easy to locate.

## Integration with react-router

{{"demo": "pages/components/breadcrumbs/RouterBreadcrumbs.js"}}