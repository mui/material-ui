import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import clsx from 'clsx';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import { useForkRef } from '@material-ui/core/utils';
import useTreeState from '../TreeView/useTreeState';

const useStyles = makeStyles({
  root: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    outline: 'none',
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
  focused: {
    backgroundColor: 'lightgrey',
  },
});

const TreeNode = React.forwardRef(function TreeNode(props, ref) {
  const { children, collapseIcon, expandIcon, icon, id, label, ...other } = props;
  const classes = useStyles(props);
  const contentRef = React.useRef(null);
  const {
    isExpanded,
    toggle,
    icons,
    setFocused,
    isFocused,
    focusNextTopLevelNode,
    focusPreviousTopLevelNode,
  } = useTreeState();
  const nodeRef = React.useRef(null);
  const handleRef = useForkRef(ref, nodeRef);
  const firstValidChildId = React.useRef(null);

  const isExpandable = Boolean(children);

  const expanded = isExpanded(id);
  const focused = isFocused(id);

  const handleClick = event => {
    if (ref && event.target !== ref.current && event.target !== ref.current.firstElementChild) {
      return;
    }

    toggle(id);
    event.stopPropagation();
  };

  let stateIcon = null;

  if (icons.expandIcon && isExpandable && !expanded) {
    stateIcon = icons.expandIcon;
  }
  if (icons.collapseIcon && isExpandable && expanded) {
    stateIcon = icons.collapseIcon;
  }

  if (expandIcon && isExpandable && !expanded) {
    stateIcon = expandIcon;
  }

  if (collapseIcon && isExpandable && expanded) {
    stateIcon = collapseIcon;
  }

  const stateIconsProvided = icons && (icons.collapseIcon || icons.expandIcon);

  let startAdornment = null;

  if (isExpandable) {
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

  const handleFocus = () => {
    setFocused(id);
  };

  if (focused && window.activeElement !== contentRef.current) {
    contentRef.current.focus();
  }

  let firstValidChildIndex = -1;
  React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return null;
    }
    warning(
      child.type !== React.Fragment,
      [
        "Material-UI: the Menu component doesn't accept a Fragment as a child.",
        'Consider providing an array instead.',
      ].join('\n'),
    );

    if (firstValidChildIndex === -1) {
      firstValidChildIndex = index;
      firstValidChildId.current = child.props.id;
    }
    return child;
  });

  const handleKeyDown = event => {
    if (event.key === 'ArrowDown') {
      focusNextTopLevelNode(nodeRef.current);
      event.preventDefault();
    } else if (event.key === 'ArrowUp') {
      focusPreviousTopLevelNode(nodeRef.current);
      event.preventDefault();
    }
  };

  return (
    <li
      className={classes.root}
      role="treeitem"
      onClick={handleClick}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      ref={handleRef}
      {...other}
    >
      <div
        className={clsx(classes.content, {
          [classes.focused]: focused,
        })}
        ref={contentRef}
      >
        {stateIconsProvided ? <div className={classes.iconRoot}>{stateIcon}</div> : null}
        {startAdornment}
        <Typography className={classes.title}>{label}</Typography>
      </div>
      {children && (
        <Collapse className={classes.nestedList} in={expanded} component="ul">
          {children}
        </Collapse>
      )}
    </li>
  );
});

TreeNode.propTypes = {
  children: PropTypes.node,
  collapseIcon: PropTypes.node,
  expandIcon: PropTypes.node,
  icon: PropTypes.node,
  id: PropTypes.string.isRequired,
  label: PropTypes.node,
};

export default TreeNode;
