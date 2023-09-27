import * as React from 'react';
import { unstable_useId as useId } from '@mui/utils';
import { ListContext, ListContextValue, ListItemState } from '../useList';
import { MenuItemProps } from './MenuItem.types';

/**
 * Creates an intermediary component that wraps the MenuItem and prevents it
 * from rendering when its state (taken from ListContext) doesn't change.
 *
 * @param Component MenuItem component to wrap
 */
export function unwrapMenuItemContext<WrappedComponentProps extends { id?: string }>(
  Component: React.ComponentType<WrappedComponentProps>,
): React.ComponentType<WrappedComponentProps> {
  const MenuItemWrapper = React.forwardRef(function MenuItemWrapper<
    RootComponentType extends React.ElementType,
  >(
    props: MenuItemProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>,
  ): React.ReactElement {
    const listContext = React.useContext(ListContext as React.Context<ListContextValue<string>>);

    if (!listContext) {
      throw new Error('MenuItem: ListContext was not found.');
    }

    const { id: idProp } = props;
    const id = useId(idProp);

    const { getItemState, dispatch } = listContext;

    let itemState: ListItemState;
    if (id != null) {
      itemState = getItemState(id);
    } else {
      itemState = { focusable: true, highlighted: false, selected: false };
    }

    const { highlighted, selected, focusable } = itemState;

    // The local version of getItemState can be only called with the current Option's value.
    // It doesn't make much sense to render an Option depending on other Options' state anyway.
    const localGetItemState = React.useCallback(
      (itemValue: string) => {
        if (itemValue !== id) {
          throw new Error(
            [
              'Base UI MenuItem: Tried to access the state of another MenuItem.',
              `itemValue: ${itemValue} | id: ${id}`,
              'This is unsupported when the MenuItem uses unwrapMenuItemContext as a performance optimization.',
            ].join('/n'),
          );
        }

        return {
          highlighted,
          selected,
          focusable,
        };
      },
      [highlighted, selected, focusable, id],
    );

    // Create a local (per MenuItem) instance of the ListContext that changes only when
    // the getItemState's return value changes.
    // This makes MenuItems re-render only when their state actually change, not when any MenuItem's state changes.
    const localContextValue = React.useMemo(
      () => ({
        dispatch,
        getItemState: localGetItemState,
      }),
      [dispatch, localGetItemState],
    );

    return (
      <ListContext.Provider value={localContextValue}>
        <Component {...props} id={id} ref={forwardedRef} />
      </ListContext.Provider>
    );
  }) as React.FC<WrappedComponentProps>;

  return MenuItemWrapper;
}
