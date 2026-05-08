'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Menu } from '@base-ui/react/menu';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { MenuBarTriggerProps } from './MenuBar.types';

const StyledTrigger = styled(Button)(({ theme }) => ({
  paddingInline: theme.spacing(2),
  color: (theme.vars || theme).palette.text.secondary,
  fontWeight: 500,
  transition: 'none',
  textTransform: 'capitalize',
  letterSpacing: 0,
  fontSize: '0.875rem',
  '&[data-popup-open]': {
    backgroundColor: (theme.vars || theme).palette.action.focus,
  },
  '&.Mui-focusVisible': {
    backgroundColor: (theme.vars || theme).palette.action.focus,
  },
  '[aria-orientation="vertical"] &': {
    justifyContent: 'initial',
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
 * - [MenuBarTrigger API](https://mui.com/material-ui/api/menu-bar-trigger/)
 */
const MenuBarTrigger = React.forwardRef<HTMLButtonElement, MenuBarTriggerProps>(
  function MenuBarTrigger(props, ref) {
    return (
      <Menu.Trigger
        ref={ref}
        render={<StyledTrigger size="small" color="inherit" disableRipple />}
        {...props}
      />
    );
  },
);

export default MenuBarTrigger;

MenuBarTrigger.propTypes /* remove-proptypes */ = {
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
