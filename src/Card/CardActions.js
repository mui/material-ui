// @flow

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { cloneChildrenWithClassName } from '../utils/reactHelpers';

export const styles = {
  root: {
    height: 52,
    display: 'flex',
    alignItems: 'center',
    padding: '2px 4px',
  },
  action: {
    margin: '0 4px',
  },
};

type ProvidedProps = {
  classes: Object,
  /**
   * @ignore
   */
  theme?: Object,
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
  /**
   * If `true`, the card actions do not have additional margin.
   */
  disableActionSpacing: boolean,
};

class CardActions extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
    disableActionSpacing: false,
  };

  render() {
    const { disableActionSpacing, children, classes, className, ...other } = this.props;

    return (
      <div className={classNames(classes.root, className)} {...other}>
        {disableActionSpacing ? children : cloneChildrenWithClassName(children, classes.action)}
      </div>
    );
  }
}

export default withStyles(styles, { name: 'MuiCardActions' })(CardActions);
