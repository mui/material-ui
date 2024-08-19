'use client';
import * as React from 'react';

interface RegisterItemReturnValue<Key> {
  /**
   * The id of the item.
   */
  id: Key;
  /**
   * A function that deregisters the item.
   */
  deregister: () => void;
}

export type KeyGenerator<Key> = (existingKeys: Set<Key>) => Key;

export type CompoundComponentContextValue<Key, Subitem> = {
  /**
   * Registers an item with the parent.
   * This should be called during the effect phase of the child component.
   * The `itemMetadata` should be a stable reference (for example a memoized object), to avoid unnecessary re-registrations.
   *
   * @param id Id of the item or A function that generates a unique id for the item.
   *   It is called with the set of the ids of all the items that have already been registered.
   *   Return `existingKeys.size` if you want to use the index of the new item as the id..
   * @param itemMetadata Arbitrary metadata to pass to the parent component.
   */
  registerItem: (id: Key | KeyGenerator<Key>, item: Subitem) => RegisterItemReturnValue<Key>;
  /**
   * Returns the 0-based index of the item in the parent component's list of registered items.
   *
   * @param id id of the item.
   */
  getItemIndex: (id: Key) => number;
  /**
   * The total number of items registered with the parent.
   */
  totalSubitemCount: number;
};

export const CompoundComponentContext = React.createContext<CompoundComponentContextValue<
  any,
  any
> | null>(null);

if (process.env.NODE_ENV !== 'production') {
  CompoundComponentContext.displayName = 'CompoundComponentContext';
}

export interface UseCompoundParentReturnValue<
  Key,
  Subitem extends { ref: React.RefObject<Node | null> },
> {
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
 * Sorts the subitems by their position in the DOM.
 */
function sortSubitems<Key, Subitem extends { ref: React.RefObject<Node | null> }>(
  subitems: Map<Key, Subitem>,
) {
  const subitemsArray = Array.from(subitems.keys()).map((key) => {
    const subitem = subitems.get(key)!;
    return { key, subitem };
  });

  subitemsArray.sort((a, b) => {
    const aNode = a.subitem.ref.current;
    const bNode = b.subitem.ref.current;

    if (aNode === null || bNode === null || aNode === bNode) {
      return 0;
    }

    // eslint-disable-next-line no-bitwise
    return aNode.compareDocumentPosition(bNode) & Node.DOCUMENT_POSITION_PRECEDING ? 1 : -1;
  });

  return new Map(subitemsArray.map((item) => [item.key, item.subitem]));
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
export function useCompoundParent<
  Key,
  Subitem extends { ref: React.RefObject<Node | null> },
>(): UseCompoundParentReturnValue<Key, Subitem> {
  const [subitems, setSubitems] = React.useState(new Map<Key, Subitem>());
  const subitemKeys = React.useRef(new Set<Key>());

  const deregisterItem = React.useCallback(function deregisterItem(id: Key) {
    subitemKeys.current.delete(id);
    setSubitems((previousState) => {
      const newState = new Map(previousState);
      newState.delete(id);
      return newState;
    });
  }, []);

  const registerItem = React.useCallback(
    function registerItem(id: Key | KeyGenerator<Key>, item: Subitem) {
      let providedOrGeneratedId: Key;

      if (typeof id === 'function') {
        providedOrGeneratedId = (id as KeyGenerator<Key>)(subitemKeys.current);
      } else {
        providedOrGeneratedId = id;
      }

      subitemKeys.current.add(providedOrGeneratedId);
      setSubitems((previousState) => {
        const newState = new Map(previousState);
        newState.set(providedOrGeneratedId, item);
        return newState;
      });

      return {
        id: providedOrGeneratedId,
        deregister: () => deregisterItem(providedOrGeneratedId),
      };
    },
    [deregisterItem],
  );

  const sortedSubitems = React.useMemo(() => sortSubitems(subitems), [subitems]);

  const getItemIndex = React.useCallback(
    function getItemIndex(id: Key) {
      return Array.from(sortedSubitems.keys()).indexOf(id);
    },
    [sortedSubitems],
  );

  const contextValue = React.useMemo(
    () => ({
      getItemIndex,
      registerItem,
      totalSubitemCount: subitems.size,
    }),
    [getItemIndex, registerItem, subitems.size],
  );

  return {
    contextValue,
    subitems: sortedSubitems,
  };
}
