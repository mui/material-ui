// @flow

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import '../Button'; // So we don't have any override priority issue.

export const styles = (theme: Object) => ({
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

type ProvidedProps = {
  classes: Object,
};

export type Props = {
  /**
   * The content of the component.
   */
  children?: Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
};

function DialogActions(props: ProvidedProps & Props) {
  const { children, classes, className, ...other } = props;

  return (
    <div data-mui-test="DialogActions" className={classNames(classes.root, className)} {...other}>
      {React.Children.map(
        children,
        button =>
          React.isValidElement(button) && (
            <div className={classes.action}>
              {React.cloneElement(button, {
                className: classNames(classes.button, button.props.className),
              })}
            </div>
          ),
      )}
    </div>
  );
}

export default withStyles(styles, { name: 'MuiDialogActions' })(DialogActions);
