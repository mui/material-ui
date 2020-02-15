import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import { emphasize } from '../styles/colorManipulator';
import MoreHorizIcon from '../internal/svg-icons/MoreHoriz';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  icon: {
    width: 24,
    height: 16,
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.grey[700],
    borderRadius: 2,
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
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

/**
 * @ignore - internal component.
 */
function BreadcrumbCollapsed(props) {
  const { classes, onClick, ...other } = props;

  const handleKeyDown = e => {
    e.preventDefault();    
    switch (e.keyCode) {
      case 32 /** Space */:
      case 13 /** Enter */: {
        onClick();
      }
    }
  };
  
  return (
    <li className={classes.root} tabIndex={0} onKeyDownCapture={handleKeyDown} onClick={onClick} {...other}>
      <MoreHorizIcon className={classes.icon} />
    </li>
  );
}

BreadcrumbCollapsed.propTypes = {
  /**
   * @ignore
   */
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { name: 'PrivateBreadcrumbCollapsed' })(BreadcrumbCollapsed);
