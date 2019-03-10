import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/styles';
import useTreeState from '../TreeView/useTreeState';

const useStyles = makeStyles(theme => {
  const basePadding = theme.spacing(1);
  const indentSize = 2;

  return {
    root: {
      paddingLeft: props => basePadding + theme.spacing(props.depth * indentSize),
    },
    title: {
      flex: 1,
    },
    stateIconContainer: {
      flex: `0 0 ${30 + theme.spacing(1)}px`,
      paddingRight: theme.spacing(1),
    },
    iconRoot: {
      marginRight: theme.spacing(1),
    },
  };
});

function TreeNode(props) {
  const { children, collapseIcon, depth, expandIcon, icon, id, title: titleProp, ...other } = props;
  const classes = useStyles(props);
  const { isExpanded, toggle, icons } = useTreeState();

  const title =
    typeof titleProp === 'string' ? (
      <Typography className={classes.title} fullWidth>
        {titleProp}
      </Typography>
    ) : (
      titleProp
    );

  const expanded = isExpanded(id);

  const handleClick = () => {
    toggle(id);
  };

  let startAdornment = null;

  if (children) {
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

  let stateIcon = null;

  if (icons.expandIcon && children && !expanded) {
    stateIcon = <IconButton size="small">{icons.expandIcon}</IconButton>;
  }
  if (icons.collapseIcon && children && expanded) {
    stateIcon = <IconButton size="small">{icons.collapseIcon}</IconButton>;
  }

  if (expandIcon && children && !expanded) {
    stateIcon = <IconButton size="small">{expandIcon}</IconButton>;
  }

  if (collapseIcon && children && expanded) {
    stateIcon = <IconButton size="small">{collapseIcon}</IconButton>;
  }

  return (
    <React.Fragment>
      <MenuItem className={classes.root} onClick={handleClick} disableRipple {...other}>
        {icons && (icons.collapseIcon || icons.expandIcon) && (
          <div className={classes.stateIconContainer}>{stateIcon}</div>
        )}
        {startAdornment}
        {title}
      </MenuItem>
      <Collapse in={expanded}>
        {React.Children.map(
          children,
          child => React.cloneElement(child, { depth: depth + 1 }),
          null,
        )}
      </Collapse>
    </React.Fragment>
  );
}

TreeNode.propTypes = {
  children: PropTypes.node,
  collapseIcon: PropTypes.node,
  depth: PropTypes.number,
  expandIcon: PropTypes.node,
  icon: PropTypes.node,
  id: PropTypes.string.isRequired,
  title: PropTypes.node,
};

TreeNode.defaultProps = {
  depth: 0,
};

export default TreeNode;
