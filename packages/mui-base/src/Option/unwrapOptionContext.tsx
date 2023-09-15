import * as React from 'react';
import { ListAction, ListContext, ListContextValue, ListItemState } from '../useList';
import { OptionProps } from './Option.types';

export type OptionUnwrappedContextProps<OptionValue> = Pick<
  ListItemState,
  'selected' | 'highlighted'
> & {
  dispatch: React.Dispatch<ListAction<OptionValue>>;
};

type WrapperComponentProps<Wrapped> = Omit<Wrapped, keyof OptionUnwrappedContextProps<unknown>>;

export function unwrapOptionContext<
  OptionValue,
  WrappedComponentProps extends { value: OptionValue },
>(
  Component: React.ComponentType<WrappedComponentProps>,
): React.ComponentType<WrapperComponentProps<WrappedComponentProps>> {
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
    const { highlighted, selected } = getItemState(value);

    return (
      <Component
        {...props}
        highlighted={highlighted}
        selected={selected}
        dispatch={dispatch}
        ref={forwardedRef}
      />
    );
  }) as React.FC<WrapperComponentProps<WrappedComponentProps>>;

  return OptionWrapper;
}
