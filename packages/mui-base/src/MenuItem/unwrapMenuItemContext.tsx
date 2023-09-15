import * as React from 'react';
import { unstable_useId as useId } from '@mui/utils';
import { ListAction, ListContext, ListContextValue, ListItemState } from '../useList';
import { MenuItemProps } from './MenuItem.types';

export type MenuItemUnwrappedContextProps = Pick<ListItemState, 'focusable' | 'highlighted'> & {
  dispatch: React.Dispatch<ListAction<string>>;
};

type WrapperComponentProps<Wrapped> = Omit<Wrapped, keyof MenuItemUnwrappedContextProps>;

/**
 * Wraps a given MenuItem-like component with another component that observes the parent ListContext
 * and prevents the wrapped component from being rerendered unnecessarily.
 * The wrapped component must be memoized (using React.memo) for this to work.
 * The inner comoonent will receive the following props: `highlighted`, `focusable`, `dispatch`.
 *
 */
export function unwrapMenuItemContext<WrappedComponentProps extends { id?: string }>(
  Component: React.ComponentType<WrappedComponentProps>,
): React.ComponentType<WrapperComponentProps<WrappedComponentProps>> {
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

    if (id === undefined) {
      // id will be undefined during SSR on React 17.
      // TODO: use idGenerator from useMenuItem instead?
      return (
        <Component
          {...props}
          highlighted={false}
          focusable={false}
          dispatch={() => {}}
          ref={forwardedRef}
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
        ref={forwardedRef}
      />
    );
  }) as React.FC<WrapperComponentProps<WrappedComponentProps>>;

  return MenuItemWrapper;
}
