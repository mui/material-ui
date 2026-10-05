'use client';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { SlotProps } from '../utils/types';

interface IndicatorSlotProps {
  /**
   * Whether to keep the indicator mounted when the item is not checked.
   * @default true
   */
  keepMounted?: boolean | undefined;
}

// Keep typed DOM props assignable while also accepting data attributes in literals.
export type Menu2IndicatorSlotProps<OwnerState> = SlotProps<
  'span',
  IndicatorSlotProps | (IndicatorSlotProps & { [attribute: `data-${string}`]: unknown }),
  OwnerState
>;

// The slot keeps these styles below theme overrides in the CSS layer order.
// Each item supplies the theme overrides for its indicator slot.
const Menu2IndicatorBase = styled('span', { slot: 'root' })(
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
