// @flow

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

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
});

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
  };

  static muiName = 'SvgIcon';

  render() {
    const { children, classes, className, titleAccess, viewBox, ...other } = this.props;

    return (
      <svg
        className={classNames(classes.root, className)}
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
