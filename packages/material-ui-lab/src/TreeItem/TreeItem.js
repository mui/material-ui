/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions  */
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { withStyles, useTheme } from '@material-ui/core/styles';
import { useForkRef } from '@material-ui/core/utils';
import TreeViewContext from '../TreeView/TreeViewContext';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    outline: 0,
    WebkitTapHighlightColor: 'transparent',
    '&:focus > $content': {
      backgroundColor: theme.palette.grey[400],
    },
  },
  /* Pseudo-class applied to the root element when expanded. */
  expanded: {},
  /* Styles applied to the `role="group"` element. */
  group: {
    margin: 0,
    padding: 0,
    marginLeft: 26,
  },
  /* Styles applied to the tree node content. */
  content: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  /* Styles applied to the tree node icon and collapse/expand icon. */
  iconContainer: {
    marginRight: 2,
    width: 24,
    display: 'flex',
    justifyContent: 'center',
  },
  /* Styles applied to the label element. */
  label: {
    width: '100%',
  },
});

const isPrintableCharacter = str => {
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
    onFocus,
    onKeyDown,
    TransitionComponent = Collapse,
    TransitionProps,
    ...other
  } = props;

  const {
    expandAllSiblings,
    focus,
    focusFirstNode,
    focusLastNode,
    focusNextNode,
    focusPreviousNode,
    handleFirstChars,
    handleLeftArrow,
    addNodeToNodeMap,
    removeNodeFromNodeMap,
    icons: contextIcons,
    isExpanded,
    isFocused,
    isTabbable,
    setFocusByFirstCharacter,
    toggle,
  } = React.useContext(TreeViewContext);

  const nodeRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const handleRef = useForkRef(nodeRef, ref);

  let icon = iconProp;

  const expandable = Boolean(Array.isArray(children) ? children.length : children);
  const expanded = isExpanded ? isExpanded(nodeId) : false;
  const focused = isFocused ? isFocused(nodeId) : false;
  const tabbable = isTabbable ? isTabbable(nodeId) : false;
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

  const handleClick = event => {
    if (!focused) {
      focus(nodeId);
    }

    if (expandable) {
      toggle(event, nodeId);
    }

    if (onClick) {
      onClick(event);
    }
  };

  const printableCharacter = (event, key) => {
    if (key === '*') {
      expandAllSiblings(event, nodeId);
      return true;
    }

    if (isPrintableCharacter(key)) {
      setFocusByFirstCharacter(nodeId, key);
      return true;
    }
    return false;
  };

  const handleNextArrow = event => {
    if (expandable) {
      if (expanded) {
        focusNextNode(nodeId);
      } else {
        toggle(event);
      }
    }
  };

  const handlePreviousArrow = event => {
    handleLeftArrow(nodeId, event);
  };

  const handleKeyDown = event => {
    let flag = false;
    const key = event.key;

    if (event.altKey || event.ctrlKey || event.metaKey || event.currentTarget !== event.target) {
      return;
    }
    if (event.shift) {
      if (key === ' ' || key === 'Enter') {
        event.stopPropagation();
      } else if (isPrintableCharacter(key)) {
        flag = printableCharacter(event, key);
      }
    } else {
      switch (key) {
        case 'Enter':
        case ' ':
          if (nodeRef.current === event.currentTarget && expandable) {
            toggle(event);
            flag = true;
          }
          event.stopPropagation();
          break;
        case 'ArrowDown':
          focusNextNode(nodeId);
          flag = true;
          break;
        case 'ArrowUp':
          focusPreviousNode(nodeId);
          flag = true;
          break;
        case 'ArrowRight':
          if (theme.direction === 'rtl') {
            handlePreviousArrow(event);
          } else {
            handleNextArrow(event);
            flag = true;
          }
          break;
        case 'ArrowLeft':
          if (theme.direction === 'rtl') {
            handleNextArrow(event);
            flag = true;
          } else {
            handlePreviousArrow(event);
          }
          break;
        case 'Home':
          focusFirstNode();
          flag = true;
          break;
        case 'End':
          focusLastNode();
          flag = true;
          break;
        default:
          if (isPrintableCharacter(key)) {
            flag = printableCharacter(event, key);
          }
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

  const handleFocus = event => {
    if (!focused && tabbable) {
      focus(nodeId);
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  React.useEffect(() => {
    const childIds = React.Children.map(children, child => child.props.nodeId) || [];
    if (addNodeToNodeMap) {
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
    if (handleFirstChars && label) {
      handleFirstChars(nodeId, contentRef.current.textContent.substring(0, 1).toLowerCase());
    }
  }, [handleFirstChars, nodeId, label]);

  React.useEffect(() => {
    if (focused) {
      nodeRef.current.focus();
    }
  }, [focused]);

  return (
    <li
      className={clsx(classes.root, className, {
        [classes.expanded]: expanded,
      })}
      role="treeitem"
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      aria-expanded={expandable ? expanded : null}
      ref={handleRef}
      tabIndex={tabbable ? 0 : -1}
      {...other}
    >
      <div className={classes.content} onClick={handleClick} ref={contentRef}>
        {icon ? <div className={classes.iconContainer}>{icon}</div> : null}
        <Typography component="div" className={classes.label}>
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
   * @ignore
   */
  onKeyDown: PropTypes.func,
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
