---
productId: base-ui
title: React Badge component and hook
components: Badge
hooks: useBadge
githubLabel: 'component: badge'
---

# Badge

<p class="description">The Badge component generates a small label that is attached to its child element.</p>

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

A badge is a small descriptor for UI elements.
It typically sits on or near an element and indicates the status of that element by displaying a number, icon, or other short set of characters.

The Badge component creates a badge that is applied to its child element.

{{"demo": "UnstyledBadgeIntroduction", "defaultCodeOpen": false, "bg": "gradient"}}

## Component

```jsx
import { Badge } from '@mui/base/Badge';
```

The Badge wraps around the UI element that it's attached to.

### Anatomy

The Badge component is composed of a root `<span>` that houses the element that the Badge is attached to, followed by a `<span>` slot to represent the Badge itself:

```html
<span class="BaseBadge-root">
  <!-- the element the badge is attached to is nested here -->
  <span class="BaseBadge-badge">badge content</span>
</span>
```

### Custom structure

Use the `slots` prop to override the root or any other interior slot:

```jsx
<Badge slots={{ root: 'div', badge: 'div' }} />
```

:::info
The `slots` prop is available on all non-utility Base components.
See [Overriding component structure](/base-ui/guides/overriding-component-structure/) for full details.
:::

Use the `slotProps` prop to pass custom props to internal slots.
The following code snippet applies a CSS class called `my-badge` to the badge slot:

```jsx
<Badge slotProps={{ badge: { className: 'my-badge' } }} />
```

### Usage with TypeScript

In TypeScript, you can specify the custom component type used in the `slots.root` as a generic parameter of the unstyled component.
This way, you can safely provide the custom root's props directly on the component:

```tsx
<Badge<typeof CustomComponent> slots={{ root: CustomComponent }} customProp />
```

The same applies for props specific to custom primitive elements:

```tsx
<Badge<'img'> slots={{ root: 'img' }} src="badge.png" />
```

## Hook

```jsx
import { useBadge } from '@mui/base/useBadge';
```

The `useBadge` hook lets you apply the functionality of a Badge to a fully custom component.
It returns props to be placed on the custom component, along with fields representing the component's internal state.

Hooks _do not_ support [slot props](#custom-structure), but they do support [customization props](#customization).

:::info
Hooks give you the most room for customization, but require more work to implement.
With hooks, you can take full control over how your component is rendered, and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [structure](#anatomy).
:::

## Customization

:::info
The following features can be used with both components and hooks.
For the sake of simplicity, demos, and code snippets primarily feature components.
:::

### Badge content

The `badgeContent` prop defines the content that's displayed inside the Badge.
When this content is a number, there are additional props you can use for further customization—see the [Numerical Badges section](#numerical-badges) below.

The following demo shows how to create and style a typical numerical Badge that's attached to a generic box element:

{{"demo": "UnstyledBadge", "defaultCodeOpen": false}}

### Badge visibility

You can control the visibility of a Badge by using the `invisible` prop.
Setting a Badge to `invisible` does not actually hide it—instead, this prop adds the `BaseBadge-invisible` class to the Badge, which you can target with styles to hide however you prefer:

{{"demo": "BadgeVisibility.js"}}

### Numerical Badges

The following props are useful when `badgeContent` is a number.

#### The showZero prop

By default, Badges automatically hide when `badgeContent={0}`.
You can override this behavior with the `showZero` prop:

{{"demo": "ShowZeroBadge.js"}}

#### The max prop

You can use the `max` prop to set a maximum value for `badgeContent`.
The default is 99.

{{"demo": "BadgeMax.js"}}

## Accessibility

Screen readers may not provide users with enough information about a Badge's contents.
To make your badge accessible, you must provide a full description with `aria-label`, as shown in the demo below:

{{"demo": "AccessibleBadges.js"}}
