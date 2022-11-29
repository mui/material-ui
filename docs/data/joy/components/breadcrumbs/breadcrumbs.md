---
product: joy-ui
title: React Breadcrumbs component
githubLabel: 'component: breadcrumbs'
---

# Breadcrumbs

<p class="description">A breadcrumb trail is a navigational tool that helps users keep track of their location within an app.</p>

## Introduction

The Breadcrumbs component consists of a list of links that show the user the hierarchy of a given page in relation to the app's structure.
It provides a simple visual aid for greater context and ease of navigation between higher- and lower-level pages.

{{"demo": "BreadcrumbsUsage.js", "hideToolbar": true, "bg": "gradient"}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Basics

```jsx
import Breadcrumbs from '@mui/joy/Breadcrumbs';
```

The Breadcrumbs component is designed to be used with [Link](/joy-ui/react-link/) and [Typography](/joy-ui/react-typography/), as shown below:

{{"demo": "BasicBreadcrumbs.js"}}

## Customization

You can add an icon as a decorator to the [Link](/joy-ui/react-link/) and mix it with the `color` prop.

{{"demo": "BreadcrumbsWithIcon.js"}}

### Separator

You can pass an icon component to the prop `separator`.

{{"demo": "SeparatorBreadcrumbs.js"}}

### Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

Be sure to add a `aria-label` description on the Breadcrumbs component.

The accessibility of this component relies on:

- The set of links is structured using an ordered list (`<ol>` element).
- To prevent screen reader announcement of the visual separators between links, they are hidden with `aria-hidden`.
- A nav element labeled with `aria-label` identifies the structure as a breadcrumb trail and makes it a navigation landmark so that it is easy to locate.
- The link to the current page has `aria-current` set to page.

## CSS Variables

Play around with one of the CSS variables available in the breadcrumbs component to see how the design changes.

{{"demo": "BreadcrumbsVariables.js", "hideToolbar": true}}

## Common examples

### Collapsed Breadcrumbs

You can change the color of the links. You can learn more about them in [Link](/joy-ui/react-link/).

{{"demo": "CollapsedBreadcrumbs.js"}}

### With [Menu](/joy-ui/react-menu/)

You can use the Breadcrumbs component together with the Joy UI [Menu](/joy-ui/react-menu/) component.

{{"demo": "BreadcrumbsWithMenu.js"}}
