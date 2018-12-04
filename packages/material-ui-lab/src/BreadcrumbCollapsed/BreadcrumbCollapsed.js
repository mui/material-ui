import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const styles = theme => ({
  collapsed: {
    width: 24,
    height: 16,
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.grey[700],
    borderRadius: 2,
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2,
    cursor: 'pointer',
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[200],
    },
    '&:active': {
      boxShadow: theme.shadows[0],
      backgroundColor: emphasize(theme.palette.grey[200], 0.12),
    },
  },
});

function BreadcrumbCollapsed(props) {
  const { classes, ...rest } = props;
  return <MoreHorizIcon className={classes.collapsed} {...rest} />;
}

BreadcrumbCollapsed.propTypes = {
  /**
   * @ignore
   */
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BreadcrumbCollapsed);
