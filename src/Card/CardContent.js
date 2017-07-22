// @flow

import React from 'react';
import classNames from 'classnames';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiCardContent', theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    '&:last-child': {
      paddingBottom: theme.spacing.unit * 3,
    },
  },
}));

type Props = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: Object,
  /**
   * @ignore
   */
  className?: string,
};

function CardContent(props: Props) {
  const { classes, className, ...other } = props;

  return <div className={classNames(classes.root, className)} {...other} />;
}

export default withStyles(styleSheet)(CardContent);
