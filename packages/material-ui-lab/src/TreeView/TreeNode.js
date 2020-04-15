/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions  */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useForkRef } from '@material-ui/core/utils';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import TreeViewContext from './TreeViewContext';

const isPrintableCharacter = (str) => {
  return str && str.length === 1 && str.match(/\S/);
};

function TreeNode(props) {
  const { nodeId } = props;
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
    getNode,
    setNodeRef,
    registerFirstChar,
  } = React.useContext(TreeViewContext);

  const contentRef = React.useRef(null);
  const nodeRef = React.useRef(null);
  const registerNodeRef = React.useCallback(
    (instance) => {
      setNodeRef(nodeId, instance);
    },
    [nodeId, setNodeRef],
  );
  const handleRef = useForkRef(registerNodeRef, nodeRef);
  const theme = useTheme();

  const node = getNode(nodeId);
  const expanded = isExpanded ? isExpanded(nodeId) : false;
  const focused = isFocused ? isFocused(nodeId) : false;
  const tabbable = isTabbable ? isTabbable(nodeId) : false;
  const selected = isSelected ? isSelected(nodeId) : false;
  const icons = contextIcons || {};

  React.useEffect(() => {
    if (focused) {
      nodeRef.current.focus();
    }
  }, [focused]);

  const label = node ? node.label : null;

  React.useEffect(() => {
    if (registerFirstChar && label) {
      registerFirstChar(nodeId, contentRef.current.textContent.substring(0, 1).toLowerCase());
    }
  }, [registerFirstChar, nodeId, label]);

  if (!node) {
    return null;
  }

  const {
    children,
    props: {
      classes,
      className,
      collapseIcon,
      endIcon,
      expandIcon,
      icon: iconProp,
      onClick,
      onFocus,
      onKeyDown,
      onMouseDown,
      TransitionComponent = Collapse,
      TransitionProps,
      ...other
    },
  } = node;

  let icon = iconProp;
  const expandable = Boolean(Array.isArray(node.children) ? node.children.length : node.children);

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
    if (expandable && !(multiple && isExpanded(nodeId))) {
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

    if (node.parent) {
      focus(node.parent);
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
        <div className={classes.iconContainer}>{icon}</div>
        <Typography component="div" className={classes.label}>
          {node.label}
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
          {children.map((i) => (
            <TreeNode key={i} nodeId={i} />
          ))}
        </TransitionComponent>
      )}
    </li>
  );
}

TreeNode.propTypes = {
  /**
   * The id of the node.
   */
  nodeId: PropTypes.string.isRequired,
};

export default TreeNode;
