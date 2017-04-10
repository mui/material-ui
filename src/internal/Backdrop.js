// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';
import { lightBlack } from '../styles/colors';

export const styleSheet = createStyleSheet('MuiBackdrop', (theme) => {
  return {
    root: {
      zIndex: -1,
      width: '100%',
      height: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: lightBlack,
      transition: theme.transitions.create('opacity'),
      willChange: 'opacity',
      opacity: 0,
    },
    invisible: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
  };
});

export default class Backdrop extends Component {

  static propTypes = {
    /**
     * Can be used, for instance, to render a letter inside the avatar.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * If `true`, the backdrop is invisible.
     */
    invisible: PropTypes.bool,
  };

  static defaultProps = {
    invisible: false,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  render() {
    const {
      children,
      className,
      invisible,
      ...other
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);
    const backdropClass = classNames(classes.root, {
      [classes.invisible]: invisible,
    }, className);
    return (
      <div
        data-mui-test="Backdrop"
        className={backdropClass}
        aria-hidden="true"
        {...other}
      >
        {children}
      </div>
    );
  }
}
