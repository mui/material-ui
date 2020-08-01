import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { fade, withStyles } from '@material-ui/core/styles';
import { ownerDocument, useForkRef, unsupportedProp } from '@material-ui/core/utils';
import TreeViewContext from '../TreeView/TreeViewContext';
import { DescendantProvider, useDescendant } from '../TreeView/descendants';

export const styles = (theme) => ({
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
  content: {
    padding: '0 8px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&$disabled': {
      opacity: theme.palette.action.disabledOpacity,
      backgroundColor: 'transparent',
    },
    '&$focused': {
      backgroundColor: theme.palette.action.focus,
    },
    '&$selected': {
      backgroundColor: fade(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      '&:hover': {
        backgroundColor: fade(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: fade(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        },
      },
      '&$focused': {
        backgroundColor: fade(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
        ),
      },
    },
  },
  /* Pseudo-class applied to the content element when expanded. */
  expanded: {},
  /* Pseudo-class applied to the content element when selected. */
  selected: {},
  /* Pseudo-class applied to the content element when focused. */
  focused: {},
  /* Pseudo-class applied to the element when disabled. */
  disabled: {},
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
  },
});

const TreeItem = React.forwardRef(function TreeItem(props, ref) {
  const {
    children,
    classes,
    className,
    collapseIcon,
    endIcon,
    expandIcon,
    disabled: disabledProp,
    icon: iconProp,
    id: idProp,
    label,
    nodeId,
    onClick,
    onIconClick,
    onLabelClick,
    onMouseDown,
    TransitionComponent = Collapse,
    TransitionProps,
    ...other
  } = props;

  const {
    icons: contextIcons,
    focus,
    selectNode,
    selectRange,
    toggleExpansion,
    isExpanded,
    isFocused,
    isSelected,
    isDisabled,
    multiSelect,
    disabledItemsFocusable,
    mapFirstChar,
    unMapFirstChar,
    registerNode,
    unregisterNode,
    treeId,
  } = React.useContext(TreeViewContext);

  let id = null;

  if (idProp != null) {
    id = idProp;
  } else if (treeId && nodeId) {
    id = `${treeId}-${nodeId}`;
  }

  const [nodeRef, setNodeRef] = React.useState(null);
  const contentRef = React.useRef(null);
  const handleRef = useForkRef(setNodeRef, ref);

  const descendant = React.useMemo(
    () => ({
      element: nodeRef,
      id: nodeId,
    }),
    [nodeId, nodeRef],
  );

  const { index, parentId } = useDescendant(descendant);

  let icon = iconProp;

  const expandable = Boolean(Array.isArray(children) ? children.length : children);
  const expanded = isExpanded ? isExpanded(nodeId) : false;
  const focused = isFocused ? isFocused(nodeId) : false;
  const selected = isSelected ? isSelected(nodeId) : false;
  const disabled = isDisabled ? isDisabled(nodeId) : false;
  const icons = contextIcons || {};

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
    if (!disabled) {
      if (!focused) {
        focus(event, nodeId);
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
    }

    if (onClick) {
      onClick(event);
    }
  };

  const handleMouseDown = (event) => {
    if (event.shiftKey || event.ctrlKey || event.metaKey || disabled) {
      // Prevent text selection
      event.preventDefault();
    }

    if (onMouseDown) {
      onMouseDown(event);
    }
  };

  React.useEffect(() => {
    // On the first render a node's index will be -1. We want to wait for the real index.
    if (registerNode && unregisterNode && index !== -1) {
      registerNode({
        id: nodeId,
        idAttribute: id,
        index,
        parentId,
        expandable,
        disabled: disabledProp,
      });

      return () => {
        unregisterNode(nodeId);
      };
    }

    return undefined;
  }, [registerNode, unregisterNode, parentId, index, nodeId, expandable, disabledProp, id]);

  React.useEffect(() => {
    if (mapFirstChar && unMapFirstChar && label) {
      mapFirstChar(nodeId, contentRef.current.textContent.substring(0, 1).toLowerCase());

      return () => {
        unMapFirstChar(nodeId);
      };
    }
    return undefined;
  }, [mapFirstChar, unMapFirstChar, nodeId, label]);

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

  React.useEffect(() => {
    if (nodeRef && treeId) {
      const handleFocusIn = (event) => {
        event.preventDefault();
        const tree = ownerDocument(nodeRef).getElementById(treeId);

        // Some browsers don't focus the tree when using active-descendant.
        // Probably can remove when we drop IE11 support.
        if (ownerDocument(nodeRef).activeElement !== tree) {
          tree.focus();
        }

        const unfocusable = !disabledItemsFocusable && disabled;
        if (!focused && event.currentTarget === event.target && !unfocusable) {
          focus(event, nodeId);
        }
      };

      // Using focusin to avoid blurring the tree.
      nodeRef.addEventListener('focusin', handleFocusIn);

      return () => {
        nodeRef.removeEventListener('focusin', handleFocusIn);
      };
    }
    return undefined;
  }, [focus, focused, nodeId, nodeRef, treeId, disabledItemsFocusable, disabled]);

  return (
    <li
      className={clsx(classes.root, className)}
      role="treeitem"
      aria-expanded={expandable ? expanded : null}
      aria-selected={ariaSelected}
      aria-disabled={disabled || null}
      ref={handleRef}
      id={id}
      tabIndex={-1}
      {...other}
    >
      {/* Key event is handled by the TreeView */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className={clsx(classes.content, {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
          [classes.focused]: focused,
          [classes.disabled]: disabled,
        })}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        ref={contentRef}
      >
        {/* Key event is handled by the TreeView */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div onClick={onIconClick} className={classes.iconContainer}>
          {icon}
        </div>
        <Typography onClick={onLabelClick} component="div" className={classes.label}>
          {label}
        </Typography>
      </div>
      {children && (
        <DescendantProvider id={nodeId}>
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
        </DescendantProvider>
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
   * If `true`, the node will be disabled.
   */
  disabled: PropTypes.bool,
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
   * @ignore
   */
  id: PropTypes.string,
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
   * This prop isn't supported.
   * Use the `onNodeFocus` callback on the tree if you need to monitor a node's focus.
   */
  onFocus: unsupportedProp,
  /**
   * `onClick` handler for the icon container. Call `event.preventDefault()` to prevent `onNodeToggle` from being called.
   */
  onIconClick: PropTypes.func,
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
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   */
  TransitionProps: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiTreeItem' })(TreeItem);
