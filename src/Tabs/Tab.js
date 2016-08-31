import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import ButtonBase from '../internal/ButtonBase';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('Tab', (theme) => {
  const { palette, typography } = theme;
  return {
    root: {
      ...typography.button,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: 264,
      height: 48,
      background: 'none',
      color: palette.text.secondary,
      padding: 0,
    },
    label: {
      width: '100%',
      display: 'inherit',
      alignItems: 'inherit',
      justifyContent: 'inherit',
      textTransform: 'uppercase',
      paddingLeft: 24,
      paddingRight: 24,
    },
    active: {
      color: palette.text.primary,
    },
    primary: {
      color: palette.primary[500],
    },
    wrapped: {
      fontSize: 12,
    },
  };
});

export default class Tab extends Component {
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
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {
      active,
      children,
      className,
      primary,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet, { group: 'mui' });

    const classNames = ClassNames({
      [classes.root]: true,
      [classes.primary]: active && primary,
      [classes.active]: active,
    }, className);

    const labelClassNames = ClassNames({
      [classes.label]: true,
      [classes.wrapped]: this.tab && this.tab.getBoundingClientRect().height > 16,
    });

    return (
      <ButtonBase
        className={classNames}
        {...other}
      >
        <span className={labelClassNames} ref={(t) => this.tab = t}>{children}</span>
      </ButtonBase>
    );
  }
}
