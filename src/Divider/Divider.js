// @flow

import React from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    height: 1,
    margin: 0, // Reset browser default style.
    border: 'none',
    flexShrink: 0,
  },
  default: {
    backgroundColor: theme.palette.text.divider,
  },
  inset: {
    marginLeft: 72,
  },
  light: {
    backgroundColor: theme.palette.text.lightDivider,
  },
  absolute: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
});

type ProvidedProps = {
  classes: Object,
  /**
   * @ignore
   */
  theme?: Object,
};

export type Props = {
  absolute: boolean,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * If `true`, the divider will be indented.
   */
  inset: boolean,
  /**
   * If `true`, the divider will have a lighter color.
   */
  light: boolean,
};

class Divider extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
    absolute: false,
    inset: false,
    light: false,
  };

  render() {
    const { absolute, classes, className: classNameProp, inset, light, ...other } = this.props;

    const className = classNames(
      classes.root,
      {
        [classes.absolute]: absolute,
        [classes.inset]: inset,
        [light ? classes.light : classes.default]: true,
      },
      classNameProp,
    );

    return <hr className={className} {...other} />;
  }
}

export default withStyles(styles, { name: 'MuiDivider' })(Divider);
