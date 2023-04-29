---
product: base
title: React Badge component and hook
components: Badge
hooks: useBadge
githubLabel: 'component: badge'
---

# Badge

<p class="description">The Badge component generates a small label that is attached to its child element.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

A badge is a small descriptor for UI elements.
It typically sits on or near an element and indicates the status of that element by displaying a number, icon, or other short set of characters.

The Badge component creates a badge that is applied to its child element.

{{"demo": "UnstyledBadgeIntroduction.js", "defaultCodeOpen": false, "bg": "gradient"}}

## Component

### Usage

After [installation](/base/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Badge from '@mui/base/Badge';

export default function MyApp() {
  return <Badge>{/* the element that the badge is attached to */}</Badge>;
}
```

### Basics

The Badge wraps around the UI element that it's attached to.
For instance, if the badge indicates the number of emails in an inbox, then the component will be structured like this:

```jsx
<Badge>
  <MailIcon />
</Badge>
```

### Anatomy

The Badge component is composed of a root `<span>` that houses the element that the badge is attached to, followed by a `<span>` slot to represent the badge itself:

```html
<span class="BaseBadge-root">
  <!-- the element the badge is attached to is nested here -->
  <span class="BaseBadge-badge">badge content</span>
</span>
```

### Slot props

:::info
The following props are available on all non-utility Base components.
See [Usage](/base/getting-started/usage/) for full details.
:::

Use the `component` prop to override the root slot with a custom element:

```jsx
<Badge component="div" />
```

Use the `slots` prop to override any interior slots in addition to the root:

```jsx
<Badge slots={{ root: 'div', badge: 'div' }} />
```

:::warning
If the root element is customized with both the `component` and `slots` props, then `component` will take precedence.
:::

Use the `slotProps` prop to pass custom props to internal slots.
The following code snippet applies a CSS class called `my-badge` to the badge slot:

```jsx
<Badge slotProps={{ badge: { className: 'my-badge' } }} />
```

## Hook

```jsx
import useBadge from '@mui/base/useBadge';
```

The `useBadge` hook lets you apply the functionality of a badge to a fully custom component.
It returns props to be placed on the custom component, along with fields representing the component's internal state.

Hooks _do not_ support [slot props](#slot-props), but they do support [customization props](#customization).

:::info
Hooks give you the most room for customization, but require more work to implement.
With hooks, you can take full control over how your component is rendered, and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [structure](#anatomy).
:::

## Customization

:::info
The following features can be used with both components and hooks.
For the sake of simplicity, demos and code snippets primarily feature components.
:::

### Badge content

The `badgeContent` prop defines the content that's displayed inside the badge.
When this content is a number, there are additional props you can use for further customization—see the [Numerical badges section](#numerical-badges) below.

The following demo shows how to create and style a typical numerical badge that's attached to a generic box element:

{{"demo": "UnstyledBadge.js", "defaultCodeOpen": false}}

### Badge visibility

You can control the visibility of a badge by using the `invisible` prop.
Setting a badge to `invisible` does not actually hide it—instead, this prop adds the `BaseBadge-invisible` class to the badge, which you can target with styles to hide however you prefer:

{{"demo": "BadgeVisibility.js"}}

### Numerical badges

The following props are useful when `badgeContent` is a number.

#### The showZero prop

By default, badges automatically hide when `badgeContent={0}`.
You can override this behavior with the `showZero` prop:

{{"demo": "ShowZeroBadge.js"}}

#### The max prop

You can use the `max` prop to set a maximum value for `badgeContent`.
The default is 99.

{{"demo": "BadgeMax.js"}}

## Accessibility

Screen readers may not provide users with enough information about a badge's contents.
To make your badge accessible, you must provide a full description with `aria-label`, as shown in the demo below:

{{"demo": "AccessibleBadges.js"}}
