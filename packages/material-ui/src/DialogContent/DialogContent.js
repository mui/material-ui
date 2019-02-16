import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    flex: '1 1 auto',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
    padding: '0 24px 24px',
    '&:first-child': {
      paddingTop: 24,
    },
  },
};

function DialogContent(props) {
  const { classes, children, className, ...other } = props;

  return (
    <div className={clsx(classes.root, className)} {...other}>
      {children}
    </div>
  );
}

DialogContent.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default withStyles(styles, { name: 'MuiDialogContent' })(DialogContent);
