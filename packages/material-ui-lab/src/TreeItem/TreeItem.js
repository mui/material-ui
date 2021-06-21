/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions  */
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { fade, withStyles, useTheme } from '@material-ui/core/styles';
import { useForkRef } from '@material-ui/core/utils';
import TreeViewContext from '../TreeView/TreeViewContext';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    outline: 0,
    WebkitTapHighlightColor: 'transparent',
    '&:focus > $content $label': {
      backgroundColor: theme.palette.action.hover,
    },
    '&$selected > $content $label': {
      backgroundColor: fade(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    },
    '&$selected > $content $label:hover, &$selected:focus > $content $label': {
      backgroundColor: fade(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
      ),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  /* Pseudo-class applied to the root element when expanded. */
  expanded: {},
  /* Pseudo-class applied to the root element when selected. */
  selected: {},
  /* Styles applied to the `role="group"` element. */
  group: {
    margin: 0,
    padding: 0,
    marginLeft: 17,
  },
  /* Styles applied to the tree node content. */
  content: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  /* Styles applied to the tree node icon and collapse/expand icon. */
  iconContainer: {
    marginRight: 4,
    width: 15,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    '& svg': {
      fontSize: 18,
    },
  },
  /* Styles applied to the label element. */
  label: {
    width: '100%',
    paddingLeft: 4,
    position: 'relative',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
});

const isPrintableCharacter = (str) => {
  return str && str.length === 1 && str.match(/\S/);
};

const TreeItem = React.forwardRef(function TreeItem(props, ref) {
  const {
    children,
    classes,
    className,
    collapseIcon,
    endIcon,
    expandIcon,
    icon: iconProp,
    label,
    nodeId,
    onClick,
    onLabelClick,
    onIconClick,
    onFocus,
    onKeyDown,
    onMouseDown,
    TransitionComponent = Collapse,
    TransitionProps,
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
    getParent,
    mapFirstChar,
    addNodeToNodeMap,
    removeNodeFromNodeMap,
  } = React.useContext(TreeViewContext);

  const nodeRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const handleRef = useForkRef(nodeRef, ref);

  let icon = iconProp;

  const expandable = Boolean(Array.isArray(children) ? children.length : children);
  const expanded = isExpanded ? isExpanded(nodeId) : false;
  const focused = isFocused ? isFocused(nodeId) : false;
  const tabbable = isTabbable ? isTabbable(nodeId) : false;
  const selected = isSelected ? isSelected(nodeId) : false;
  const icons = contextIcons || {};
  const theme = useTheme();

  if (!icon) {
    if (expandable) {
      if (!expanded) {
        icon = expandIcon || icons.defaultExpandIcon;
      } else {
        icon = collapseIcon || icons.defaultCollapseIcon;
      }

      if (!icon) {
        icon = icons.defaultParentIcon;
      }
    } else {
      icon = endIcon || icons.defaultEndIcon;
    }
  }

  const handleClick = (event) => {
    if (!focused) {
      focus(nodeId);
    }

    const multiple = multiSelect && (event.shiftKey || event.ctrlKey || event.metaKey);

    // If already expanded and trying to toggle selection don't close
    if (expandable && !event.defaultPrevented && !(multiple && isExpanded(nodeId))) {
      toggleExpansion(event, nodeId);
    }

    if (multiple) {
      if (event.shiftKey) {
        selectRange(event, { end: nodeId });
      } else {
        selectNode(event, nodeId, true);
      }
    } else {
      selectNode(event, nodeId);
    }

    if (onClick) {
      onClick(event);
    }
  };

  const handleMouseDown = (event) => {
    if (event.shiftKey || event.ctrlKey || event.metaKey) {
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

    const parent = getParent(nodeId);
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
    if (addNodeToNodeMap) {
      const childIds = [];
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.props.nodeId) {
          childIds.push(child.props.nodeId);
        }
      });
      addNodeToNodeMap(nodeId, childIds);
    }
  }, [children, nodeId, addNodeToNodeMap]);

  React.useEffect(() => {
    if (removeNodeFromNodeMap) {
      return () => {
        removeNodeFromNodeMap(nodeId);
      };
    }
    return undefined;
  }, [nodeId, removeNodeFromNodeMap]);

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
    // single-selection trees unset aria-selected
    ariaSelected = true;
  }

  return (
    <li
      className={clsx(classes.root, className, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
      })}
      role="treeitem"
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      aria-expanded={expandable ? expanded : null}
      aria-selected={ariaSelected}
      ref={handleRef}
      tabIndex={tabbable ? 0 : -1}
      {...other}
    >
      <div
        className={classes.content}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        ref={contentRef}
      >
        <div onClick={onIconClick} className={classes.iconContainer}>
          {icon}
        </div>
        <Typography onClick={onLabelClick} component="div" className={classes.label}>
          {label}
        </Typography>
      </div>
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
   * The icon displayed next to a end node.
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
   * `onClick` handler for the icon container. Call `event.preventDefault()` to prevent `onNodeToggle` from being called.
   */
  onIconClick: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * `onClick` handler for the label container. Call `event.preventDefault()` to prevent `onNodeToggle` from being called.
   */
  onLabelClick: PropTypes.func,
  /**
   * @ignore
   */
  onMouseDown: PropTypes.func,
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
