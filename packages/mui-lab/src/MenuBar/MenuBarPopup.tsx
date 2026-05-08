'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Menu } from '@base-ui/react/menu';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import { MenuBarPopupProps } from './MenuBar.types';

const StyledPaper = styled(Paper)(({ theme }) => ({
  minWidth: 160,
  paddingBlock: theme.spacing(0.5),
  transformOrigin: 'var(--transform-origin)',
  '&[data-starting-style], &[data-ending-style]': {
    opacity: 0,
    transform: 'scale(0.95)',
  },
}));
/**
 *
 * Demos:
 *
 * - [Menubar](https://mui.com/material-ui/react-menubar/)
 *
 * API:
 *
 * - [MenuBarPopup API](https://mui.com/material-ui/api/menu-bar-popup/)
 */
const MenuBarPopup = React.forwardRef<HTMLDivElement, MenuBarPopupProps>(
  function MenuBarPopup(props, ref) {
    return (
      <Menu.Popup
        ref={ref}
        render={(renderProps) => (
          <StyledPaper elevation={8}>
            <List component="div" disablePadding sx={{ outline: 'none' }} {...renderProps}>
              {props.children}
            </List>
          </StyledPaper>
        )}
        {...props}
      />
    );
  },
);

export default MenuBarPopup;

MenuBarPopup.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  children: PropTypes.node,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};
