import * as React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import { emphasize } from '../styles/colorManipulator';
import MoreHorizIcon from '../internal/svg-icons/MoreHoriz';
import ButtonBase from '../ButtonBase';

const styles = (theme) => ({
  button: {
    display: 'flex',
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.grey[700],
    borderRadius: 2,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[200],
    },
    '&:active': {
      boxShadow: theme.shadows[0],
      backgroundColor: emphasize(theme.palette.grey[200], 0.12),
    },
  },
  icon: {
    width: 24,
    height: 16,
  },
});

/**
 * @ignore - internal component.
 */
function BreadcrumbCollapsed(props) {
  const { classes, ...other } = props;

  return (
    <li>
      <ButtonBase className={classes.button} focusRipple {...other}>
        <MoreHorizIcon className={classes.icon} />
      </ButtonBase>
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
