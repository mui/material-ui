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
  } = useTreeState();
  const [nodes, setNodes] = React.useState([]);
  const nodeRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const nodeMap = React.useRef({});

  let stateIcon = null;

  const expandable = nodes.length > 0;
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

    switch (event.key) {
      case 'Enter':
      case ' ':
        toggle();
        flag = true;
        break;
      case 'ArrowDown':
        focusNextNode(idProp);
        flag = true;
        break;
      case 'ArrowUp':
        focusPreviousNode(idProp);
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
      case 'Tab':
        break;
      default:
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
    if (children) {
      setNodes(
        children.map(item => {
          const { id, ...others } = item;
          return <TreeNode key={id} id={id} {...others} />;
        }),
      );
    }
  }, [children]);

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
      {nodes && (
        <Collapse className={classes.nestedList} in={expanded} component="ul" role="group">
          {nodes}
        </Collapse>
      )}
    </li>
  );
}

TreeNode.propTypes = {
  children: PropTypes.array,
  collapseIcon: PropTypes.node,
  expandIcon: PropTypes.node,
  icon: PropTypes.node,
  id: PropTypes.any.isRequired,
  label: PropTypes.node,
};

export default TreeNode;
