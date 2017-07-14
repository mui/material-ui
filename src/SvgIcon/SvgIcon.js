// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiSvgIcon', theme => ({
  root: {
    display: 'inline-block',
    fill: 'currentColor',
    height: 24,
    width: 24,
    userSelect: 'none',
    transition: theme.transitions.create('fill', {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

function SvgIcon(props) {
  const { children, classes, className, titleAccess, viewBox, ...other } = props;

  return (
    <svg
      className={classNames(classes.root, className)}
      focusable={false}
      viewBox={viewBox}
      aria-hidden={titleAccess ? 'false' : 'true'}
      {...other}
    >
      {titleAccess
        ? <title>
            {titleAccess}
          </title>
        : null}
      {children}
    </svg>
  );
}

SvgIcon.propTypes = {
  /**
   * Elements passed into the SVG Icon.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: PropTypes.string,
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

SvgIcon.muiName = 'SvgIcon';

export default withStyles(styleSheet)(SvgIcon);
