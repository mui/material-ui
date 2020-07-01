import * as React from 'react';
import PropTypes from 'prop-types';

/** Credit: https://github.com/reach/reach-ui/blob/86a046f54d53b6420e392b3fa56dd991d9d4e458/packages/descendants/README.md
 *  Modified slightly to suit our purposes.
 */

// To replace with .findIndex() once we stop IE 11 support.
function findIndex(array, comp) {
  for (let i = 0; i < array.length; i += 1) {
    if (comp(array[i])) {
      return i;
    }
  }

  return -1;
}

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const DescendantContext = React.createContext({});

if (process.env.NODE_ENV !== 'production') {
  DescendantContext.displayName = 'DescendantContext';
}

function usePrevious(value) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const noop = () => {};

/**
 * This hook registers our descendant by passing it into an array. We can then
 * search that array by to find its index when registering it in the component.
 * We use this for focus management, keyboard navigation, and typeahead
 * functionality for some components.
 *
 * The hook accepts the element node
 *
 * Our main goals with this are:
 *   1) maximum composability,
 *   2) minimal API friction
 *   3) SSR compatibility*
 *   4) concurrent safe
 *   5) index always up-to-date with the tree despite changes
 *   6) works with memoization of any component in the tree (hopefully)
 *
 * * As for SSR, the good news is that we don't actually need the index on the
 * server for most use-cases, as we are only using it to determine the order of
 * composed descendants for keyboard navigation.
 */
export function useDescendant(descendant) {
  const [, forceUpdate] = React.useState();
  const {
    registerDescendant = noop,
    unregisterDescendant = noop,
    descendants = [],
    parentId = null,
  } = React.useContext(DescendantContext);

  // This will initially return -1 because we haven't registered the descendant
  // on the first render. After we register, this will then return the correct
  // index on the following render and we will re-register descendants
  // so that everything is up-to-date before the user interacts with a
  // collection.
  const index = findIndex(descendants, (item) => item.element === descendant.element);

  const previousDescendants = usePrevious(descendants);

  // We also need to re-register descendants any time ANY of the other
  // descendants have changed. My brain was melting when I wrote this and it
  // feels a little off, but checking in render and using the result in the
  // effect's dependency array works well enough.
  const someDescendantsHaveChanged = descendants.some((newDescendant, position) => {
    return newDescendant.element !== previousDescendants?.[position]?.element;
  });

  // Prevent any flashing
  useEnhancedEffect(() => {
    if (!descendant.element) {
      forceUpdate({});
    }
    registerDescendant({
      ...descendant,
      index,
    });
    return () => {
      unregisterDescendant(descendant.element);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    registerDescendant,
    unregisterDescendant,
    index,
    someDescendantsHaveChanged,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(descendant),
  ]);

  return { parentId, index };
}

export function useDescendantsInit() {
  return React.useState([]);
}

export function DescendantProvider(props) {
  const { children, items, set, id } = props;

  const registerDescendant = React.useCallback(
    ({ element, ...rest }) => {
      if (!element) {
        return;
      }

      set((oldItems) => {
        let newItems;
        if (oldItems.length === 0) {
          // If there are no items, register at index 0 and bail.
          newItems = [
            ...oldItems,
            {
              ...rest,
              element,
              index: 0,
            },
          ];
        } else if (oldItems.find((item) => item.element === element)) {
          // If the element is already registered, just use the same array
          newItems = oldItems;
        } else {
          // When registering a descendant, we need to make sure we insert in
          // into the array in the same order that it appears in the DOM. So as
          // new descendants are added or maybe some are removed, we always know
          // that the array is up-to-date and correct.
          //
          // So here we look at our registered descendants and see if the new
          // element we are adding appears earlier than an existing descendant's
          // DOM node via `node.compareDocumentPosition`. If it does, we insert
          // the new element at this index. Because `registerDescendant` will be
          // called in an effect every time the descendants state value changes,
          // we should be sure that this index is accurate when descendent
          // elements come or go from our component.
          const index = findIndex(oldItems, (item) => {
            if (!item.element || !element) {
              return false;
            }
            // Does this element's DOM node appear before another item in the
            // array in our DOM tree? If so, return true to grab the index at
            // this point in the array so we know where to insert the new
            // element.
            return Boolean(
              // eslint-disable-next-line no-bitwise
              item.element.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_PRECEDING,
            );
          });

          const newItem = {
            ...rest,
            element,
            index,
          };

          // If an index is not found we will push the element to the end.
          if (index === -1) {
            newItems = [...oldItems, newItem];
          } else {
            newItems = [...oldItems.slice(0, index), newItem, ...oldItems.slice(index)];
          }
        }
        return newItems.map((item, index) => ({ ...item, index }));
      });
    },
    [set],
  );

  const unregisterDescendant = React.useCallback(
    (element) => {
      if (!element) {
        return;
      }

      set((oldItems) => oldItems.filter((item) => element !== item.element));
    },
    [set],
  );

  const value = React.useMemo(
    () => ({
      descendants: items,
      registerDescendant,
      unregisterDescendant,
      parentId: id,
    }),
    [items, registerDescendant, unregisterDescendant, id],
  );

  return <DescendantContext.Provider value={value}>{children}</DescendantContext.Provider>;
}

DescendantProvider.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  items: PropTypes.array,
  set: PropTypes.func,
};
