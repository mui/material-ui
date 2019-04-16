import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import '../Button'; // So we don't have any override priority issue.

export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: '0 0 auto',
    margin: 8,
  },
  /* Styles applied to the root element if `disableActionSpacing={false}`. */
  action: {
    '& > * + *': {
      marginLeft: 8,
    },
  },
};

const DialogActions = React.forwardRef(function DialogActions(props, ref) {
  const { disableActionSpacing, classes, className, ...other } = props;

  return (
    <div
      className={clsx(
        classes.root,
        {
          [classes.action]: !disableActionSpacing,
        },
        className,
      )}
      ref={ref}
      {...other}
    />
  );
});

DialogActions.propTypes = {
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
  /**
   * If `true`, the dialog actions do not have additional margin.
   */
  disableActionSpacing: PropTypes.bool,
};

DialogActions.defaultProps = {
  disableActionSpacing: false,
};

export default withStyles(styles, { name: 'MuiDialogActions' })(DialogActions);
