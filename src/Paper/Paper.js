// @flow

import React from 'react';
import classNames from 'classnames';
import warning from 'warning';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiPaper', theme => {
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
});

type DefaultProps = {
  classes: Object,
  component: string,
  elevation: number,
  square: boolean,
};

export type Props = DefaultProps & {
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
  component?: string | Function,
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

function Paper(props: Props) {
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

export default withStyles(styleSheet)(Paper);
