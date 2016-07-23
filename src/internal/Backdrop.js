// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';
import { lightBlack } from '../styles/colors';

export const styleSheet = createStyleSheet('Backdrop', (theme) => {
  return {
    root: {
      zIndex: -1,
      width: '100%',
      height: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      opacity: 0,
      backgroundColor: lightBlack,
      transition: theme.transitions.create('opacity'),
      willChange: 'opacity',
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
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {
      children,
      className,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet, { group: 'mui' });

    return (
      <div
        data-mui-test="Backdrop"
        className={ClassNames(classes.root, className)}
        aria-hidden="true"
        {...other}
      >
        {children}
      </div>
    );
  }
}
