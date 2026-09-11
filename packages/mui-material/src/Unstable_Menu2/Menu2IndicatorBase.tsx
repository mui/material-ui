'use client';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';

// The slot keeps these styles below theme overrides in the CSS layer order.
// Each indicator wrapper supplies its own theme key.
const Menu2IndicatorBase = styled('span', { slot: 'Root' })(
  memoTheme(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    // Match MenuItemBase's fixed ListItemIcon column and ListItemText inset.
    minWidth: 36,
    // Keep custom icons inside their column when the label needs more space.
    flexShrink: 0,
    // Match Checkbox and Radio colors, not the color of a decorative ListItemIcon.
    color: (theme.vars || theme).palette.text.secondary,
    '&[data-checked]': {
      color: (theme.vars || theme).palette.primary.main,
    },
  })),
);

export default Menu2IndicatorBase;
