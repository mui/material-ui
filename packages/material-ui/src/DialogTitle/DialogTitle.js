import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    margin: 0,
    padding: '16px 24px',
    flex: '0 0 auto',
  },
};

const DialogTitle = React.forwardRef(function DialogTitle(props, ref) {
  const { children, classes, className, disableTypography = false, ...other } = props;

  return (
    <div className={clsx(classes.root, className)} ref={ref} {...other}>
      {disableTypography ? children : <Typography variant="h6">{children}</Typography>}
    </div>
  );
});

DialogTitle.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
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

export default withStyles(styles, { name: 'MuiDialogTitle' })(DialogTitle);
