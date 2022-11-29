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

The Breadcrumbs component acts as a wrapper for navigation links.
It's designed to be used with the [Link and Typography components](#usage-with-link-and-typography), as shown below:

{{"demo": "BasicBreadcrumbs.js"}}

## Customization

### Sizes

The Breadcrumbs component comes in three sizes: `sm`, `md` (default), and `lg`:

{{"demo": "BreadcrumbsSizes.js"}}

:::success
To learn how to add custom sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

### Separator

By default, the Breadcrumbs component inserts a forward slash (/) between each navigation item.
Use the `separator` prop to define a custom separator, which can be a character or symbol as well as an icon:

{{"demo": "SeparatorBreadcrumbs.js"}}

## Usage with Link and Typography

```jsx
import Link from '@mui/joy/Link';
```

```jsx
import Typography from '@mui/joy/Typography';
```

The Breadcrumbs component doesn't accept the `variant`, `color`, `startDecorator`, or `endDecorator` props—but [Link](/joy-ui/react-link/) and [Typography](/joy-ui/react-typography/) do.
As such, most custom styles that affect the content should be applied directly to those components rather than Breadcrumbs.

The demo below shows how to add an icon to the Link with `startDecorator` and change the color with the `color` prop:

{{"demo": "BreadcrumbsWithIcon.js"}}

## Common examples

### Condensed Breadcrumbs

When the page hierarchy is deeply nested, you may want to condense multiple levels into one.
The demo below only displays a few previous levels until you click the ellipsis to show the full hierarchy:

{{"demo": "CondensedBreadcrumbs.js"}}

### Condensed with Menu

```jsx
import Menu from '@mui/joy/Menu';
```

As an alternative to the behavior of the condensed demo above, consider adding a [Menu](/joy-ui/react-menu/) component to display the condensed links in a dropdown list:

{{"demo": "BreadcrumbsWithMenu.js"}}

## CSS variable playground

Play around with the CSS variables available to the Breadcrumbs component to see how the design changes.
You can use these to customize the component with both the `sx` prop and the theme.

{{"demo": "BreadcrumbsVariables.js", "hideToolbar": true}}

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

Be sure to add an informative `aria-label` description to the Breadcrumbs component.

The following features are included to optimize the component's baseline accessibility:

- The set of links is structured using an ordered list (`<ol>`).
- Visual separators between links are hidden with `aria-hidden` to prevent screen readers from announcing them.
- A nav element labeled with `aria-label` identifies the structure as a breadcrumb trail and makes it a navigation landmark so that it's easy to locate.
- The link to the current page has `aria-current` set to `page`.

## Anatomy