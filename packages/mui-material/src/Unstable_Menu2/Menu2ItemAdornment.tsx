'use client';
import * as React from 'react';
import type { ListItemIconProps } from '../ListItemIcon';
import ListItemIcon from '../ListItemIcon';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';

// A span stays valid inside a native button. The marker keeps the MenuItemBase
// ListItemIcon column width off this element, so theme overrides win.
const StartAdornment = React.forwardRef<HTMLDivElement, ListItemIconProps>(
  function StartAdornment(props, ref) {
    const iconProps = { ...props, as: 'span' };
    return <ListItemIcon {...iconProps} ref={ref} data-mui-menu-adornment="" />;
  },
);

/**
 * @ignore - internal component.
 */
export const Menu2ItemStartAdornment = styled(StartAdornment, {
  name: 'MuiMenu2Item',
  slot: 'startAdornment',
})({
  alignItems: 'center',
  minWidth: 36,
});

/**
 * @ignore - internal component.
 */
export const Menu2ItemEndAdornment = styled('span', {
  name: 'MuiMenu2Item',
  slot: 'endAdornment',
})(
  memoTheme(({ theme }) => ({
    ...theme.typography.body2,
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    marginLeft: 'auto',
    paddingLeft: 16,
    color: (theme.vars || theme).palette.text.secondary,
  })),
);
