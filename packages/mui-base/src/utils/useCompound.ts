import * as React from 'react';

export type CompoundComponentContextValue<Key, Subitem> = {
  registerItem: (id: Key, item: Subitem) => void;
  unregisterItem: (id: Key) => void;
  getItemIndex: (id: Key) => number;
  totalSubitemCount: number;
};

export const CompoundComponentContext = React.createContext<CompoundComponentContextValue<
  any,
  any
> | null>(null);

CompoundComponentContext.displayName = 'CompoundComponentContext';

export interface UseCompoundParentReturnValue<Key, Subitem> {
  /**
   * The value for the CompoundComponentContext provider.
   */
  contextValue: CompoundComponentContextValue<Key, Subitem>;
  /**
   * The subitems registered with the parent.
   * The key is the id of the subitem, and the value is the metadata passed to the `useCompoundItem` hook.
   * The order of the items is the same as the order in which they were registered.
   */
  subitems: Map<Key, Subitem>;
}

/**
 * Provides a way for a component to know about its children.
 *
 * Child components register themselves with the `useCompoundItem` hook, passing in arbitrary metadata to the parent.
 *
 * This is a more powerful altervantive to `children` traversal, as child components don't have to be placed
 * directly inside the parent component. They can be anywhere in the tree (and even rendered by other components).
 *
 * The downside is that this doesn't work with SSR as it relies on the useEffect hook.
 *
 * @ignore - internal hook.
 */
export function useCompoundParent<Key, Subitem>(): UseCompoundParentReturnValue<Key, Subitem> {
  const [subitems, setSubitems] = React.useState(new Map<Key, Subitem>());

  const registerItem = React.useCallback(function registerItem(id: Key, item: Subitem) {
    setSubitems((previousState) => {
      const newState = new Map(previousState);
      newState.set(id, item);
      return newState;
    });
  }, []);

  const unregisterItem = React.useCallback(function unregisterItem(id: Key) {
    setSubitems((previousState) => {
      const newState = new Map(previousState);
      newState.delete(id);
      return newState;
    });
  }, []);

  const getItemIndex = React.useCallback(
    function getItemIndex(id: Key) {
      return Array.from(subitems.keys()).indexOf(id);
    },
    [subitems],
  );

  return {
    contextValue: {
      getItemIndex,
      registerItem,
      totalSubitemCount: subitems.size,
      unregisterItem,
    },
    subitems,
  };
}

export interface UseCompoundItemReturnValue {
  /**
   * The 0-based index of the child component in the parent component's list of registered children.
   */
  index: number;
  /**
   * The total number of child components registered with the parent component.
   */
  totalItemCount: number;
}

/**
 * Registers a child component with the parent component.
 *
 * @param id A unique key for the child component. If the `id` is `undefined`, the registration logic will not run (this can sometimes be the case during SSR).
 * @param itemMetadata Arbitrary metadata to pass to the parent component. This should be a stable reference (e.g. a memoized object), to avoid unnecessary re-registrations.
 *
 * @ignore - internal hook.
 */
export function useCompoundItem<Key, Subitem>(
  id: Key | undefined,
  itemMetadata: Subitem,
): UseCompoundItemReturnValue {
  const context = React.useContext(CompoundComponentContext) as CompoundComponentContextValue<
    Key,
    Subitem
  >;

  if (context === null) {
    throw new Error('useCompoundItem must be used within a useCompoundParent');
  }

  const { registerItem, unregisterItem } = context;

  React.useEffect(() => {
    if (id === undefined) {
      return () => {};
    }

    registerItem(id, itemMetadata);

    return () => unregisterItem(id);
  }, [id, registerItem, unregisterItem, itemMetadata]);

  return {
    index: id !== undefined ? context.getItemIndex(id) : -1,
    totalItemCount: context.totalSubitemCount,
  };
}
