import * as React from 'react';
import PropTypes from 'prop-types';
import { refType } from '@mui/utils';
import { PolymorphicComponent } from '../utils/PolymorphicComponent';
import { MenuOwnerState, MenuProps, MenuRootSlotProps, MenuTypeMap } from './Menu.types';
import { getMenuUtilityClass } from './menuClasses';
import useMenu from '../useMenu';
import MenuProvider from '../useMenu/MenuProvider';
import composeClasses from '../composeClasses';
import Popper from '../Popper';
import useSlotProps from '../utils/useSlotProps';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { WithOptionalOwnerState } from '../utils';
import { ListActionTypes } from '../useList';

function useUtilityClasses(ownerState: MenuOwnerState) {
  const { open } = ownerState;
  const slots = {
    root: ['root', open && 'expanded'],
  };

  return composeClasses(slots, useClassNamesOverride(getMenuUtilityClass));
}

function ListboxRoot(
  props: React.PropsWithChildren<{
    triggerElement: HTMLElement | null;
    open: boolean;
    Root: React.ElementType;
    rootProps: any;
  }>,
) {
  const { triggerElement, open, Root, rootProps, children } = props;

  if (triggerElement != null) {
    return (
      <Popper
        keepMounted
        {...rootProps}
        anchorEl={triggerElement}
        open={open}
        slots={{ root: Root }}
      >
        {children}
      </Popper>
    );
  }

  return (
    <Root {...rootProps} style={!open ? { display: 'none' } : undefined}>
      {children}
    </Root>
  );
}

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/)
 *
 * API:
 *
 * - [Menu API](https://mui.com/base-ui/react-menu/components-api/#menu)
 */
const Menu = React.forwardRef(function Menu<RootComponentType extends React.ElementType>(
  props: MenuProps<RootComponentType>,
  forwardedRef: React.ForwardedRef<Element>,
) {
  const { actions, children, onItemsChange, slotProps = {}, slots = {}, ...other } = props;

  const { contextValue, getRootProps, dispatch, open, triggerElement } = useMenu({
    onItemsChange,
  });

  React.useImperativeHandle(
    actions,
    () => ({
      dispatch,
      resetHighlight: () => dispatch({ type: ListActionTypes.resetHighlight, event: null }),
    }),
    [dispatch],
  );

  const ownerState: MenuOwnerState = { ...props, open };

  const classes = useUtilityClasses(ownerState);

  const Root = slots.root ?? 'ul';
  const rootProps: WithOptionalOwnerState<MenuRootSlotProps> = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      ref: forwardedRef,
    },
    className: classes.root,
    ownerState,
  });

  return (
    <ListboxRoot open={open} triggerElement={triggerElement} Root={Root} rootProps={rootProps}>
      <MenuProvider value={contextValue}>{children}</MenuProvider>
    </ListboxRoot>
  );
}) as PolymorphicComponent<MenuTypeMap>;

Menu.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref with imperative actions that can be performed on the menu.
   */
  actions: refType,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Function called when the items displayed in the menu change.
   */
  onItemsChange: PropTypes.func,
  /**
   * The props used for each slot inside the Menu.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the Menu.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
} as any;

export default Menu;
