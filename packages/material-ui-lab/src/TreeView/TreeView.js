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

  const isExpanded = React.useCallback(id => expanded.indexOf(id) !== -1, [expanded]);
  const isFocusable = id => focusable === id;
  const isFocused = id => focused === id;

  const children = items.map(item => {
    const { id, ...others } = item;
    return <TreeNode key={id} id={id} {...others} />;
  });

  React.useEffect(() => {
    if (items.length > 0) {
      firstNode.current = items[0];
    }

    if (firstNode.current && firstNode.current.id) {
      setFocusable(firstNode.current.id);
    }
  }, [items]);

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

    nodeMap.current = {};
    items.forEach(item => {
      mapNodes(null, item);
    });
  }, [items]);

  const getLastNode = React.useCallback(
    node => {
      if (isExpanded(node.id)) {
        if (node.children && node.children.length > 0) {
          return getLastNode(node.children[node.children.length - 1]);
        }
      }
      return node;
    },
    [isExpanded],
  );

  React.useEffect(() => {
    if (items.length > 0) {
      lastNode.current = getLastNode(items[items.length - 1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(expanded), items, isExpanded, getLastNode]);

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
