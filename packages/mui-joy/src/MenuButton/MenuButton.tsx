import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_useId as useId, unstable_useForkRef as useForkRef } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { MenuUnstyledActions } from '@mui/base/MenuUnstyled';
import Button from '../Button';
import { styled, useThemeProps } from '../styles';
import { getMenuButtonUtilityClass } from './menuButtonClasses';
import { MenuButtonTypeMap, MenuButtonProps } from './MenuButtonProps';
import MenuButtonContext from './MenuButtonContext';

const useUtilityClasses = (ownerState: MenuButtonProps & { open: boolean }) => {
  const { open } = ownerState;
  const slots = { root: ['root', open && 'open'] };

  const composedClasses = composeClasses(slots, getMenuButtonUtilityClass, {});

  return composedClasses;
};

const MenuButtonRoot = styled(Button, {
  name: 'MuiMenuButton',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: MenuButtonProps }>({});

const MenuButton = React.forwardRef(function MenuButton(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiMenuButton',
  });

  const {
    children,
    variant = 'soft',
    color = 'neutral',
    onClick,
    onKeyDown,
    menuId: menuIdProp,
    popup,
    ...other
  } = props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const menuActions = React.useRef<MenuUnstyledActions>(null);
  const handleRef = useForkRef(buttonRef, ref);
  const menuId = useId(menuIdProp);

  const contextValue = React.useMemo(
    () => ({
      actions: menuActions,
      menuId,
      anchorEl,
      open,
      onClose: () => {
        setAnchorEl(null);
        buttonRef.current?.focus();
      },
    }),
    [open, anchorEl, menuId],
  );

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    setAnchorEl((latestAnchorEl) => (latestAnchorEl ? null : event.currentTarget));
  };

  const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
      if (event.key === 'ArrowUp') {
        menuActions.current?.highlightLastItem();
      }
    }
  };

  const buttonProps = {
    ...other,
    ref: handleRef,
    onClick: handleButtonClick,
    onKeyDown: handleButtonKeyDown,
  };
  const ownerState = {
    ...props,
    open,
    menuId,
    color,
    variant,
  };
  const classes = useUtilityClasses(ownerState);
  return (
    <React.Fragment>
      {typeof children === 'string' && (
        <MenuButtonRoot
          {...buttonProps}
          className={clsx(classes.root, other.className)}
          ownerState={ownerState}
          aria-controls={open ? menuId : undefined}
          aria-expanded={open || undefined}
          aria-haspopup="menu"
          variant={variant}
          color={color}
        >
          {children}
        </MenuButtonRoot>
      )}
      {React.isValidElement(children) &&
        React.cloneElement(React.Children.only(children), buttonProps)}
      {typeof children === 'function' && children(buttonProps)}
      <MenuButtonContext.Provider value={contextValue}>{popup}</MenuButtonContext.Provider>
    </React.Fragment>
  );
}) as OverridableComponent<MenuButtonTypeMap>;

MenuButton.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.shape({
        focusVisible: PropTypes.func.isRequired,
      }),
    }),
  ]),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['context', 'danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Use to apply selected styling.
   * @default false
   */
  selected: PropTypes.bool,
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'light', 'outlined', 'text']),
    PropTypes.string,
  ]),
} as any;

export default MenuButton;
