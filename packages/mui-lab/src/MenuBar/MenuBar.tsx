'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Menubar as BaseMenubar } from '@base-ui/react/menubar';
import clsx from 'clsx';
import { styled, useThemeProps } from '@mui/material/styles';
import composeClasses from '@mui/utils/composeClasses';
import { getMenuBarUtilityClass } from './menuBarClasses';
import { MenuBarProps } from './MenuBar.types';

const useUtilityClasses = (ownerState: any) => {
  const { classes } = ownerState;
  const slots = {
    root: ['root'],
  };
  return composeClasses(slots, getMenuBarUtilityClass, classes);
};

const MenuBarRoot = styled('div', {
  name: 'MuiMenuBar',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  display: 'flex',
  gap: '1px',
  padding: theme.spacing(0.25),
  background: (theme.vars || theme).palette.grey[100],
  ...theme.applyStyles('dark', {
    background: (theme.vars || theme).palette.grey[800],
  }),
  '&[aria-orientation="vertical"]': {
    flexDirection: 'column',
  },
}));

/**
 * The menu bar is a visually persistent menu similar to those found in desktop applications
 * that provides a consistent set of frequently used commands.
 *
 * Demos:
 *
 * - [Menubar](https://mui.com/material-ui/react-menubar/)
 *
 * API:
 *
 * - [MenuBar API](https://mui.com/material-ui/api/menu-bar/)
 */
const MenuBar = React.forwardRef<HTMLDivElement, MenuBarProps>(function MenuBar(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiMenuBar' });
  const { className, ...other } = props;
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);

  return (
    <BaseMenubar
      {...other}
      render={(renderProps) => (
        <MenuBarRoot
          {...renderProps}
          className={clsx(classes.root, className, renderProps.className)}
          ref={ref}
        />
      )}
    />
  );
});

export default MenuBar;

MenuBar.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * CSS class applied to the element, or a function that
   * returns a class based on the component's state.
   */
  className: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;
