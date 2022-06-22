---
product: base
title: Unstyled React Badge component
components: BadgeUnstyled
githubLabel: 'component: badge'
packageName: '@mui/base'
---

# Unstyled badge

<p class="description">The BadgeUnstyled component generates a small label that is attached to its child element.</p>

## Introduction

A badge is a small descriptor for UI elements.
It typically sits on or near an element and indicates the status of that element by displaying a number, icon, or other short set of characters.

The `BadgeUnstyled` component creates a badge that is applied to its child element.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

### Anatomy

After [installation](/base/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import BadgeUnstyled from '@mui/base/BadgeUnstyled';

export default function MyApp() {
  return (
    <BadgeUnstyled>{/* the element that the badge is attached to */}</BadgeUnstyled>
  );
}
```

### Basic usage

The badge component wraps around the UI element that it's attached to—for instance, if the badge indicates the number of emails in an inbox, the component will be structured like this:

```jsx
<BadgeUnstyled badgeContent={5}>
  <MailIcon />
</BadgeUnstyled>
```

The `badgeContent` prop defines the content that's displayed inside the badge.
When this content is a number, there are additional props you can use for further customization—see the [Numerical badges section](#numerical-badges) below.

The following demo shows how to create and style a typical numerical badge that's attached to a generic box element:

{{"demo": "UnstyledBadge.js", "defaultCodeOpen": false}}

### Badge visibility

You can control the visibility of a `BadgeUnstyled` by using the `invisible` prop.
Setting a badge to `invisible` does not actually hide it—instead, this prop adds the `MuiBadge-invisible` class to the badge, which you can target with styles to hide however you prefer:

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
