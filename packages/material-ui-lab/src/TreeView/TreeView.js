import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import TreeViewContext from './TreeViewContext';
import { withStyles } from '@material-ui/core/styles';
import { useStateChangeWarning } from '@material-ui/core/utils';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
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
  const [tabable, setTabable] = React.useState(null);
  const [focused, setFocused] = React.useState(null);

  const nodeMap = React.useRef({});
  const firstCharMap = React.useRef({});
  const visibleNodes = React.useRef([]);

  const { current: isControlledExpanded } = React.useRef(expandedProp !== undefined);
  const [expandedState, setExpandedState] = React.useState(defaultExpanded);
  const expanded = (isControlledExpanded ? expandedProp : expandedState) || defaultExpandedDefault;

  const { current: isControlledSelected } = React.useRef(selectedProp !== undefined);
  const [selectedState, setSelectedState] = React.useState(defaultSelected);
  const selected = (isControlledSelected ? selectedProp : selectedState) || defaultSelectedDefault;

  useStateChangeWarning('TreeView', isControlledExpanded, expandedProp, 'expanded');
  useStateChangeWarning('TreeView', isControlledSelected, selectedProp, 'selected');

  /*
   * Status Helpers
   */
  const isExpanded = React.useCallback(id => expanded.indexOf(id) !== -1, [expanded]);
  const isSelected = React.useCallback(
    id => (Array.isArray(selected) ? selected.indexOf(id) !== -1 : selected === id),
    [selected],
  );
  const isTabable = id => tabable === id;
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
      setTabable(id);
      setFocused(id);
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
      setTabable(oldTabable => {
        const map = nodeMap.current[oldTabable];
        if (oldTabable && (map && map.parent ? map.parent.id : null) === value) {
          return value;
        }
        return oldTabable;
      });
    } else {
      newExpanded = [value, ...expanded];
    }

    if (onNodeToggle) {
      onNodeToggle(event, newExpanded);
    }

    if (!isControlledExpanded) {
      setExpandedState(newExpanded);
    }
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

    if (!isControlledExpanded) {
      setExpandedState(newExpanded);
    }

    if (onNodeToggle) {
      onNodeToggle(event, newExpanded);
    }
  };

  /*
   * Selection Helpers
   */

  const lastSelectedNode = React.useRef(null);
  const lastSelectionMode = React.useRef(null);
  const lastRangeSelection = React.useRef([]);

  const handleRangeSelect = (event, start, end) => {
    let base = selected;
    // If last selection was a range selection ignore nodes that were selected.
    if (lastSelectionMode.current === 'RANGE') {
      base = selected.filter(id => lastRangeSelection.current.indexOf(id) === -1);
    }

    const range = getNodesInRange(start, end);
    lastRangeSelection.current = range;
    let newSelected = base.concat(range);
    newSelected = newSelected.filter((id, i) => newSelected.indexOf(id) === i);

    if (onNodeSelect) {
      onNodeSelect(event, newSelected);
    }

    if (!isControlledSelected) {
      setSelectedState(newSelected);
    }
  };

  const handleMultipleSelect = (event, value) => {
    let newSelected = [];
    if (selected.indexOf(value) !== -1) {
      newSelected = selected.filter(id => id !== value);
    } else {
      newSelected = [value, ...selected];
    }

    if (onNodeSelect) {
      onNodeSelect(event, newSelected);
    }

    if (!isControlledSelected) {
      setSelectedState(newSelected);
    }
  };

  const handleSingleSelect = (event, value) => {
    const newSelected = multiSelect ? [value] : value;
    setSelectedState(newSelected);

    if (onNodeSelect) {
      onNodeSelect(event, newSelected);
    }

    if (!isControlledSelected) {
      setSelectedState(newSelected);
    }
  };

  const rangeSelectFirst = (event, start) => handleRangeSelect(event, start, getFirstNode());
  const rangeSelectLast = (event, start) => handleRangeSelect(event, start, getLastNode());

  const select = (event, value, selectionMode = 'NODE') => {
    if (value) {
      if (selectionMode === 'NONE') {
        handleSingleSelect(event, value);
      } else if (selectionMode === 'MULTIPLE') {
        handleMultipleSelect(event, value);
      } else if (selectionMode === 'RANGE' && lastSelectedNode.current) {
        handleRangeSelect(event, lastSelectedNode.current, value);
      }
      if (selectionMode === 'MULTIPLE' || selectionMode === 'NONE') {
        lastSelectedNode.current = value;
      }
      lastSelectionMode.current = selectionMode;
    }
  };

  const selectNextNode = (event, id) => select(event, getNextNode(id), 'MULTIPLE');
  const selectPreviousNode = (event, id) => select(event, getPreviousNode(id), 'MULTIPLE');
  const selectAllNodes = event => rangeSelectLast(event, visibleNodes.current[0]);

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

  const removeNodeFromNodeMap = id => {
    const map = nodeMap.current[id];
    if (map) {
      if (map.parent) {
        const parentMap = nodeMap.current[map.parent];
        if (parentMap && parentMap.children) {
          const parentChildren = parentMap.children.filter(c => c !== id);
          nodeMap.current[map.parent] = { ...parentMap, children: parentChildren };
        }
      }

      delete nodeMap.current[id];
    }
  };

  const mapFirstChar = (id, firstChar) => {
    firstCharMap.current[id] = firstChar;
  };

  const prevChildIds = React.useRef([]);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    const childIds = React.Children.map(children, child => child.props.nodeId) || [];
    if (arrayDiff(prevChildIds.current, childIds)) {
      nodeMap.current[-1] = { parent: null, children: childIds };

      childIds.forEach((id, index) => {
        if (index === 0) {
          setTabable(id);
        }
        nodeMap.current[id] = { parent: null };
      });
      visibleNodes.current = nodeMap.current[-1].children;
      prevChildIds.current = childIds;
      setMounted(true);
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

    if (mounted) {
      visibleNodes.current = buildVisible(nodeMap.current[-1].children);
    }
  }, [expanded, mounted, isExpanded]);

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
        rangeSelectFirst,
        rangeSelectLast,
        selectAllNodes,
        selectNextNode,
        selectPreviousNode,
        select,
        expandAllSiblings,
        toggleExpansion,
        isExpanded,
        isFocused,
        isSelected,
        isTabable,
        multiSelect,
        selectionDisabled: disableSelection,
        getParent,
        mapFirstChar,
        addNodeToNodeMap,
        removeNodeFromNodeMap,
      }}
    >
      <ul
        role="tree"
        aria-multiselectable={multiSelect}
        className={clsx(classes.root, className)}
        ref={ref}
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
   */
  defaultSelected: PropTypes.arrayOf(PropTypes.string),
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
   * @param {array} nodeIds The ids of the selected nodes.
   */
  onNodeSelect: PropTypes.func,
  /**
   * Callback fired when tree items are expanded/collapsed.
   *
   * @param {object} event The event source of the callback
   * @param {array} nodeIds The ids of the expanded nodes.
   */
  onNodeToggle: PropTypes.func,
  /**
   * Selected node ids. (Controlled)
   */
  selected: PropTypes.arrayOf(PropTypes.string),
};

export default withStyles(styles, { name: 'MuiTreeView' })(TreeView);
