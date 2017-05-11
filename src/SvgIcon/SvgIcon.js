// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiSvgIcon', (theme) => {
  return {
    svgIcon: {
      display: 'inline-block',
      fill: 'currentColor',
      height: 24,
      width: 24,
      userSelect: 'none',
      transition: theme.transitions.create('fill', {
        duration: theme.transitions.duration.shorter,
      }),
    },
  };
});

export default function SvgIcon(props, context) {
  const {
    children,
    className: classNameProp,
    viewBox,
    ...other
  } = props;

  const classes = context.styleManager.render(styleSheet);

  const className = classNames({
    [classes.svgIcon]: true,
  }, classNameProp);

  return (
    <svg
      className={className}
      viewBox={viewBox}
      {...other}
    >
      {children}
    </svg>
  );
}

SvgIcon.muiName = 'SvgIcon';

SvgIcon.propTypes = {
  /**
   * Elements passed into the SVG Icon.
   */
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an svg element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the svg will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   */
  viewBox: PropTypes.string,
};

SvgIcon.defaultProps = {
  viewBox: '0 0 24 24',
};

SvgIcon.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
