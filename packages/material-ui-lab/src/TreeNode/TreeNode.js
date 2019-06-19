import React from 'react';
import PropTypes from 'prop-types';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/core/styles';
import { useForkRef } from '@material-ui/core/utils';
import useTreeState from '../TreeView/useTreeState';

const styles = {
  root: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    outline: 0,
    '&:focus > $content': {
      outline: 'auto 1px',
    },
  },
  nestedList: {
    margin: 0,
    padding: 0,
    marginLeft: 26,
  },
  content: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  iconRoot: {
    marginRight: 2,
    width: 24,
    minWidth: 24,
    display: 'flex',
    justifyContent: 'center',
  },
};

const isPrintableCharacter = str => {
  return str.length === 1 && str.match(/\S/);
};

const TreeNode = React.forwardRef(function TreeNode(props, ref) {
  const { classes, children, collapseIcon, expandIcon, icon, nodeId, label, ...other } = props;
  const {
    icons,
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
    handleNodeMap,
    handleFirstChars,
  } = useTreeState();
  const nodeRef = React.useRef(null);
  const handleRef = useForkRef(nodeRef, ref);
  const contentRef = React.useRef(null);

  let stateIcon = null;

  const expandable = Boolean(children);
  const expanded = isExpanded ? isExpanded(nodeId) : false;
  const focused = isFocused ? isFocused(nodeId) : false;
  const focusable = isFocusable ? isFocusable(nodeId) : false;

  if (icons.expandIcon && expandable && !expanded) {
    stateIcon = icons.expandIcon;
  }
  if (icons.collapseIcon && expandable && expanded) {
    stateIcon = icons.collapseIcon;
  }

  if (expandIcon && expandable && !expanded) {
    stateIcon = expandIcon;
  }

  if (collapseIcon && expandable && expanded) {
    stateIcon = collapseIcon;
  }

  const stateIconsProvided = icons && (icons.collapseIcon || icons.expandIcon);

  let startAdornment = null;

  if (expandable) {
    if (icons.defaultNodeIcon || icon) {
      startAdornment = (
        <ListItemIcon className={classes.iconRoot}>{icon || icons.defaultNodeIcon}</ListItemIcon>
      );
    }
  } else if (icons.defaultLeafIcon || icon) {
    startAdornment = (
      <ListItemIcon className={classes.iconRoot}>{icon || icons.defaultLeafIcon}</ListItemIcon>
    );
  }

  const handleClick = event => {
    // only process click events that directly happened on this treeitem
    if (!contentRef.current.contains(event.target)) {
      return;
    }

    if (expandable) {
      toggle(nodeId);
    }
  };

  const handleKeyDown = event => {
    let flag = false;
    const key = event.key;

    const printableCharacter = () => {
      if (key === '*') {
        expandAllSiblings(nodeId);
        flag = true;
      } else if (isPrintableCharacter(key)) {
        setFocusByFirstCharacter(nodeId, key);
        flag = true;
      }
    };

    if (event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }
    if (event.shift) {
      if (key === ' ' || key === 'Enter') {
        event.stopPropagation();
      } else if (isPrintableCharacter(key)) {
        printableCharacter();
      }
    } else {
      switch (key) {
        case 'Enter':
        case ' ':
          if (nodeRef.current === event.currentTarget && expandable) {
            toggle();
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
          if (expandable) {
            if (expanded) {
              focusNextNode(nodeId);
            } else {
              toggle();
            }
          }
          flag = true;
          break;
        case 'ArrowLeft':
          handleLeftArrow(nodeId);
          flag = true;
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
            printableCharacter();
          }
      }
    }

    if (flag) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const handleFocus = () => {
    if (!focused && focusable) {
      focus(nodeId);
    }
  };

  React.useEffect(() => {
    const childIds = React.Children.map(children, child => child.props.nodeId);
    handleNodeMap(nodeId, childIds);
  }, [children, nodeId, handleNodeMap]);

  React.useEffect(() => {
    handleFirstChars(nodeId, label.substring(0, 1).toLowerCase());
  }, [handleFirstChars, nodeId, label]);

  if (focused) {
    nodeRef.current.focus();
  }

  return (
    <li
      className={classes.root}
      role="treeitem"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      aria-expanded={expanded}
      ref={handleRef}
      tabIndex={focusable ? 0 : -1}
      {...other}
    >
      <div className={classes.content} ref={contentRef}>
        {stateIconsProvided ? <div className={classes.iconRoot}>{stateIcon}</div> : null}
        {startAdornment}
        <Typography className={classes.title}>{label}</Typography>
      </div>
      {children && (
        <Collapse className={classes.nestedList} in={expanded} component="ul" role="group">
          {children}
        </Collapse>
      )}
    </li>
  );
});

TreeNode.propTypes = {
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  collapseIcon: PropTypes.node,
  expandIcon: PropTypes.node,
  icon: PropTypes.node,
  label: PropTypes.node,
  nodeId: PropTypes.string.isRequired,
};

export default withStyles(styles)(TreeNode);
