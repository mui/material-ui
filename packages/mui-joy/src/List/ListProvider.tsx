import * as React from 'react';
import ListOrientationContext from './ListOrientationContext';
import WrapListContext from './WrapListContext';
import NestedListContext from './NestedListContext';

/**
 * This variables should be used in a List to create a scope
 * that will not inherit variables from the upper scope.
 *
 * Used in `Menu`, `MenuList`, `TabList`, `Select` to communicate with nested List.
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
  '--NestedList-item-paddingLeft': 'var(--List-item-paddingX)',
  // reset ListItem, ListItemButton negative margin (caused by NestedListItem)
  '--List-itemButton-marginBlock': '0px',
  '--List-itemButton-marginInline': '0px',
  '--List-item-marginBlock': '0px',
  '--List-item-marginInline': '0px',
};

export interface ListProviderProps {
  /**
   * If `undefined`, there is no effect.
   * If `true` or `false`, affects the nested List styles.
   */
  nested?: boolean;
  /**
   * The flow direction of the content.
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal';
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
  nested,
  orientation = 'vertical',
  wrap = false,
}: React.PropsWithChildren<ListProviderProps>) => {
  const baseProviders = (
    <ListOrientationContext.Provider value={orientation}>
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
    </ListOrientationContext.Provider>
  );
  if (nested === undefined) {
    return baseProviders;
  }
  return <NestedListContext.Provider value={nested}>{baseProviders}</NestedListContext.Provider>;
};

export default ListProvider;
