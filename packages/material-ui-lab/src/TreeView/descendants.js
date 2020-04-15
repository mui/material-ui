import * as React from 'react';
import PropTypes from 'prop-types';

// Credit: https://gist.github.com/ryanflorence/10e9387f633f9d2e6f444a9bddaabf6e

const useEnhancedEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

const DescendantContext = React.createContext({});

export function useDescendants() {
  return React.useRef([]);
}

export function DescendantProvider({ items, nodeId: parent, ...props }) {
  const assigning = React.useRef(true);
  const [, forceUpdate] = React.useState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEnhancedEffect(() => {
    if (assigning.current) {
      assigning.current = false;
      forceUpdate({});
    } else {
      assigning.current = true;
    }
    return () => {
      if (assigning.current) {
        items.current = [];
      }
    };
  });

  return <DescendantContext.Provider {...props} value={{ parent, items, assigning }} />;
}

DescendantProvider.propTypes = {
  /*
   * Ref containing children
   */
  items: PropTypes.object,
  /*
   * ParentId
   */
  nodeId: PropTypes.string,
};

export function useDescendant(descendant) {
  const { assigning, items, parent } = React.useContext(DescendantContext);
  const index = React.useRef(-1);

  useEnhancedEffect(() => {
    if (assigning && assigning.current) {
      index.current = items.current.push(descendant) - 1;
    }
  });
  return { parent, index };
}
