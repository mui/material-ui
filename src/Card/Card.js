// @flow

import React from 'react';
import classNames from 'classnames';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';
import Paper from '../Paper';

export const styleSheet = createStyleSheet('MuiCard', {
  root: {
    overflow: 'hidden',
  },
});

type DefaultProps = {
  classes: Object,
  raised: boolean,
};

export type Props = {
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * If `true`, the card will use raised styling.
   */
  raised?: boolean,
};

type AllProps = DefaultProps & Props;

function Card(props: AllProps) {
  const { classes, className, raised, ...other } = props;

  return (
    <Paper className={classNames(classes.root, className)} elevation={raised ? 8 : 2} {...other} />
  );
}

Card.defaultProps = {
  raised: false,
};

export default withStyles(styleSheet)(Card);
