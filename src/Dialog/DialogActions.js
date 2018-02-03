import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import '../Button'; // So we don't have any override priority issue.

export const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: `${theme.spacing.unit}px ${theme.spacing.unit / 2}px`,
    flex: '0 0 auto',
  },
  action: {
    margin: `0 ${theme.spacing.unit / 2}px`,
  },
  button: {
    minWidth: 64,
  },
});

function DialogActions(props) {
  const { children, classes, className, ...other } = props;

  return (
    <div className={classNames(classes.root, className)} {...other}>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) {
          return null;
        }

        return (
          <div className={classes.action}>
            {React.cloneElement(child, {
              className: classNames(classes.button, child.props.className),
            })}
          </div>
        );
      })}
    </div>
  );
}

DialogActions.propTypes = {
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
};

export default withStyles(styles, { name: 'MuiDialogActions' })(DialogActions);
