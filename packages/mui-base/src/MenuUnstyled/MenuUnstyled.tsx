import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import appendOwnerState from '../utils/appendOwnerState';
import MenuUnstyledContext, { MenuUnstyledContextType } from './MenuUnstyledContext';
import MenuUnstyledProps from './MenuUnstyledProps';
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

  const {
    registerItem,
    unregisterItem,
    getRootProps,
    getItemProps,
    getItemState,
    menuItems,
    highlightedOption,
  } = useMenu({ listboxRef: ref });

  // Fire the keyboard event on the highlighted item:
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (highlightedOption == null) {
      return;
    }

    const highlightedElement = menuItems[highlightedOption]?.ref?.current;
    const eventCopy = new KeyboardEvent(event.type, event.nativeEvent);

    // The original event propagates already
    eventCopy.stopPropagation();

    highlightedElement?.dispatchEvent(eventCopy);
  };

  const ownerState = props;

  const classes = getUtilityClasses();

  const Root = component ?? components.Root ?? 'ul';
  const rootProps = appendOwnerState(
    Root,
    {
      ...other,
      ...componentsProps.root,
      ...getRootProps({ onKeyDown: handleKeyDown }),
      className: clsx(classes.root, className, componentsProps.root?.className),
      role: 'menu',
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
  componentsProps: PropTypes.object,
} as any;

export default MenuUnstyled;
