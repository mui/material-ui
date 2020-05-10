/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions  */
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import { withStyles, useTheme } from '@material-ui/core/styles';
import { useForkRef } from '@material-ui/core/utils';
import TreeViewContext from '../TreeView/TreeViewContext';
import TreeItemContent from './TreeItemContent';
import { useDescendant, useDescendants, DescendantProvider } from '../TreeView/descendants';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    outline: 0,
  },
  /* Styles applied to the `role="group"` element. */
  group: {
    margin: 0,
    padding: 0,
    marginLeft: 17,
  },
  /* Styles applied to the tree node content. */
  content: {},
  /* Styles applied to the TreeItemIcon */
  iconContainer: {},
  label: {},
  selected: {},
  expanded: {},
  focused: {},
};

const isPrintableCharacter = (str) => {
  return str && str.length === 1 && str.match(/\S/);
};

const TreeItem = React.forwardRef(function TreeItem(props, ref) {
  const {
    children,
    classes,
    className,
    collapseIcon,
    contentProps,
    endIcon,
    expandIcon,
    parentIcon,
    icon,
    label,
    nodeId,
    onClick,
    onFocus,
    onKeyDown,
    onMouseDown,
    TransitionComponent = Collapse,
    TransitionProps,
    TreeItemContentComponent = TreeItemContent,
    ...other
  } = props;

  const {
    icons: contextIcons,
    focus,
    focusFirstNode,
    focusLastNode,
    focusNextNode,
    focusPreviousNode,
    focusByFirstCharacter,
    selectNode,
    selectRange,
    selectNextNode,
    selectPreviousNode,
    rangeSelectToFirst,
    rangeSelectToLast,
    selectAllNodes,
    expandAllSiblings,
    toggleExpansion,
    isExpanded,
    isFocused,
    isSelected,
    isTabbable,
    multiSelect,
    mapFirstChar,
    registerNode,
    unregisterNode,
  } = React.useContext(TreeViewContext);

  const nodeRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const handleRef = useForkRef(nodeRef, ref);

  const { index, parent } = useDescendant({ parent: nodeId, label });
  const itemsRef = useDescendants();

  const expandable = Boolean(Array.isArray(children) ? children.length : children);
  const expanded = isExpanded ? isExpanded(nodeId) : false;
  const focused = isFocused ? isFocused(nodeId) : false;
  const tabbable = isTabbable ? isTabbable(nodeId) : false;
  const selected = isSelected ? isSelected(nodeId) : false;
  const theme = useTheme();

  const icons = contextIcons || {};

  let expansionIcon = null;

  if (expandable) {
    if (!expanded) {
      expansionIcon = expandIcon || icons.defaultExpandIcon;
    } else {
      expansionIcon = collapseIcon || icons.defaultCollapseIcon;
    }
  }

  let displayIcon = null;

  if (expandable) {
    displayIcon = parentIcon || icons.defaultParentIcon;
  } else {
    displayIcon = endIcon || icons.defaultEndIcon;
  }

  const handleExpansion = (event) => {
    const multiple = multiSelect && (event.shiftKey || event.ctrlKey || event.metaKey);

    // If already expanded and trying to toggle selection don't close
    if (expandable && !(multiple && isExpanded(nodeId))) {
      toggleExpansion(event, nodeId);
    }
  };

  const handleSelection = (event) => {
    if (!focused) {
      focus(nodeId);
    }

    const multiple = multiSelect && (event.shiftKey || event.ctrlKey || event.metaKey);

    if (multiple) {
      if (event.shiftKey) {
        selectRange(event, { end: nodeId });
      } else {
        selectNode(event, nodeId, true);
      }
    } else {
      selectNode(event, nodeId);
    }
  };

  const handleMouseDown = (event) => {
    if (event.shiftKey || event.ctrlKey || event.metaKey) {
      // Prevent text selection
      event.preventDefault();
    }

    if (onMouseDown) {
      onMouseDown(event);
    }
  };

  const handleNextArrow = (event) => {
    if (expandable) {
      if (expanded) {
        focusNextNode(nodeId);
      } else {
        toggleExpansion(event);
      }
    }
    return true;
  };

  const handlePreviousArrow = (event) => {
    if (expanded) {
      toggleExpansion(event, nodeId);
      return true;
    }

    if (parent) {
      focus(parent);
      return true;
    }
    return false;
  };

  const handleKeyDown = (event) => {
    let flag = false;
    const key = event.key;

    if (event.altKey || event.currentTarget !== event.target) {
      return;
    }

    const ctrlPressed = event.ctrlKey || event.metaKey;

    switch (key) {
      case ' ':
        if (nodeRef.current === event.currentTarget) {
          if (multiSelect && event.shiftKey) {
            flag = selectRange(event, { end: nodeId });
          } else if (multiSelect) {
            flag = selectNode(event, nodeId, true);
          } else {
            flag = selectNode(event, nodeId);
          }
        }
        event.stopPropagation();
        break;
      case 'Enter':
        if (nodeRef.current === event.currentTarget && expandable) {
          toggleExpansion(event);
          flag = true;
        }
        event.stopPropagation();
        break;
      case 'ArrowDown':
        if (multiSelect && event.shiftKey) {
          selectNextNode(event, nodeId);
        }
        focusNextNode(nodeId);
        flag = true;
        break;
      case 'ArrowUp':
        if (multiSelect && event.shiftKey) {
          selectPreviousNode(event, nodeId);
        }
        focusPreviousNode(nodeId);
        flag = true;
        break;
      case 'ArrowRight':
        if (theme.direction === 'rtl') {
          flag = handlePreviousArrow(event);
        } else {
          flag = handleNextArrow(event);
        }
        break;
      case 'ArrowLeft':
        if (theme.direction === 'rtl') {
          flag = handleNextArrow(event);
        } else {
          flag = handlePreviousArrow(event);
        }
        break;
      case 'Home':
        if (multiSelect && ctrlPressed && event.shiftKey) {
          rangeSelectToFirst(event, nodeId);
        }
        focusFirstNode();
        flag = true;
        break;
      case 'End':
        if (multiSelect && ctrlPressed && event.shiftKey) {
          rangeSelectToLast(event, nodeId);
        }
        focusLastNode();
        flag = true;
        break;
      default:
        if (key === '*') {
          expandAllSiblings(event, nodeId);
          flag = true;
        } else if (multiSelect && ctrlPressed && key.toLowerCase() === 'a') {
          flag = selectAllNodes(event);
        } else if (!ctrlPressed && !event.shiftKey && isPrintableCharacter(key)) {
          focusByFirstCharacter(nodeId, key);
          flag = true;
        }
    }

    if (flag) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  const handleFocus = (event) => {
    if (!focused && event.currentTarget === event.target) {
      focus(nodeId);
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  React.useEffect(() => {
    if (registerNode && unregisterNode) {
      registerNode({
        id: nodeId,
        label,
        parent,
        index: index.current,
      });

      return () => {
        unregisterNode(nodeId);
      };
    }

    return undefined;
  }, [nodeId, parent, label, registerNode, unregisterNode, index]);

  React.useEffect(() => {
    if (mapFirstChar && label) {
      mapFirstChar(nodeId, contentRef.current.textContent.substring(0, 1).toLowerCase());
    }
  }, [mapFirstChar, nodeId, label]);

  React.useEffect(() => {
    if (focused) {
      nodeRef.current.focus();
    }
  }, [focused]);

  let ariaSelected;
  if (multiSelect) {
    ariaSelected = selected;
  } else if (selected) {
    /* single-selection trees unset aria-selected on un-selected items.
     *
     * If the tree does not support multiple selection, aria-selected
     * is set to true for the selected node and it is not present on any other node in the tree.
     * Source: https://www.w3.org/TR/wai-aria-practices/#TreeView
     */
    ariaSelected = true;
  }

  return (
    <DescendantProvider nodeId={nodeId} items={itemsRef}>
      <li
        className={clsx(classes.root, className)}
        role="treeitem"
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        aria-expanded={expandable ? expanded : null}
        aria-selected={ariaSelected}
        ref={handleRef}
        tabIndex={tabbable ? 0 : -1}
        {...other}
      >
        <TreeItemContentComponent
          classes={{
            root: classes.content,
            iconContainer: classes.iconContainer,
            label: classes.label,
            selected: classes.selected,
            expanded: classes.expanded,
            focused: classes.focused,
          }}
          onMouseDown={handleMouseDown}
          label={label}
          expanded={expanded}
          selected={selected}
          focused={focused}
          handleExpansion={handleExpansion}
          handleSelection={handleSelection}
          icon={icon}
          expansionIcon={expansionIcon}
          displayIcon={displayIcon}
          ref={contentRef}
          onClick={onClick}
          {...contentProps}
        />
        {children && (
          <TransitionComponent
            unmountOnExit
            className={classes.group}
            in={expanded}
            component="ul"
            role="group"
            {...TransitionProps}
          >
            {children}
          </TransitionComponent>
        )}
      </li>
    </DescendantProvider>
  );
});

TreeItem.propTypes = {
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
   * The icon used to collapse the node.
   */
  collapseIcon: PropTypes.node,
  /**
   * Props applied to TreeItemContent
   */
  contentProps: PropTypes.object,
  /**
   * The icon displayed next to an end node.
   */
  endIcon: PropTypes.node,
  /**
   * The icon used to expand the node.
   */
  expandIcon: PropTypes.node,
  /**
   * The icon to display next to the tree node's label.
   */
  icon: PropTypes.node,
  /**
   * The tree node label.
   */
  label: PropTypes.node,
  /**
   * The id of the node.
   */
  nodeId: PropTypes.string.isRequired,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onMouseDown: PropTypes.func,
  /**
   * The icon displayed next to a parent node.
   */
  parentIcon: PropTypes.node,
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   */
  TransitionComponent: PropTypes.elementType,
  /**
   * Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element.
   */
  TransitionProps: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiTreeItem' })(TreeItem);
