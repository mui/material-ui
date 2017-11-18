// @flow

import React from 'react';
import type { ElementType, Node } from 'react';
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
  /**
   * @ignore
   */
  theme?: Object,
};

export type Props = {
  /**
   * Other base element props.
   */
  [otherProp: string]: any,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * @ignore
   */
  children?: Node,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: ElementType,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It's accepting values between 0 and 24 inclusive.
   */
  elevation: number,
  /**
   * If `true`, rounded corners are disabled.
   */
  square: boolean,
};

class Paper extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
    component: ('div': ElementType),
    elevation: 2,
    square: false,
  };

  render() {
    const {
      classes,
      className: classNameProp,
      component: ComponentProp,
      square,
      elevation,
      ...other
    } = this.props;

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
}

export default withStyles(styles, { name: 'MuiPaper' })(Paper);
