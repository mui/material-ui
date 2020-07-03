import * as React from 'react';
import PropTypes from 'prop-types';

// Credit: https://gist.github.com/ryanflorence/10e9387f633f9d2e6f444a9bddaabf6e

const useEnhancedEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

const DescendantContext = React.createContext({});

export function DescendantProvider(props) {
  const { id, children, ...other } = props;
  const assigning = React.useRef(true);
  const [, forceUpdate] = React.useState();
  const items = React.useRef([]);

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
  }, [children]);

  return (
    <DescendantContext.Provider {...other} value={{ parentId: id, items, assigning }}>
      {children}
    </DescendantContext.Provider>
  );
}

DescendantProvider.propTypes = {
  children: PropTypes.node,
  /*
   * ParentId
   */
  id: PropTypes.string,
};

export function useDescendant(descendant) {
  const { assigning, items, parentId = null } = React.useContext(DescendantContext);
  const index = React.useRef(-1);

  useEnhancedEffect(() => {
    if (assigning && assigning.current) {
      index.current = items.current.push(descendant) - 1;
    }
  });
  return { parentId, index };
}
