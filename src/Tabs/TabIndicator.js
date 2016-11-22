import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('TabIndicator', (theme) => {
  const { palette, transitions } = theme;
  return {
    root: {
      position: 'absolute',
      bottom: 0,
      height: 2,
      marginTop: -2,
      transition: transitions.create(),
    },
    primary: {
      backgroundColor: palette.primary[500],
    },
  };
});

export default class TabIndicator extends Component {
  static propTypes = {
    /**
     * The content of the Tab.
     */
    active: PropTypes.bool,
    /**
     * The content of the Tab.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * If true, the tab will use the theme's primary color.
     */
    primary: PropTypes.bool,
    /**
     * Style object
     */
    style: PropTypes.object,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const { className, primary, style, ...other } = this.props;
    const classes = this.context.styleManager.render(styleSheet, { group: 'mui' });
    const classNames = ClassNames({
      [classes.root]: true,
      [classes.primary]: primary,
    }, className);

    return (
      <span className={classNames} style={style} {...other} />
    );
  }
}
