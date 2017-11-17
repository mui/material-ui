// @flow

import React from 'react';
import type { ElementType } from 'react';
import classNames from 'classnames';
import warning from 'warning';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => {
  const shadows = {};

  theme.shadows.forEach((shadow, index) => {
    shadows[`shadow${index}`] = {
      boxShadow: shadow,
    };
  });

  return {
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    rounded: {
      borderRadius: 2,
    },
    ...shadows,
  };
};

type ProvidedProps = {
  classes: Object,
  component: ElementType,
  elevation: number,
  square: boolean,
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
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component?: ElementType,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It's accepting values between 0 and 24 inclusive.
   */
  elevation?: number,
  /**
   * If `true`, rounded corners are disabled.
   */
  square?: boolean,
};

function Paper(props: ProvidedProps & Props) {
  const {
    classes,
    className: classNameProp,
    component: ComponentProp,
    square,
    elevation,
    ...other
  } = props;

  warning(
    elevation >= 0 && elevation < 25,
    `Material-UI: this elevation \`${elevation}\` is not implemented.`,
  );

  const className = classNames(
    classes.root,
    classes[`shadow${elevation >= 0 ? elevation : 0}`],
    {
      [classes.rounded]: !square,
    },
    classNameProp,
  );

  return <ComponentProp className={className} {...other} />;
}

Paper.defaultProps = {
  component: 'div',
  elevation: 2,
  square: false,
};

export default withStyles(styles, { name: 'MuiPaper' })(Paper);
