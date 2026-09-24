---
productId: material-ui
title: React Badge component
components: Badge
githubLabel: 'scope: badge'
githubSource: packages/mui-material/src/Badge
---

# Badge

<p class="description">Badge generates a small badge to the top-right of its child(ren).</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Usage guidelines

- **Use badges for supplemental status**: Use badges for short counts or compact states
  that update an existing control or item, such as unread messages on an inbox button. If
  the status is important on its own, show it in the UI instead of relying only on the badge.
- **Label the element that owns the badge**: A badge is a visual cue tied to another
  element, so its meaning should be part of that element's accessible name. For example,
  use `aria-label="Inbox, 4 unread messages"` instead of `aria-label="Inbox"` on the
  target element.
- **Use dot badges for simple states**: A dot badge does not show text or a number, so use
  it only when the surrounding UI makes the state clear, such as `Online` or `Unread`.

{{"demo": "BadgeIntro.js"}}

This demo applies the same pattern to a `ListItemButton` with a `Badge`: the visible
count is included in the item's accessible name so it's announced in the context of the
surrounding UI.

{{"demo": "BadgeListItem.js"}}

## Badge content

Use `badgeContent` to add a short count or label to the wrapped element.

{{"demo": "SimpleBadge.js"}}

### Dot badge

Use `variant="dot"` for a compact status indicator without a count.

{{"demo": "DotBadge.js"}}

### Visibility

Control badge visibility with the `invisible` prop.

{{"demo": "BadgeVisibility.js"}}

The badge hides automatically when `badgeContent` is zero. Override this with the `showZero`
prop when zero is meaningful to the interface.

{{"demo": "ShowZeroBadge.js"}}

### Maximum value

Use the `max` prop to cap large numeric values.

{{"demo": "BadgeMax.js"}}

## Customization

### Color

Use the `color` prop to apply theme palette colors to the badge.

{{"demo": "ColorBadge.js"}}

### Badge alignment

Use the `anchorOrigin` prop to move the badge to any corner of the wrapped element.

{{"demo": "BadgeAlignment.js", "hideToolbar": true}}

### Badge overlap

Use the `overlap` prop when the wrapped element is circular.

{{"demo": "BadgeOverlap.js"}}

### Custom styles

Use theme style overrides, the `sx` prop, or `styled()` to customize the badge.
Learn more in the [customization guide](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedBadges.js"}}
