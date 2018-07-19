import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    margin: 0,
    padding: '24px 24px 20px',
    flex: '0 0 auto',
  },
};

function DialogTitle(props) {
  const { children, classes, className, disableTypography, ...other } = props;

  return (
    <div className={classNames(classes.root, className)} {...other}>
      {disableTypography ? children : <Typography variant="title">{children}</Typography>}
    </div>
  );
}

DialogTitle.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the children won't be wrapped by a typography component.
   * For instance, this can be useful to render an h4 instead of the default h2.
   */
  disableTypography: PropTypes.bool,
};

DialogTitle.defaultProps = {
  disableTypography: false,
};

export default withStyles(styles, { name: 'MuiDialogTitle' })(DialogTitle);
