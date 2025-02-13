---
productId: joy-ui
title: React Breadcrumbs component
components: Breadcrumbs
githubLabel: 'component: breadcrumbs'
---

# Breadcrumbs

<p class="description">A breadcrumb trail is a navigational tool that helps users keep track of their location within an app.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Introduction

The Breadcrumbs component consists of a list of links that show the user the hierarchy of a given page in relation to the app's structure.
It provides a simple visual aid for better context and ease of navigation between higher- and lower-level pages.

{{"demo": "BreadcrumbsUsage.js", "hideToolbar": true, "bg": "gradient"}}

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

:::info
To learn how to add custom sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

### Separators

By default, the Breadcrumbs component inserts a forward slash (/) between each navigation item.
Use the `separator` prop to define a custom separator, which can be a character or a symbol as well as an icon:

{{"demo": "SeparatorBreadcrumbs.js"}}

## Usage with Link and Typography

```jsx
import Link from '@mui/joy/Link';
```

```jsx
import Typography from '@mui/joy/Typography';
```

The Breadcrumbs component doesn't accept common Joy UI style props like `variant`, `color`, `startDecorator`, or `endDecorator`—but [Link](/joy-ui/react-link/) and [Typography](/joy-ui/react-typography/) do.
As such, most custom styles that affect the content should be applied directly to those components rather than Breadcrumbs.

The demo below shows how to add an icon to the Link with `startDecorator` and change the color with the `color` prop:

{{"demo": "BreadcrumbsWithIcon.js"}}

## CSS variables playground

Play around with the CSS variables available to the Breadcrumbs component to see how the design changes.
You can use these to customize the component with both the `sx` prop and the theme.

{{"demo": "BreadcrumbsVariables.js", "hideToolbar": true, "bg": "gradient"}}

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

## Accessibility

Be sure to add an informative `aria-label` description to the Breadcrumbs component.

The following features, which follows [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/), are included to optimize the component's baseline accessibility:

- The set of links is structured using an ordered list (`<ol>`).
- Visual separators between links are hidden with `aria-hidden` to prevent screen readers from announcing them.
- A `<nav>` element with an `aria-label` identifies the structure as a breadcrumb trail and makes it a navigation landmark so that it's easy to locate with assistive technology.
- The link to the current page has `aria-current` set to `page`.

## Anatomy

The Breadcrumbs component is composed of a root `<nav>` that wraps around an `<ol>`, with list items corresponding to the trail of links and their separators:

```html
<nav aria-label="breadcrumbs" class="MuiBreadcrumbs-root">
  <ol class="MuiBreadcrumbs-ol">
    <li class="MuiBreadcrumbs-li">
      <!-- Link or Typography -->
    </li>
    <li aria-hidden="true" class="MuiBreadcrumbs-separator">/</li>
    <li class="MuiBreadcrumbs-li css-1rqbcrs-MuiBreadcrumbs-ol">
      <!-- Link or Typography -->
    </li>
  </ol>
</nav>
```
