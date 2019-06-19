import React from 'react';
import PropTypes from 'prop-types';
import TreeViewContext from './TreeViewContext';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
};

const TreeView = React.forwardRef(function TreeView(props, ref) {
  const { classes, children, collapseIcon, expandIcon, defaultLeafIcon, defaultNodeIcon, ...other } = props;
  const [expanded, setExpanded] = React.useState([]);
  const [focusable, setFocusable] = React.useState(null);
  const [focused, setFocused] = React.useState(null);
  const firstNode = React.useRef(null);

  const nodeMap = React.useRef({});
  const firstCharMap = React.useRef({});

  const isExpanded = React.useCallback(id => expanded.indexOf(id) !== -1, [expanded]);
  const isFocusable = id => focusable === id;
  const isFocused = id => focused === id;

  React.useEffect(() => {
    nodeMap.current = {};
    const childIds = React.Children.map(children, child => child.props.id);
    nodeMap.current[-1] = { parent: null, children: childIds };

    childIds.forEach((id, index) => {
      if (index === 0) {
        firstNode.current = id;
        setFocusable(id);
      }
      nodeMap.current[id] = { parent: null };
    });
  }, [children]);

  const getLastNode = React.useCallback(
    id => {
      const map = nodeMap.current[id];
      if (isExpanded(id) && map.children && map.children.length > 0) {
        return getLastNode(map.children[map.children.length - 1]);
      }
      return id;
    },
    [isExpanded],
  );

  const focus = id => {
    if (id) {
      setFocusable(id);
    }
    setFocused(id);
  };

  const getNextNode = (id, end) => {
    const map = nodeMap.current[id];
    const parent = nodeMap.current[map.parent];

    if (!end) {
      if (isExpanded(id)) {
        return map.children[0];
      }
    }
    if (parent) {
      const nodeIndex = parent.children.indexOf(id);
      const nextIndex = nodeIndex + 1;
      if (parent.children.length > nextIndex) {
        return parent.children[nextIndex];
      }
      return getNextNode(parent.id, true);
    }
    const topLevelNodes = nodeMap.current[-1].children;
    const topLevelNodeIndex = topLevelNodes.indexOf(id);
    if (topLevelNodeIndex !== -1 && topLevelNodeIndex !== topLevelNodes.length - 1) {
      return topLevelNodes[topLevelNodeIndex + 1];
    }

    return null;
  };

  const getPreviousNode = id => {
    const map = nodeMap.current[id];
    const parent = nodeMap.current[map.parent];

    if (parent) {
      const nodeIndex = parent.children.indexOf(id);
      if (nodeIndex !== 0) {
        const nextIndex = nodeIndex - 1;
        return getLastNode(parent.children[nextIndex]);
      }
      return parent.id;
    }
    const topLevelNodes = nodeMap.current[-1].children;
    const topLevelNodeIndex = topLevelNodes.indexOf(id);
    if (topLevelNodeIndex > 0) {
      return getLastNode(topLevelNodes[topLevelNodeIndex - 1]);
    }

    return null;
  };

  const focusNextNode = id => {
    const nextNode = getNextNode(id);
    if (nextNode) {
      focus(nextNode);
    }
  };
  const focusPreviousNode = id => {
    const previousNode = getPreviousNode(id);
    if (previousNode) {
      focus(previousNode);
    }
  };
  const focusFirstNode = () => {
    if (firstNode.current) {
      focus(firstNode.current);
    }
  };

  const focusLastNode = () => {
    const topLevelNodes = nodeMap.current[-1].children;
    const lastNode = getLastNode(topLevelNodes[topLevelNodes.length - 1]);
    focus(lastNode);
  };

  const toggle = (value = focused) => {
    setExpanded(prevExpanded => {
      let newExpanded;

      if (prevExpanded.indexOf(value) !== -1) {
        newExpanded = prevExpanded.filter(id => id !== value);
        setFocusable(oldFocusable => {
          const map = nodeMap.current[oldFocusable];
          if (oldFocusable && (map && map.parent ? map.parent.id : null) === value) {
            return value;
          }
          return oldFocusable;
        });
      } else {
        newExpanded = [value, ...prevExpanded];
      }

      return newExpanded;
    });
  };

  const expandAllSiblings = id => {
    const map = nodeMap.current[id];
    const parent = nodeMap.current[map.parent];

    let diff;
    if (parent) {
      diff = parent.children.filter(child => !isExpanded(child));
    } else {
      const topLevelNodes = nodeMap.current[-1].children;
      diff = topLevelNodes.filter(node => !isExpanded(node));
    }
    setExpanded(oldExpanded => [...oldExpanded, ...diff]);
  };

  const handleLeftArrow = id => {
    if (isExpanded(id)) {
      toggle(id);
    } else {
      const parent = nodeMap.current[id].parent;
      if (parent) {
        focus(parent);
      }
    }
  };

  const getIndexFirstChars = (firstChars, startIndex, char) => {
    for (let i = startIndex; i < firstChars.length; i += 1) {
      if (char === firstChars[i]) {
        return i;
      }
    }
    return -1;
  };

  const setFocusByFirstCharacter = (id, char) => {
    let start;
    let index;
    const lowercaseChar = char.toLowerCase();

    const firstCharIds = [];
    const firstChars = [];
    // This really only works since the ids are strings
    Object.entries(firstCharMap.current).forEach(([nodeId, firstChar]) => {
      const map = nodeMap.current[nodeId];
      const visible = map.parent ? isExpanded(map.parent) : true;

      if (visible) {
        firstCharIds.push(nodeId);
        firstChars.push(firstChar);
      }
    });

    // Get start index for search based on position of currentItem
    start = firstCharIds.indexOf(id) + 1;
    if (start === nodeMap.current.length) {
      start = 0;
    }

    // Check remaining slots in the menu
    index = getIndexFirstChars(firstChars, start, lowercaseChar);

    // If not found in remaining slots, check from beginning
    if (index === -1) {
      index = getIndexFirstChars(firstChars, 0, lowercaseChar);
    }

    // If match was found...
    if (index > -1) {
      focus(firstCharIds[index]);
    }
  };

  const handleNodeMap = (id, childrenIds) => {
    const currentMap = nodeMap.current[id];
    nodeMap.current[id] = { ...currentMap, children: childrenIds, id };
    (childrenIds || []).forEach(childId => {
      const currentChildMap = nodeMap.current[childId];
      nodeMap.current[childId] = { ...currentChildMap, parent: id, id: childId };
    });
  };

  const handleFirstChars = (id, firstChar) => {
    firstCharMap.current[id] = firstChar;
  };

  return (
    <TreeViewContext.Provider
      value={{
        icons: { collapseIcon, defaultNodeIcon, defaultLeafIcon, expandIcon },
        toggle,
        isExpanded,
        isFocusable,
        focus,
        focusNextNode,
        focusPreviousNode,
        focusFirstNode,
        focusLastNode,
        isFocused,
        handleLeftArrow,
        expandAllSiblings,
        setFocusByFirstCharacter,
        handleNodeMap,
        handleFirstChars,
      }}
    >
      <ul role="tree" className={classes.root} ref={ref} {...other}>
        {children}
      </ul>
    </TreeViewContext.Provider>
  );
});

TreeView.propTypes = {
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  collapseIcon: PropTypes.node,
  defaultLeafIcon: PropTypes.node,
  defaultNodeIcon: PropTypes.node,
  expandIcon: PropTypes.node,
};

export default withStyles(styles)(TreeView);
