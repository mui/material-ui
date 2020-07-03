import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useControlled } from '@material-ui/core/utils';
import TreeViewContext from './TreeViewContext';
import { DescendantProvider, useDescendantsInit } from './descendants';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
};

const findNextFirstChar = (firstChars, startIndex, char) => {
  for (let i = startIndex; i < firstChars.length; i += 1) {
    if (char === firstChars[i]) {
      return i;
    }
  }
  return -1;
};

const defaultExpandedDefault = [];
const defaultSelectedDefault = [];

const TreeView = React.forwardRef(function TreeView(props, ref) {
  const {
    children,
    classes,
    className,
    defaultCollapseIcon,
    defaultEndIcon,
    defaultExpanded = defaultExpandedDefault,
    defaultExpandIcon,
    defaultParentIcon,
    defaultSelected = defaultSelectedDefault,
    disableSelection = false,
    multiSelect = false,
    expanded: expandedProp,
    onNodeSelect,
    onNodeToggle,
    selected: selectedProp,
    ...other
  } = props;
  const [tabbable, setTabbable] = React.useState(null);
  const [focusedNodeId, setFocusedNodeId] = React.useState(null);
  const [descendants, setDescendants] = useDescendantsInit();

  const nodeMap = React.useRef({});

  const firstCharMap = React.useRef({});

  const [expanded, setExpandedState] = useControlled({
    controlled: expandedProp,
    default: defaultExpanded,
    name: 'TreeView',
    state: 'expanded',
  });

  const [selected, setSelectedState] = useControlled({
    controlled: selectedProp,
    default: defaultSelected,
    name: 'TreeView',
    state: 'selected',
  });

  // Using Object.keys -> .map to mimic Object.values we should replace with Object.values() once we stop IE 11 support.
  const getChildrenIds = (id) =>
    Object.keys(nodeMap.current)
      .map((key) => {
        return nodeMap.current[key];
      })
      .filter((node) => node.parentId === id)
      .sort((a, b) => a.index - b.index)
      .map((child) => child.id);
  /*
   * Status Helpers
   */
  const isExpanded = React.useCallback(
    (id) => (Array.isArray(expanded) ? expanded.indexOf(id) !== -1 : false),
    [expanded],
  );

  const isExpandable = React.useCallback((id) => nodeMap.current[id].expandable, []);

  const isSelected = React.useCallback(
    (id) => (Array.isArray(selected) ? selected.indexOf(id) !== -1 : selected === id),
    [selected],
  );

  const isTabbable = (id) => tabbable === id;
  const isFocused = (id) => focusedNodeId === id;

  /*
   * Node Helpers
   */

  const getNextNode = (id) => {
    // If expanded get first child
    if (isExpanded(id) && getChildrenIds(id).length > 0) {
      return getChildrenIds(id)[0];
    }

    // Try to get next sibling
    const node = nodeMap.current[id];
    const siblings = getChildrenIds(node.parentId);

    const nextSibling = siblings[siblings.indexOf(id) + 1];

    if (nextSibling) {
      return nextSibling;
    }

    // try to get parent's next sibling
    const parent = nodeMap.current[node.parentId];
    if (parent) {
      const parentSiblings = getChildrenIds(parent.parentId);
      return parentSiblings[parentSiblings.indexOf(parent.id) + 1];
    }
    return null;
  };

  const getPreviousNode = (id) => {
    const node = nodeMap.current[id];
    const siblings = getChildrenIds(node.parentId);
    const nodeIndex = siblings.indexOf(id);

    if (nodeIndex === 0) {
      return node.parentId;
    }

    let currentNode = siblings[nodeIndex - 1];
    while (isExpanded(currentNode) && getChildrenIds(currentNode).length > 0) {
      currentNode = getChildrenIds(currentNode).pop();
    }

    return currentNode;
  };

  const getLastNode = () => {
    let lastNode = getChildrenIds(null).pop();

    while (isExpanded(lastNode)) {
      lastNode = getChildrenIds(lastNode).pop();
    }
    return lastNode;
  };
  const getFirstNode = () => getChildrenIds(null)[0];
  const getParent = (id) => nodeMap.current[id].parentId;

  /**
   * This is used to determine the start and end of a selection range so
   * we can get the nodes between the two border nodes.
   *
   * It finds the nodes' common ancestor using
   * a naive implementation of a lowest common ancestor algorithm
   * (https://en.wikipedia.org/wiki/Lowest_common_ancestor).
   * Then compares the ancestor's 2 children that are ancestors of nodeA and NodeB
   * so we can compare their indexes to work out which node comes first in a depth first search.
   * (https://en.wikipedia.org/wiki/Depth-first_search)
   *
   * Another way to put it is which node is shallower in a trémaux tree
   * https://en.wikipedia.org/wiki/Tr%C3%A9maux_tree
   */
  const findOrderInTremauxTree = (nodeAId, nodeBId) => {
    if (nodeAId === nodeBId) {
      return [nodeAId, nodeBId];
    }

    const nodeA = nodeMap.current[nodeAId];
    const nodeB = nodeMap.current[nodeBId];

    if (nodeA.parentId === nodeB.id || nodeB.parentId === nodeA.id) {
      return nodeB.parentId === nodeA.id ? [nodeA.id, nodeB.id] : [nodeB.id, nodeA.id];
    }

    const aFamily = [nodeA.id];
    const bFamily = [nodeB.id];

    let aAncestor = nodeA.parentId;
    let bAncestor = nodeB.parentId;

    let aAncestorIsCommon = bFamily.indexOf(aAncestor) !== -1;
    let bAncestorIsCommon = aFamily.indexOf(bAncestor) !== -1;

    let continueA = true;
    let continueB = true;

    while (!bAncestorIsCommon && !aAncestorIsCommon) {
      if (continueA) {
        aFamily.push(aAncestor);
        aAncestorIsCommon = bFamily.indexOf(aAncestor) !== -1;
        continueA = aAncestor !== null;
        if (!aAncestorIsCommon && continueA) {
          aAncestor = nodeMap.current[aAncestor].parentId;
        }
      }

      if (continueB && !aAncestorIsCommon) {
        bFamily.push(bAncestor);
        bAncestorIsCommon = aFamily.indexOf(bAncestor) !== -1;
        continueB = bAncestor !== null;
        if (!bAncestorIsCommon && continueB) {
          bAncestor = nodeMap.current[bAncestor].parentId;
        }
      }
    }

    const commonAncestor = aAncestorIsCommon ? aAncestor : bAncestor;
    const ancestorFamily = getChildrenIds(commonAncestor);

    const aSide = aFamily[aFamily.indexOf(commonAncestor) - 1];
    const bSide = bFamily[bFamily.indexOf(commonAncestor) - 1];

    return ancestorFamily.indexOf(aSide) < ancestorFamily.indexOf(bSide)
      ? [nodeAId, nodeBId]
      : [nodeBId, nodeAId];
  };

  const getNodesInRange = (nodeA, nodeB) => {
    const [first, last] = findOrderInTremauxTree(nodeA, nodeB);
    const nodes = [first];

    let current = first;

    while (current !== last) {
      current = getNextNode(current);
      nodes.push(current);
    }

    return nodes;
  };

  /*
   * Focus Helpers
   */

  const focus = (id) => {
    if (id) {
      setTabbable(id);
      setFocusedNodeId(id);
    }
  };

  const focusNextNode = (id) => focus(getNextNode(id));
  const focusPreviousNode = (id) => focus(getPreviousNode(id));
  const focusFirstNode = () => focus(getFirstNode());
  const focusLastNode = () => focus(getLastNode());

  const focusByFirstCharacter = (id, char) => {
    let start;
    let index;
    const lowercaseChar = char.toLowerCase();

    const firstCharIds = [];
    const firstChars = [];
    // This really only works since the ids are strings
    Object.keys(firstCharMap.current).forEach((nodeId) => {
      const firstChar = firstCharMap.current[nodeId];
      const map = nodeMap.current[nodeId];
      const visible = map.parentId ? isExpanded(map.parentId) : true;

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
    index = findNextFirstChar(firstChars, start, lowercaseChar);

    // If not found in remaining slots, check from beginning
    if (index === -1) {
      index = findNextFirstChar(firstChars, 0, lowercaseChar);
    }

    // If match was found...
    if (index > -1) {
      focus(firstCharIds[index]);
    }
  };

  /*
   * Expansion Helpers
   */

  const toggleExpansion = (event, value = focusedNodeId) => {
    let newExpanded;

    if (expanded.indexOf(value) !== -1) {
      newExpanded = expanded.filter((id) => id !== value);
      setTabbable((oldTabbable) => {
        const map = nodeMap.current[oldTabbable];
        if (oldTabbable && map?.parentId === value) {
          return value;
        }
        return oldTabbable;
      });
    } else {
      newExpanded = [value].concat(expanded);
    }

    if (onNodeToggle) {
      onNodeToggle(event, newExpanded);
    }

    setExpandedState(newExpanded);
  };

  const expandAllSiblings = (event, id) => {
    const map = nodeMap.current[id];
    const siblings = getChildrenIds(map.parentId);

    const diff = siblings.filter((child) => isExpandable(child) && !isExpanded(child));

    const newExpanded = expanded.concat(diff);

    if (diff.length > 0) {
      setExpandedState(newExpanded);

      if (onNodeToggle) {
        onNodeToggle(event, newExpanded);
      }
    }
  };

  /*
   * Selection Helpers
   */

  const lastSelectedNode = React.useRef(null);
  const lastSelectionWasRange = React.useRef(false);
  const currentRangeSelection = React.useRef([]);

  const handleRangeArrowSelect = (event, nodes) => {
    let base = selected;
    const { start, next, current } = nodes;

    if (!next || !current) {
      return;
    }

    if (currentRangeSelection.current.indexOf(current) === -1) {
      currentRangeSelection.current = [];
    }

    if (lastSelectionWasRange.current) {
      if (currentRangeSelection.current.indexOf(next) !== -1) {
        base = base.filter((id) => id === start || id !== current);
        currentRangeSelection.current = currentRangeSelection.current.filter(
          (id) => id === start || id !== current,
        );
      } else {
        base.push(next);
        currentRangeSelection.current.push(next);
      }
    } else {
      base.push(next);
      currentRangeSelection.current.push(current, next);
    }

    if (onNodeSelect) {
      onNodeSelect(event, base);
    }

    setSelectedState(base);
  };

  const handleRangeSelect = (event, nodes) => {
    let base = selected;
    const { start, end } = nodes;
    // If last selection was a range selection ignore nodes that were selected.
    if (lastSelectionWasRange.current) {
      base = selected.filter((id) => currentRangeSelection.current.indexOf(id) === -1);
    }

    const range = getNodesInRange(start, end);
    currentRangeSelection.current = range;
    let newSelected = base.concat(range);
    newSelected = newSelected.filter((id, i) => newSelected.indexOf(id) === i);

    if (onNodeSelect) {
      onNodeSelect(event, newSelected);
    }

    setSelectedState(newSelected);
  };

  const handleMultipleSelect = (event, value) => {
    let newSelected;
    if (selected.indexOf(value) !== -1) {
      newSelected = selected.filter((id) => id !== value);
    } else {
      newSelected = [value].concat(selected);
    }

    if (onNodeSelect) {
      onNodeSelect(event, newSelected);
    }

    setSelectedState(newSelected);
  };

  const handleSingleSelect = (event, value) => {
    const newSelected = multiSelect ? [value] : value;

    if (onNodeSelect) {
      onNodeSelect(event, newSelected);
    }

    setSelectedState(newSelected);
  };

  const selectNode = (event, id, multiple = false) => {
    if (id) {
      if (multiple) {
        handleMultipleSelect(event, id);
      } else {
        handleSingleSelect(event, id);
      }
      lastSelectedNode.current = id;
      lastSelectionWasRange.current = false;
      currentRangeSelection.current = [];

      return true;
    }
    return false;
  };

  const selectRange = (event, nodes, stacked = false) => {
    const { start = lastSelectedNode.current, end, current } = nodes;
    if (stacked) {
      handleRangeArrowSelect(event, { start, next: end, current });
    } else {
      handleRangeSelect(event, { start, end });
    }
    lastSelectionWasRange.current = true;
    return true;
  };

  const rangeSelectToFirst = (event, id) => {
    if (!lastSelectedNode.current) {
      lastSelectedNode.current = id;
    }

    const start = lastSelectionWasRange.current ? lastSelectedNode.current : id;

    return selectRange(event, {
      start,
      end: getFirstNode(),
    });
  };

  const rangeSelectToLast = (event, id) => {
    if (!lastSelectedNode.current) {
      lastSelectedNode.current = id;
    }

    const start = lastSelectionWasRange.current ? lastSelectedNode.current : id;

    return selectRange(event, {
      start,
      end: getLastNode(),
    });
  };

  const selectNextNode = (event, id) =>
    selectRange(
      event,
      {
        end: getNextNode(id),
        current: id,
      },
      true,
    );

  const selectPreviousNode = (event, id) =>
    selectRange(
      event,
      {
        end: getPreviousNode(id),
        current: id,
      },
      true,
    );

  const selectAllNodes = (event) =>
    selectRange(event, { start: getFirstNode(), end: getLastNode() });

  /*
   * Mapping Helpers
   */
  const registerNode = React.useCallback((node) => {
    const { id, index, parentId, expandable } = node;

    nodeMap.current[id] = { id, index, parentId, expandable };
  }, []);

  const getNodesToRemove = React.useCallback((id) => {
    const map = nodeMap.current[id];
    const nodes = [];
    if (map) {
      nodes.push(id);
      const childNodes = getChildrenIds(id);
      if (childNodes.length > 0) {
        nodes.concat(childNodes);
        childNodes.forEach((node) => {
          nodes.concat(getNodesToRemove(node));
        });
      }
    }
    return nodes;
  }, []);

  const cleanUpFirstCharMap = React.useCallback((nodes) => {
    const newMap = { ...firstCharMap.current };
    nodes.forEach((node) => {
      delete newMap[node];
    });
    firstCharMap.current = newMap;
  }, []);

  const cleanUpNodeMap = React.useCallback((nodes) => {
    const newMap = { ...nodeMap.current };
    nodes.forEach((node) => {
      delete newMap[node];
    });
    nodeMap.current = newMap;
  }, []);

  const unregisterNode = React.useCallback(
    (id) => {
      const nodes = getNodesToRemove(id);
      cleanUpFirstCharMap(nodes);
      cleanUpNodeMap(nodes);

      setFocusedNodeId((oldFocusedNodeId) => {
        if (nodeMap.current[oldFocusedNodeId] === undefined) {
          return null;
        }
        return oldFocusedNodeId;
      });
    },
    [getNodesToRemove, cleanUpFirstCharMap, cleanUpNodeMap],
  );

  const mapFirstChar = (id, firstChar) => {
    firstCharMap.current[id] = firstChar;
  };

  React.useEffect(() => {
    setTabbable((oldTabbable) => {
      if (!oldTabbable) {
        return descendants[0]?.id;
      }

      return oldTabbable;
    });
  }, [descendants]);

  const noopSelection = () => {
    return false;
  };

  return (
    <TreeViewContext.Provider
      value={{
        icons: { defaultCollapseIcon, defaultExpandIcon, defaultParentIcon, defaultEndIcon },
        focus,
        focusFirstNode,
        focusLastNode,
        focusNextNode,
        focusPreviousNode,
        focusByFirstCharacter,
        expandAllSiblings,
        toggleExpansion,
        isExpanded,
        isFocused,
        isSelected,
        selectNode: disableSelection ? noopSelection : selectNode,
        selectRange: disableSelection ? noopSelection : selectRange,
        selectNextNode: disableSelection ? noopSelection : selectNextNode,
        selectPreviousNode: disableSelection ? noopSelection : selectPreviousNode,
        rangeSelectToFirst: disableSelection ? noopSelection : rangeSelectToFirst,
        rangeSelectToLast: disableSelection ? noopSelection : rangeSelectToLast,
        selectAllNodes: disableSelection ? noopSelection : selectAllNodes,
        isTabbable,
        multiSelect,
        getParent,
        mapFirstChar,
        registerNode,
        unregisterNode,
      }}
    >
      <DescendantProvider items={descendants} set={setDescendants}>
        <ul
          role="tree"
          aria-multiselectable={multiSelect}
          className={clsx(classes.root, className)}
          ref={ref}
          {...other}
        >
          {children}
        </ul>
      </DescendantProvider>
    </TreeViewContext.Provider>
  );
});

TreeView.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The default icon used to collapse the node.
   */
  defaultCollapseIcon: PropTypes.node,
  /**
   * The default icon displayed next to a end node. This is applied to all
   * tree nodes and can be overridden by the TreeItem `icon` prop.
   */
  defaultEndIcon: PropTypes.node,
  /**
   * Expanded node ids. (Uncontrolled)
   */
  defaultExpanded: PropTypes.arrayOf(PropTypes.string),
  /**
   * The default icon used to expand the node.
   */
  defaultExpandIcon: PropTypes.node,
  /**
   * The default icon displayed next to a parent node. This is applied to all
   * parent nodes and can be overridden by the TreeItem `icon` prop.
   */
  defaultParentIcon: PropTypes.node,
  /**
   * Selected node ids. (Uncontrolled)
   * When `multiSelect` is true this takes an array of strings; when false (default) a string.
   */
  defaultSelected: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  /**
   * If `true` selection is disabled.
   */
  disableSelection: PropTypes.bool,
  /**
   * Expanded node ids. (Controlled)
   */
  expanded: PropTypes.arrayOf(PropTypes.string),
  /**
   * If true `ctrl` and `shift` will trigger multiselect.
   */
  multiSelect: PropTypes.bool,
  /**
   * Callback fired when tree items are selected/unselected.
   *
   * @param {object} event The event source of the callback
   * @param {(array|string)} value of the selected nodes. When `multiSelect` is true
   * this is an array of strings; when false (default) a string.
   */
  onNodeSelect: PropTypes.func,
  /**
   * Callback fired when tree items are expanded/collapsed.
   *
   * @param {object} event The event source of the callback.
   * @param {array} nodeIds The ids of the expanded nodes.
   */
  onNodeToggle: PropTypes.func,
  /**
   * Selected node ids. (Controlled)
   * When `multiSelect` is true this takes an array of strings; when false (default) a string.
   */
  selected: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
};

export default withStyles(styles, { name: 'MuiTreeView' })(TreeView);
