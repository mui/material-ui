import * as React from 'react';
import { ListContext, ListContextValue } from '../useList';
import { OptionProps } from './Option.types';

/**
 * Creates an intermediary component that wraps the Option and prevents it
 * from rendering when its state (taken from ListContext) doesn't change.
 *
 * @param Component Option component to wrap
 */
export function unwrapOptionContext<
  OptionValue,
  WrappedComponentProps extends { value: OptionValue },
>(
  Component: React.ComponentType<WrappedComponentProps>,
): React.ComponentType<WrappedComponentProps> {
  const OptionWrapper = React.forwardRef(function OptionWrapper<
    RootComponentType extends React.ElementType,
  >(
    props: OptionProps<OptionValue, RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>,
  ): React.ReactElement {
    const listContext = React.useContext(
      ListContext as React.Context<ListContextValue<OptionValue>>,
    );

    if (!listContext) {
      throw new Error('Option: ListContext was not found.');
    }

    const { value } = props;

    const { getItemState, dispatch } = listContext;
    const { highlighted, selected, focusable } = getItemState(value);

    // The local version of getItemState can be only called with the current Option's value.
    // It doesn't make much sense to render an Option depending on other Options' state anyway.
    const localGetItemState = React.useCallback(
      (itemValue: OptionValue) => {
        if (itemValue !== value) {
          throw new Error(
            [
              'Base UI Option: Tried to access the state of another Option.',
              'This is unsupported when the Option uses unwrapOptionContext as a performance optimization.',
            ].join('/n'),
          );
        }

        return {
          highlighted,
          selected,
          focusable,
        };
      },
      [highlighted, selected, focusable, value],
    );

    // Create a local (per Option) instance of the ListContext that changes only when
    // the getItemState's return value changes.
    // This makes Options re-render only when their state actually change, not when any Option's state changes.
    const localContextValue = React.useMemo(
      () => ({
        dispatch,
        getItemState: localGetItemState,
      }),
      [dispatch, localGetItemState],
    );

    return (
      <ListContext.Provider value={localContextValue}>
        <Component {...props} ref={forwardedRef} />
      </ListContext.Provider>
    );
  }) as React.FC<WrappedComponentProps>;

  return OptionWrapper;
}
