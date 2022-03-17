import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled, useThemeProps } from '../styles';
import { MenuTypeMap } from './MenuProps';
import { MenuActions } from '../MenuList';
import { getMenuUtilityClass } from './menuClasses';
import MenuPopupContext from './MenuPopupContext';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMenuUtilityClass, {});
};

const MenuRoot = styled(PopperUnstyled, {
  name: 'MuiMenu',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({
  zIndex: 1,
});

const Menu = React.forwardRef(function Menu(inProps, ref) {
  const props = useThemeProps<typeof inProps>({
    props: inProps,
    name: 'MuiMenu',
  });

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const menuActions = React.useRef<MenuActions>(null);

  const { button, children, className, onClose, id, ...other } = props;

  const open = Boolean(anchorEl);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (open) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
      if (event.key === 'ArrowUp') {
        menuActions.current?.highlightLastItem();
      }
    }
  };

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
    buttonRef.current?.focus();
    onClose?.();
  }, [onClose]);

  const classes = useUtilityClasses();

  return (
    <React.Fragment>
      {React.cloneElement(button, {
        ref: buttonRef,
        'aria-controls': open ? id : undefined,
        'aria-expanded': open || undefined,
        'aria-haspopup': 'menu',
        onClick: handleButtonClick,
        onKeyDown: handleButtonKeyDown,
      })}
      <MenuRoot
        ref={ref}
        anchorEl={anchorEl}
        disablePortal
        keepMounted
        open={open}
        role={undefined}
        className={clsx(classes.root, className)}
        {...other}
      >
        <MenuPopupContext.Provider value={{ id, actions: menuActions, open, onClose: handleClose }}>
          {children}
        </MenuPopupContext.Provider>
      </MenuRoot>
    </React.Fragment>
  );
}) as OverridableComponent<MenuTypeMap>;

Menu.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
} as any;

export default Menu;
