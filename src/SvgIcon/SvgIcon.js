// @flow

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalizeFirstLetter } from '../utils/helpers';

export const styles = (theme: Object) => ({
  root: {
    display: 'inline-block',
    fill: 'currentColor',
    height: 24,
    width: 24,
    userSelect: 'none',
    flexShrink: 0,
    transition: theme.transitions.create('fill', {
      duration: theme.transitions.duration.shorter,
    }),
  },
  colorAccent: {
    color: theme.palette.secondary.A200,
  },
  colorAction: {
    color: theme.palette.action.active,
  },
  colorContrast: {
    color: theme.palette.getContrastText(theme.palette.primary[500]),
  },
  colorDisabled: {
    color: theme.palette.action.disabled,
  },
  colorError: {
    color: theme.palette.error[500],
  },
  colorPrimary: {
    color: theme.palette.primary[500],
  },
});

export type Color = 'inherit' | 'accent' | 'action' | 'contrast' | 'disabled' | 'error' | 'primary';

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
   * Elements passed into the SVG Icon.
   */
  children: Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * The color of the component. It's using the theme palette when that makes sense.
   */
  color: Color,
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess?: string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an svg element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the svg will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   */
  viewBox: string,
};

class SvgIcon extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
    viewBox: '0 0 24 24',
    color: 'inherit',
  };

  static muiName = 'SvgIcon';

  render() {
    const {
      children,
      classes,
      className: classNameProp,
      color,
      titleAccess,
      viewBox,
      ...other
    } = this.props;

    const className = classNames(
      classes.root,
      {
        [classes[`color${capitalizeFirstLetter(color)}`]]: color !== 'inherit',
      },
      classNameProp,
    );

    return (
      <svg
        className={className}
        focusable="false"
        viewBox={viewBox}
        aria-hidden={titleAccess ? 'false' : 'true'}
        {...other}
      >
        {titleAccess ? <title>{titleAccess}</title> : null}
        {children}
      </svg>
    );
  }
}

export default withStyles(styles, { name: 'MuiSvgIcon' })(SvgIcon);
