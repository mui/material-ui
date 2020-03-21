import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import TreeViewContext from './TreeViewContext';
import { withStyles } from '@material-ui/core/styles';
import { useControlled, useForkRef } from '@material-ui/core/utils';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
    outline: 'none',
  },
};

function arrayDiff(arr1, arr2) {
  if (arr1.length !== arr2.length) return true;

  for (let i = 0; i < arr1.length; i += 1) {
    if (arr1[i] !== arr2[i]) return true;
  }

  return false;
}

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
  const [focused, setFocused] = React.useState(null);
  const [treeTabbable, setTreeTabbable] = React.useState(true);

  const treeRef = React.useRef(null);
  const handleRef = useForkRef(treeRef, ref);
  const nodeMap = React.useRef({});
  const firstCharMap = React.useRef({});
  const visibleNodes = React.useRef([]);

  const [expanded, setExpandedState] = useControlled({
    controlled: expandedProp,
    default: defaultExpanded,
    name: 'TreeView',
  });

  const [selected, setSelectedState] = useControlled({
    controlled: selectedProp,
    default: defaultSelected,
    name: 'TreeView',
  });

  /*
   * Status Helpers
   */
  const isExpanded = React.useCallback(
    id => (Array.isArray(expanded) ? expanded.indexOf(id) !== -1 : false),
    [expanded],
  );

  const isSelected = React.useCallback(
    id => (Array.isArray(selected) ? selected.indexOf(id) !== -1 : selected === id),
    [selected],
  );

  const isFocused = id => focused === id;

  /*
   * Node Helpers
   */

  const getNextNode = id => {
    const nodeIndex = visibleNodes.current.indexOf(id);
    if (nodeIndex !== -1 && nodeIndex + 1 < visibleNodes.current.length) {
      return visibleNodes.current[nodeIndex + 1];
    }
    return null;
  };

  const getPreviousNode = id => {
    const nodeIndex = visibleNodes.current.indexOf(id);
    if (nodeIndex !== -1 && nodeIndex - 1 >= 0) {
      return visibleNodes.current[nodeIndex - 1];
    }
    return null;
  };

  const getLastNode = () => visibleNodes.current[visibleNodes.current.length - 1];
  const getFirstNode = () => visibleNodes.current[0];
  const getParent = id => nodeMap.current[id].parent;

  const getNodesInRange = (a, b) => {
    const aIndex = visibleNodes.current.indexOf(a);
    const bIndex = visibleNodes.current.indexOf(b);
    const start = Math.min(aIndex, bIndex);
    const end = Math.max(aIndex, bIndex);
    return visibleNodes.current.slice(start, end + 1);
  };

  /*
   * Focus Helpers
   */

  const focus = id => {
    if (id) {
      if (treeTabbable) {
        setTreeTabbable(false);
      }
      setFocused(id);
    }
  };

  const unfocus = event => {
    if (!treeRef.current.contains(event.relatedTarget)) {
      setFocused(null);
      setTreeTabbable(true);
    }
  };

  const focusNextNode = id => focus(getNextNode(id));
  const focusPreviousNode = id => focus(getPreviousNode(id));
  const focusFirstNode = () => focus(getFirstNode());
  const focusLastNode = () => focus(getLastNode());

  const focusByFirstCharacter = (id, char) => {
    let start;
    let index;
    const lowercaseChar = char.toLowerCase();

    const firstCharIds = [];
    const firstChars = [];
    // This really only works since the ids are strings
    Object.keys(firstCharMap.current).forEach(nodeId => {
      const firstChar = firstCharMap.current[nodeId];
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

  const toggleExpansion = (event, value = focused) => {
    let newExpanded;
    if (expanded.indexOf(value) !== -1) {
      newExpanded = expanded.filter(id => id !== value);
    } else {
      newExpanded = [value, ...expanded];
    }

    if (onNodeToggle) {
      onNodeToggle(event, newExpanded);
    }

    setExpandedState(newExpanded);
  };

  const expandAllSiblings = (event, id) => {
    const map = nodeMap.current[id];
    const parent = nodeMap.current[map.parent];

    let diff;
    if (parent) {
      diff = parent.children.filter(child => !isExpanded(child));
    } else {
      const topLevelNodes = nodeMap.current[-1].children;
      diff = topLevelNodes.filter(node => !isExpanded(node));
    }
    const newExpanded = [...expanded, ...diff];

    setExpandedState(newExpanded);

    if (onNodeToggle) {
      onNodeToggle(event, newExpanded);
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
        base = base.filter(id => id === start || id !== current);
        currentRangeSelection.current = currentRangeSelection.current.filter(
          id => id === start || id !== current,
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
      base = selected.filter(id => currentRangeSelection.current.indexOf(id) === -1);
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
    let newSelected = [];
    if (selected.indexOf(value) !== -1) {
      newSelected = selected.filter(id => id !== value);
    } else {
      newSelected = [...selected, value];
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
    }
  };

  const selectRange = (event, nodes, stacked = false) => {
    const { start = lastSelectedNode.current, end, current } = nodes;
    if (stacked) {
      handleRangeArrowSelect(event, { start, next: end, current });
    } else {
      handleRangeSelect(event, { start, end });
    }
    lastSelectionWasRange.current = true;
  };

  const rangeSelectToFirst = (event, id) => {
    if (!lastSelectedNode.current) {
      lastSelectedNode.current = id;
    }

    const start = lastSelectionWasRange.current ? lastSelectedNode.current : id;

    selectRange(event, {
      start,
      end: getFirstNode(),
    });
  };

  const rangeSelectToLast = (event, id) => {
    if (!lastSelectedNode.current) {
      lastSelectedNode.current = id;
    }

    const start = lastSelectionWasRange.current ? lastSelectedNode.current : id;

    selectRange(event, {
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

  const selectAllNodes = event => selectRange(event, { start: getFirstNode(), end: getLastNode() });

  /*
   * Mapping Helpers
   */

  const addNodeToNodeMap = (id, childrenIds) => {
    const currentMap = nodeMap.current[id];
    nodeMap.current[id] = { ...currentMap, children: childrenIds, id };

    childrenIds.forEach(childId => {
      const currentChildMap = nodeMap.current[childId];
      nodeMap.current[childId] = { ...currentChildMap, parent: id, id: childId };
    });
  };

  const getNodesToRemove = React.useCallback(id => {
    const map = nodeMap.current[id];
    const nodes = [];
    if (map) {
      nodes.push(id);
      if (map.children) {
        nodes.push(...map.children);
        map.children.forEach(node => {
          nodes.push(...getNodesToRemove(node));
        });
      }
    }
    return nodes;
  }, []);

  const removeNodeFromNodeMap = React.useCallback(
    id => {
      const nodes = getNodesToRemove(id);
      const newMap = { ...nodeMap.current };

      nodes.forEach(node => {
        const map = newMap[node];
        if (map) {
          if (map.parent) {
            const parentMap = newMap[map.parent];
            if (parentMap && parentMap.children) {
              const parentChildren = parentMap.children.filter(c => c !== node);
              newMap[map.parent] = { ...parentMap, children: parentChildren };
            }
          }

          delete newMap[node];
        }
      });
      nodeMap.current = newMap;
    },
    [getNodesToRemove],
  );

  const getVisible = nodeId => {
    let visible = true;
    const map = nodeMap.current;
    const node = map[nodeId];
    let parent = node.parent;
    while (parent) {
      const parentNode = map[parent];
      if (expanded.indexOf(parent) === -1) {
        visible = false;
        break;
      }
      parent = parentNode.parent;
    }
    return visible;
  };

  const ensureVisible = nodeId => {
    const newExpanded = [];

    const map = nodeMap.current;
    const node = map[nodeId];
    let parent = node.parent;
    while (parent) {
      const parentNode = map[parent];
      if (expanded.indexOf(parent) === -1) {
        newExpanded.push(parent);
      }
      parent = parentNode.parent;
    }

    if (newExpanded.length > 0) {
      setExpandedState([expanded.current].concat(newExpanded));
    }
  };

  const focusSelected = selectedNode => {
    if (getVisible(selectedNode)) {
      focus(selectedNode);
    } else {
      // could have a prop for this scenario

      // expand into view
      ensureVisible(selectedNode);
      focus(selectedNode);

      // or focusFirstChild();
    }
  };

  const ensureSelectedIsCurrent = () => {
    let actualSelected = selected;
    if (Array.isArray(selected)) {
      const currentSelected = selected.filter(s => !!nodeMap.current[s]);
      if (currentSelected.length !== selected.length) {
        actualSelected = currentSelected;
        setSelectedState(currentSelected);
      }
    } else if (!nodeMap.current[selected]) {
      actualSelected = null;
      setSelectedState([]);
    }
    return actualSelected;
  };

  const handleFocus = event => {
    const focusFirstChild = () => {
      const topLevelChildren = nodeMap.current[-1].children;
      if (topLevelChildren.length > 0) {
        focus(topLevelChildren[0]);
      }
    };

    if (event.currentTarget === event.target) {
      const actualSelected = ensureSelectedIsCurrent();
      if (multiSelect) {
        if (actualSelected && actualSelected.length > 0) {
          focusSelected(actualSelected[0]);
        } else {
          focusFirstChild();
        }
      } else if (!Array.isArray(actualSelected) && actualSelected) {
        focusSelected(actualSelected);
      } else {
        focusFirstChild();
      }
      setTreeTabbable(false);
    }
  };

  const mapFirstChar = (id, firstChar) => {
    firstCharMap.current[id] = firstChar;
  };

  const prevChildIds = React.useRef([]);
  const [childrenCalculated, setChildrenCalculated] = React.useState(false);
  React.useEffect(() => {
    const childIds = [];

    React.Children.forEach(children, child => {
      if (React.isValidElement(child) && child.props.nodeId) {
        childIds.push(child.props.nodeId);
      }
    });
    if (arrayDiff(prevChildIds.current, childIds)) {
      nodeMap.current[-1] = { parent: null, children: childIds };
      visibleNodes.current = nodeMap.current[-1].children;
      prevChildIds.current = childIds;
      setChildrenCalculated(true);
    }
  }, [children]);

  React.useEffect(() => {
    const buildVisible = nodes => {
      let list = [];
      for (let i = 0; i < nodes.length; i += 1) {
        const item = nodes[i];
        list.push(item);
        const childs = nodeMap.current[item].children;
        if (isExpanded(item) && childs) {
          list = list.concat(buildVisible(childs));
        }
      }
      return list;
    };

    if (childrenCalculated) {
      visibleNodes.current = buildVisible(nodeMap.current[-1].children);
    }
  }, [expanded, childrenCalculated, isExpanded]);

  React.useEffect(() => {
    if (!treeTabbable) {
      if (!nodeMap.current[focused]) {
        treeRef.current.focus();
      }
    }
  }, [children, treeTabbable, nodeMap, focused, setTreeTabbable]);

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
        selectNode,
        selectRange,
        selectNextNode,
        selectPreviousNode,
        rangeSelectToFirst,
        rangeSelectToLast,
        selectAllNodes,
        multiSelect,
        selectionDisabled: disableSelection,
        getParent,
        mapFirstChar,
        addNodeToNodeMap,
        removeNodeFromNodeMap,
        unfocus,
      }}
    >
      <ul
        role="tree"
        aria-multiselectable={multiSelect}
        className={clsx(classes.root, className)}
        ref={handleRef}
        tabIndex={treeTabbable ? 0 : -1}
        onFocus={handleFocus}
        {...other}
      >
        {children}
      </ul>
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
