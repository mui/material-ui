import * as React from 'react';
import RowListContext from './RowListContext';
import WrapListContext from './WrapListContext';

export interface ListProviderProps {
  /**
   * If `true`, display the list in horizontal direction.
   * @default false
   */
  row?: boolean;
  /**
   * Only for horizontal list.
   * If `true`, the list sets the flex-wrap to "wrap" and adjust margin to have gap-like behavior (will move to `gap` in the future).
   *
   * @default false
   */
  wrap?: boolean;
}

// internal component
const ListProvider = ({
  children,
  row = false,
  wrap = false,
}: React.PropsWithChildren<ListProviderProps>) => {
  return (
    <RowListContext.Provider value={row}>
      <WrapListContext.Provider value={wrap}>
        {React.Children.map(children, (child, index) =>
          React.isValidElement(child)
            ? React.cloneElement(child, {
                // to let List(Item|ItemButton) knows when to apply margin(Inline|Block)Start
                ...(index === 0 && { 'data-first-child': '' }),
              })
            : child,
        )}
      </WrapListContext.Provider>
    </RowListContext.Provider>
  );
};

export default ListProvider;
