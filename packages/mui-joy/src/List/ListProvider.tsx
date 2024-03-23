'use client';
import * as React from 'react';
import RowListContext from './RowListContext';
import WrapListContext from './WrapListContext';
import NestedListContext from './NestedListContext';

/**
 * This variables should be used in a List to create a scope
 * that will not inherit variables from the upper scope.
 *
 * Used in `Menu`, `MenuList`, `TabList`, `Select`, and `Autocomplete` to communicate with nested List.
 *
 * e.g. menu group:
 * <Menu>
 *   <List>...</List>
 *   <List>...</List>
 * </Menu>
 */
export const scopedVariables = {
  '--NestedList-marginRight': '0px',
  '--NestedList-marginLeft': '0px',
  '--NestedListItem-paddingLeft': 'var(--ListItem-paddingX)',
  // reset ListItem, ListItemButton negative margin (caused by NestedListItem)
  '--ListItemButton-marginBlock': '0px',
  '--ListItemButton-marginInline': '0px',
  '--ListItem-marginBlock': '0px',
  '--ListItem-marginInline': '0px',
};

interface ListProviderProps {
  /**
   * If `undefined`, there is no effect.
   * If `true` or `false`, affects the nested List styles.
   */
  nested?: boolean;
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

/**
 * @ignore - internal component.
 */
function ListProvider(props: React.PropsWithChildren<ListProviderProps>) {
  const { children, nested, row = false, wrap = false } = props;
  const baseProviders = (
    <RowListContext.Provider value={row}>
      <WrapListContext.Provider value={wrap}>
        {React.Children.map(children, (child, index) =>
          React.isValidElement(child)
            ? React.cloneElement(child, {
                // to let List(Item|ItemButton) knows when to apply margin(Inline|Block)Start
                ...(index === 0 && { 'data-first-child': '' }),
                ...(index === React.Children.count(children) - 1 && { 'data-last-child': '' }),
              })
            : child,
        )}
      </WrapListContext.Provider>
    </RowListContext.Provider>
  );
  if (nested === undefined) {
    return baseProviders;
  }
  return <NestedListContext.Provider value={nested}>{baseProviders}</NestedListContext.Provider>;
}

export default ListProvider;
