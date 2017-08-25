// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';

export const styles = (theme: Object) => ({
  root: {
    margin: 0,
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px \
      20px ${theme.spacing.unit * 3}px`,
    flex: '0 0 auto',
  },
});

function DialogTitle(props) {
  const { children, classes, className, disableTypography, ...other } = props;

  return (
    <div data-mui-test="DialogTitle" className={classNames(classes.root, className)} {...other}>
      {disableTypography ? children : <Typography type="title">{children}</Typography>}
    </div>
  );
}

DialogTitle.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the children won't be wrapped by a typography component.
   * For instance, that can be useful to can render an h4 instead of a
   */
  disableTypography: PropTypes.bool,
};

DialogTitle.defaultProps = {
  disableTypography: false,
};

export default withStyles(styles, { name: 'MuiDialogTitle' })(DialogTitle);
