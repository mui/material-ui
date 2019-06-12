import React from 'react';
import PropTypes from 'prop-types';
import TreeViewContext from './TreeViewContext';
import { makeStyles } from '@material-ui/core/styles';
import TreeNode from '../TreeNode';

const useStyles = makeStyles({
  root: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
});

const TreeView = React.forwardRef(function TreeView(props, ref) {
  const { collapseIcon, expandIcon, defaultLeafIcon, defaultNodeIcon, items, ...other } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState([]);
  const [focusable, setFocusable] = React.useState(null);
  const [focused, setFocused] = React.useState(null);
  const firstNode = React.useRef(null);
  const lastNode = React.useRef(null);
  const nodeMap = React.useRef({});
  const firstCharMap = React.useRef({});

  const isExpanded = React.useCallback(id => expanded.indexOf(id) !== -1, [expanded]);
  const isFocusable = id => focusable === id;
  const isFocused = id => focused === id;

  const children = items.map(item => {
    const { id, ...others } = item;
    return <TreeNode key={id} id={id} {...others} />;
  });

  const getLastNode = React.useCallback(
    node => {
      if (isExpanded(node.id) && node.children && node.children.length > 0) {
        return getLastNode(node.children[node.children.length - 1]);
      }
      return node;
    },
    [isExpanded],
  );

  React.useEffect(() => {
    const mapNodes = (parentNode, node) => {
      if (!parentNode) {
        if (nodeMap.current[-1]) {
          nodeMap.current[-1].children.push(node);
        } else {
          nodeMap.current[-1] = { children: [node] };
        }
      }
      nodeMap.current[node.id] = { parent: parentNode, children: node.children };
      if (node.children) {
        node.children.forEach(child => {
          mapNodes(node, child);
        });
      }
    };

    const getFirstLabelChar = node => {
      firstCharMap.current[node.id] = node.label.substring(0, 1).toLowerCase();

      if (isExpanded(node.id) && node.children) {
        node.children.forEach(child => {
          getFirstLabelChar(child);
        });
      }
    };

    firstCharMap.current = {};
    nodeMap.current = {};

    items.forEach((item, index) => {
      if (index === items.length - 1) {
        lastNode.current = getLastNode(items[items.length - 1]);
      }

      mapNodes(null, item);
      getFirstLabelChar(item);
    });
  }, [items, isExpanded, getLastNode]);

  React.useEffect(() => {
    if (items.length > 0) {
      firstNode.current = items[0];
    }

    if (firstNode.current && firstNode.current.id) {
      setFocusable(firstNode.current.id);
    }
  }, [items]);

  const focus = id => {
    if (id) {
      setFocusable(id);
    }
    setFocused(id);
  };

  const getNextNode = (id, end) => {
    const map = nodeMap.current[id];
    const parent = map.parent;

    if (!end) {
      if (isExpanded(id)) {
        return map.children[0];
      }
    }
    if (parent) {
      const nodeIndex = parent.children.map(c => c.id).indexOf(id);
      const nextIndex = nodeIndex + 1;
      if (parent.children.length > nextIndex) {
        return parent.children[nextIndex];
      }
      return getNextNode(parent.id, true);
    }
    const topLevelNodes = nodeMap.current[-1].children;
    const topLevelNodeIndex = topLevelNodes.map(c => c.id).indexOf(id);
    if (topLevelNodeIndex !== -1 && topLevelNodeIndex !== topLevelNodes.length - 1) {
      return topLevelNodes[topLevelNodeIndex + 1];
    }

    return null;
  };

  const getPreviousNode = id => {
    const map = nodeMap.current[id];
    const parent = map.parent;

    if (parent) {
      const nodeIndex = parent.children.map(c => c.id).indexOf(id);
      if (nodeIndex !== 0) {
        const nextIndex = nodeIndex - 1;
        return getLastNode(parent.children[nextIndex]);
      }
      return parent;
    }
    const topLevelNodes = nodeMap.current[-1].children;
    const topLevelNodeIndex = topLevelNodes.map(c => c.id).indexOf(id);
    if (topLevelNodeIndex > 0) {
      return getLastNode(topLevelNodes[topLevelNodeIndex - 1]);
    }

    return null;
  };

  const focusNextNode = id => {
    const nextNode = getNextNode(id);
    if (nextNode && nextNode.id) {
      focus(nextNode.id);
    }
  };
  const focusPreviousNode = id => {
    const previousNode = getPreviousNode(id);
    if (previousNode && previousNode.id) {
      focus(previousNode.id);
    }
  };
  const focusFirstNode = () => {
    if (firstNode.current && firstNode.current.id) {
      focus(firstNode.current.id);
    }
  };

  const focusLastNode = () => {
    if (lastNode.current && lastNode.current.id) {
      focus(lastNode.current.id);
    }
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
    const parent = map.parent;

    let diff;
    if (parent) {
      diff = parent.children.filter(child => !isExpanded(child.id)).map(child => child.id);
    } else {
      const topLevelNodes = nodeMap.current[-1].children;
      diff = topLevelNodes.filter(node => !isExpanded(node.id)).map(node => node.id);
    }
    setExpanded(oldExpanded => [...oldExpanded, ...diff]);
  };

  const handleLeftArrow = id => {
    if (isExpanded(id)) {
      toggle(id);
    } else {
      const parent = nodeMap.current[id].parent;
      if (parent) {
        focus(parent.id);
      }
    }
  };

  const getIndexFirstChars = (startIndex, char) => {
    const firstChars = Object.values(firstCharMap.current);

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
    // This really only works since the ids are strings
    const firstCharIds = Object.keys(firstCharMap.current);

    // Get start index for search based on position of currentItem
    start = firstCharIds.indexOf(id) + 1;
    if (start === nodeMap.current.length) {
      start = 0;
    }

    // Check remaining slots in the menu
    index = getIndexFirstChars(start, lowercaseChar);

    // If not found in remaining slots, check from beginning
    if (index === -1) {
      index = getIndexFirstChars(0, lowercaseChar);
    }

    // If match was found...
    if (index > -1) {
      focus(firstCharIds[index]);
    }
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
  collapseIcon: PropTypes.node,
  defaultLeafIcon: PropTypes.node,
  defaultNodeIcon: PropTypes.node,
  expandIcon: PropTypes.node,
  items: PropTypes.array,
};

export default TreeView;
