import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import useTreeState from '../TreeView/useTreeState';

const useStyles = makeStyles({
  root: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    outline: 0,
    '&:focus $content$focused': {
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
  focused: {},
});

const isPrintableCharacter = str => {
  return str.length === 1 && str.match(/\S/);
};

function TreeNode(props) {
  const { children, collapseIcon, expandIcon, icon, id: idProp, label, ...other } = props;
  const classes = useStyles(props);
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
  const contentRef = React.useRef(null);

  let stateIcon = null;

  const expandable = Boolean(children);
  const expanded = isExpanded ? isExpanded(idProp) : false;
  const focused = isFocused ? isFocused(idProp) : false;
  const focusable = isFocusable ? isFocusable(idProp) : false;

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
      toggle(idProp);
    }
  };

  const handleKeyDown = event => {
    let flag = false;
    const key = event.key;

    const printableCharacter = () => {
      if (key === '*') {
        expandAllSiblings(idProp);
        flag = true;
      } else if (isPrintableCharacter(key)) {
        setFocusByFirstCharacter(idProp, key);
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
          focusNextNode(idProp);
          flag = true;
          break;
        case 'ArrowUp':
          focusPreviousNode(idProp);
          flag = true;
          break;
        case 'ArrowRight':
          if (expandable) {
            if (expanded) {
              focusNextNode(idProp);
            } else {
              toggle();
            }
          }
          flag = true;
          break;
        case 'ArrowLeft':
          handleLeftArrow(idProp);
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
      focus(idProp);
    }
  };

  React.useEffect(() => {
    const childIds = React.Children.map(children, child => child.props.id);
    handleNodeMap(idProp, childIds);
  }, [children, idProp, handleNodeMap]);

  React.useEffect(() => {
    handleFirstChars(idProp, label.substring(0, 1).toLowerCase());
  }, [handleFirstChars, idProp, label]);

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
      ref={nodeRef}
      tabIndex={focusable ? 0 : -1}
      {...other}
    >
      <div className={clsx(classes.content, { [classes.focused]: focused })} ref={contentRef}>
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
}

TreeNode.propTypes = {
  children: PropTypes.node,
  collapseIcon: PropTypes.node,
  expandIcon: PropTypes.node,
  icon: PropTypes.node,
  id: PropTypes.string.isRequired,
  label: PropTypes.node,
};

export default TreeNode;
