---
title: Breadcrumbs React component
components: Breadcrumbs
---

# Breadcrumbs

<p class="description">Breadcrumbs allow users to make selections from a range of values.</p>

## Simple breadcrumbs

{{"demo": "pages/lab/breadcrumbs/SimpleBreadcrumbs.js"}}

## Custom separator

In the following examples, we are using two string separators, and an SVG icon.

{{"demo": "pages/lab/breadcrumbs/CustomSeparator.js"}}

## Breadcrumbs with icons

{{"demo": "pages/lab/breadcrumbs/IconBreadcrumbs.js"}}

## Collapsed breadcrumbs

{{"demo": "pages/lab/breadcrumbs/CollapsedBreadcrumbs.js"}}

## Customized breadcrumbs

If you have been reading the [overrides documentation page](/customization/overrides/)
but you are not confident jumping in,
here is one example of how you can change the breadcrumb link design.

{{"demo": "pages/lab/breadcrumbs/CustomizedBreadcrumbs.js"}}

## Accessibility

Be sure to add a `aria-label` description on the `Breadcrumbs` component.

The accessibility of this component relies on:

- The set of links is structured using an ordered list (`<ol>` element).
- To prevent screen reader announcement of the visual separators between links, they are hidden with `aria-hidden`.
- A nav element labeled with `aria-label` identifies the structure as a breadcrumb trail and makes it a navigation landmark so that it is easy to locate.

## Integration with react-router

{{"demo": "pages/lab/breadcrumbs/RouterBreadcrumbs.js"}}
