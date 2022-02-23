import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import appendOwnerState from '../utils/appendOwnerState';
import MenuUnstyledContext, { MenuUnstyledContextType } from './MenuUnstyledContext';
import { MenuUnstyledProps } from './MenuUnstyled.types';
import { getMenuUnstyledUtilityClass } from './menuUnstyledClasses';
import useMenu from './useMenu';
import composeClasses from '../composeClasses';

function getUtilityClasses() {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMenuUnstyledUtilityClass, {});
}
/**
 *
 * Demos:
 *
 * - [Menus](https://mui.com/components/menus/)
 *
 * API:
 *
 * - [MenuUnstyled API](https://mui.com/api/menu-unstyled/)
 */
const MenuUnstyled = React.forwardRef(function MenuUnstyled(
  props: MenuUnstyledProps,
  ref: React.Ref<any>,
) {
  const { children, className, component, components = {}, componentsProps = {}, ...other } = props;

  const { registerItem, unregisterItem, getRootProps, getItemProps, getItemState } = useMenu({
    listboxRef: ref,
  });

  const ownerState = props;

  const classes = getUtilityClasses();

  const Root = component ?? components.Root ?? 'ul';
  const rootProps = appendOwnerState(
    Root,
    {
      ...other,
      ...componentsProps.root,
      ...getRootProps(),
      className: clsx(classes.root, className, componentsProps.root?.className),
    },
    ownerState,
  );

  const contextValue: MenuUnstyledContextType = {
    registerItem,
    unregisterItem,
    getItemState,
    getItemProps,
  };

  return (
    <Root {...rootProps}>
      <MenuUnstyledContext.Provider value={contextValue}>{children}</MenuUnstyledContext.Provider>
    </Root>
  );
});

MenuUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  component: PropTypes.elementType,
  /**
   * @ignore
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType,
  }),
  /**
   * @ignore
   */
  componentsProps: PropTypes.shape({
    root: PropTypes.object,
  }),
} as any;

export default MenuUnstyled;
