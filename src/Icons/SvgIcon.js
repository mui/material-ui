import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('SvgIcon', (theme) => {
  const {transitions} = theme;

  return {
    base: {
      display: 'inline-block',
      fill: 'currentColor',
      height: 24,
      width: 24,
      userSelect: 'none',
      transition: transitions.create(),
    },
  };
});

export default class SvgIcon extends Component {
  static muiName = 'SvgIcon';

  static propTypes = {
    /**
     * Elements passed into the SVG Icon.
     */
    children: PropTypes.node,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Override the inline style of the root element.
     */
    style: PropTypes.object,
    /**
     * Allows you to redifine what the coordinates
     * without units mean inside an svg element. For example,
     * if the SVG element is 500 (width) by 200 (height), and you
     * pass viewBox="0 0 50 20", this means that the coordinates inside
     * the svg will go from the top left corner (0,0) to bottom right (50,20)
     * and each unit will be worth 10px.
     */
    viewBox: PropTypes.string,
  };

  static defaultProps = {
    viewBox: '0 0 24 24',
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {
      children,
      className,
      viewBox,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

    const classNames = ClassNames({
      [classes.base]: true,
    }, className);

    return (
      <svg
        className={classNames}
        viewBox={viewBox}
        {...other}
      >
        {children}
      </svg>
    );
  }
}
