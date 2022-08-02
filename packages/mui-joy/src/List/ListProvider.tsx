import * as React from 'react';
import { unstable_isMuiElement as isMuiElement } from '@mui/utils';
import RowListContext from './RowListContext';
import WrapListContext from './WrapListContext';

export interface ListProviderProps {
  size?: string;
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
  size,
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
                // for creating group menus or options
                ...(isMuiElement(child, ['List']) &&
                  !!size && {
                    size,
                  }),
              })
            : child,
        )}
      </WrapListContext.Provider>
    </RowListContext.Provider>
  );
};

export default ListProvider;
