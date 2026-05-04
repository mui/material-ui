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

- **Use badges for supplemental status**: Badges work best for short counts or compact
  states attached to another element, such as unread messages on an inbox button. Don't use
  a badge as the only place where important status appears.
- **Label the element that owns the badge**: Badge content is hidden from assistive
  technologies by default because its meaning depends on the element it describes. Add a
  descriptive status to the target element, for example `aria-label="show 4 unread messages"`.
- **Give dot badges explicit meaning**: Dot badges don't include a count, so use them only
  when the state is explained elsewhere. Add visible status text such as `Unread`, include
  the state in the target's accessible label, or provide another clear state cue.

{{"demo": "BadgeIntro.js"}}

The next demo applies the same pattern to a `ListItemButton` with a `Badge`: the visible
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
