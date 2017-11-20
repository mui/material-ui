// @flow

import React from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    padding: theme.spacing.unit * 2,
    '&:last-child': {
      paddingBottom: theme.spacing.unit * 3,
    },
  },
});

type ProvidedProps = {
  classes: Object,
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
};

function CardContent(props: ProvidedProps & Props) {
  const { classes, className, ...other } = props;

  return <div className={classNames(classes.root, className)} {...other} />;
}

export default withStyles(styles, { name: 'MuiCardContent' })(CardContent);
