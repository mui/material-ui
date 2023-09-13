'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useId as useId } from '@mui/utils';
import { PolymorphicComponent } from '../utils/PolymorphicComponent';
import { MenuItemOwnerState, MenuItemProps, MenuItemTypeMap } from './MenuItem.types';
import { getMenuItemUtilityClass } from './menuItemClasses';
import { useMenuItem } from '../useMenuItem';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { useSlotProps } from '../utils/useSlotProps';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { ListAction, ListContext, ListContextValue, ListItemState } from '../useList';

function useUtilityClasses(ownerState: MenuItemOwnerState) {
  const { disabled, focusVisible } = ownerState;

  const slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible'],
  };

  return composeClasses(slots, useClassNamesOverride(getMenuItemUtilityClass));
}

type InnerMenuItemProps<RootComponentType extends React.ElementType = 'li'> =
  MenuItemProps<RootComponentType> &
    Pick<ListItemState, 'focusable' | 'highlighted'> & {
      // eslint-disable-next-line react/no-unused-prop-types
      dispatch: React.Dispatch<ListAction<string>>;
    };

/*
 * @ignore - internal component.
 */
const InnerMenuItem = React.memo(
  React.forwardRef(function InnerMenuItem<RootComponentType extends React.ElementType>(
    props: InnerMenuItemProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>,
  ) {
    const {
      children,
      disabled: disabledProp = false,
      dispatch,
      label,
      focusable,
      highlighted,
      id,
      slotProps = {},
      slots = {},
      ...other
    } = props;

    const { getRootProps, disabled, focusVisible } = useMenuItem({
      disabled: disabledProp,
      dispatch,
      highlighted,
      id,
      focusable,
      rootRef: forwardedRef,
      label,
    });

    const ownerState: MenuItemOwnerState = { ...props, disabled, focusVisible, highlighted };

    const classes = useUtilityClasses(ownerState);

    const Root = slots.root ?? 'li';
    const rootProps = useSlotProps({
      elementType: Root,
      getSlotProps: getRootProps,
      externalSlotProps: slotProps.root,
      externalForwardedProps: other,
      className: classes.root,
      ownerState,
    });

    return <Root {...rootProps}>{children}</Root>;
  }),
);

type WrapperComponentProps<Wrapped> = Omit<Wrapped, 'highlighted' | 'focusable' | 'dispatch'>;

export function unwrapMenuItemContext<WrappedComponentProps extends { id?: string }>(
  Component: React.ComponentType<WrappedComponentProps>,
): React.ComponentType<WrapperComponentProps<WrappedComponentProps>> {
  const MenuItemWrapper = React.forwardRef(function MenuItemWrapper<
    RootComponentType extends React.ElementType,
  >(props: MenuItemProps<RootComponentType>, ref: React.ForwardedRef<Element>): React.ReactElement {
    const listContext = React.useContext(ListContext as React.Context<ListContextValue<string>>);
    if (!listContext) {
      throw new Error('MenuItem: ListContext was not found.');
    }

    const { id: idProp } = props;
    const id = useId(idProp);

    if (id === undefined) {
      // id will be undefined during SSR on React 17.
      // TODO: use idGenerator from useMenuItem instead?
      return (
        <Component
          {...props}
          id={undefined}
          highlighted={false}
          focusable={false}
          dispatch={() => {}}
          ref={ref}
        />
      );
    }

    const { getItemState, dispatch } = listContext;
    const { highlighted, focusable } = getItemState(id);

    return (
      <Component
        {...props}
        id={id}
        highlighted={highlighted}
        focusable={focusable}
        dispatch={dispatch}
        ref={ref}
      />
    );
  }) as React.FC<WrapperComponentProps<WrappedComponentProps>>;

  return MenuItemWrapper;
}

const MenuItem = unwrapMenuItemContext<InnerMenuItemProps>(
  InnerMenuItem,
) as PolymorphicComponent<MenuItemTypeMap>;

MenuItem.propTypes /* remove-proptypes */ = {
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
  disabled: PropTypes.bool,
  /**
   * A text representation of the menu item's content.
   * Used for keyboard text navigation matching.
   */
  label: PropTypes.string,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * The props used for each slot inside the MenuItem.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the MenuItem.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
} as any;

export { MenuItem };
