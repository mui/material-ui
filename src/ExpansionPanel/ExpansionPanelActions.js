// @flow

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    height: 68,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px`,
  },
  action: {
    margin: `0 ${theme.spacing.unit / 2}px`,
  },
  button: {
    minWidth: 64,
  },
});

type DefaultProps = {
  classes: Object,
};

export type Props = {
  /**
   * The content of the component.
   */
  children?: Node,
  /**
   * Allows to [extend the style](#css-api) applied to the component.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
};

type AllProps = DefaultProps & Props;

function ExpansionPanelActions(props: AllProps) {
  const { children, classes, className, ...other } = props;

  return (
    <div className={classNames(classes.root, className)} {...other}>
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

export default withStyles(styles, { name: 'MuiExpansionPanelActions' })(ExpansionPanelActions);
