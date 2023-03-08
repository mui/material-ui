---
product: joy-ui
title: React Badge component
components: Badge
githubLabel: 'component: badge'
unstyled: /base/react-badge/
---

# Badge

<p class="description">Badge generates a small badge to the top-right of its child(ren).</p>

## Introduction

The badge component is most frequently used to signal status (online, offline, busy, etc) and whether there's notifications or not.

{{"demo": "BadgeUsage.js", "hideToolbar": true}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Badge from '@mui/joy/Badge';

export default function MyApp() {
  return <Badge />;
}
```

### Basic usage

The default appearance of the `Badge` is a dot with a `primary` color.

{{"demo": "SimpleBadge.js"}}

### Content

Use a string or number as value for the `badgeContent` prop to display content.

{{"demo": "ContentBadge.js"}}

The badge automatically hidden if `badgeContent` is zero. You can change this by toggling on the `showZero` prop.

{{"demo": "NumberBadge.js"}}

### Visibility

Control the badge visibility using the `invisible` prop.

:::info
**Note:** If `showZero` is true, the badge will appear even though `invisible` is true.
:::

{{"demo": "BadgeVisibility.js"}}

### Maximum value

Use the `max` prop to cap the content to a maximum value.

{{"demo": "BadgeMax.js"}}

### Position

Use the `anchorOrigin` prop to control the badge position to any corner of the child element.

{{"demo": "BadgeAlignment.js", "hideToolbar": true}}

### Inset

The `badgeInset` prop gives you precise control of the badge's position. Use a string value matching the [inset CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/inset) syntax.

{{"demo": "BadgeInset.js"}}

## Accessibility

Make sure to always provide a meaningful description to the `aria-label` prop, regardless if it is on the badge or the component wrapping it.

{{"demo": "AccessibleBadges.js"}}
