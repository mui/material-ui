// @flow

import React from 'react';
import type { Element } from 'react';
import classNames from 'classnames';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';
import { cloneChildrenWithClassName } from '../utils/reactHelpers';

export const styleSheet = createStyleSheet('MuiCardActions', {
  root: {
    height: 52,
    display: 'flex',
    alignItems: 'center',
    padding: '2px 4px',
  },
  actionSpacing: {
    margin: '0 4px',
  },
});

type DefaultProps = {
  disableActionSpacing: boolean,
};

export type Props = DefaultProps & {
  /**
   * The content of the component.
   */
  children?: Element<*>,
  /**
   * Useful to extend the style applied to components.
   */
  classes: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * If `true`, the card actions do not have additional margin.
   */
  disableActionSpacing?: boolean,
};

function CardActions(props: Props) {
  const { disableActionSpacing, children, classes, className, ...other } = props;

  return (
    <div className={classNames(classes.root, className)} {...other}>
      {disableActionSpacing
        ? children
        : cloneChildrenWithClassName(children, classes.actionSpacing)}
    </div>
  );
}

CardActions.defaultProps = {
  disableActionSpacing: false,
};

export default withStyles(styleSheet)(CardActions);
