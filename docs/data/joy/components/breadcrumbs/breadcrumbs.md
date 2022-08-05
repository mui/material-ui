---
product: joy-ui
title: React Breadcrumbs component
---

# Breadcrumbs

<p class="description">Breadcrumbs consist of a list of links that help a user visualize a page's location within the hierarchical structure of a website, and allow navigation up to any of its "ancestors".</p>

## Introduction

The `Breadcrumbs` shows where in the site hierarchy the user is.

{{"demo": "BreadcrumbsUsage.js", "hideToolbar": true}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Breadcrumbs from '@mui/joy/Breadcrumbs';

export default function MyApp() {
  return <Breadcrumbs />;
}
```

### Basic usage

`Breadcrumbs` is a navigation component that should be used with other components.
The most common components you'd use with it are `Typography` and `Link`.

{{"demo": "BasicBreadcrumbs.js"}}

### Separator

You can pass an icon component to the prop `separator`.

{{"demo": "SeparatorBreadcrumbs.js"}}

### Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

Be sure to add a `aria-label` description on the `Breadcrumbs` component.

The accessibility of this component relies on:

- The set of links is structured using an ordered list (`<ol>` element).
- To prevent screen reader announcement of the visual separators between links, they are hidden with `aria-hidden`.
- A nav element labeled with `aria-label` identifies the structure as a breadcrumb trail and makes it a navigation landmark so that it is easy to locate.
- The link to the current page has `aria-current` set to page.

## Common examples

### Collapsed Breadcrumbs

{{"demo": "CollapsedBreadcrumbs.js"}}

### With `Menu`

You can use the Joy `Breadcrumbs` component together with the MUI Joy `Menu` component.

{{"demo": "BreadcrumbsWithMenu.js"}}
