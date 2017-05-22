// @flow weak

import React, { Component, isValidElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import ButtonBase from '../internal/ButtonBase';
import withStyles from '../styles/withStyles';
import Icon from '../Icon';

export const styleSheet = createStyleSheet('MuiTab', (theme) => ({
  root: {
    ...theme.typography.button,
    maxWidth: 264,
    minWidth: 72,
    [theme.breakpoints.up('md')]: {
      minWidth: 160,
    },
    background: 'none',
    padding: 0,
    height: 48,
    flex: 'none',
    overflow: 'hidden',
  },
  rootLabelIcon: {
    height: 72,
  },
  rootAccent: {
    color: theme.palette.text.secondary,
  },
  rootAccentSelected: {
    color: theme.palette.accent.A200,
  },
  rootAccentDisabled: {
    color: theme.palette.text.disabled,
  },
  rootInherit: {
    color: 'inherit',
    opacity: 0.7,
  },
  rootInheritSelected: {
    opacity: 1,
  },
  rootInheritDisabled: {
    opacity: 0.4,
  },
  fullWidth: {
    flex: '1 0 0',
  },
  labelContainer: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
    },
  },
  label: {
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    fontFamily: theme.typography.fontFamily,
    textTransform: 'uppercase',
    whiteSpace: 'normal',
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.fontSize - 1,
    },
  },
  labelWrapped: {
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.fontSize - 2,
    },
  },
}));

class Tab extends Component {
  static defaultProps = {
    disabled: false,
  };

  state = {
    wrappedText: false,
  }

  componentDidMount() {
    this.checkTextWrap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.wrappedText === prevState.wrappedText) {
      /**
       * At certain text and tab lengths, a larger font size may wrap to two lines while the smaller
       * font size still only requires one line.  This check will prevent an infinite render loop
       * fron occurring in that scenario.
       */
      this.checkTextWrap();
    }
  }

  handleChange = (event) => {
    const { onChange, index, onClick } = this.props;

    onChange(event, index);

    if (onClick) {
      onClick(event);
    }
  };

  label = undefined;

  checkTextWrap = () => {
    if (this.label) {
      const wrappedText = this.label.getClientRects().length > 1;
      if (this.state.wrappedText !== wrappedText) {
        this.setState({ wrappedText });
      }
    }
  }

  render() {
    const {
      classes,
      className: classNameProp,
      fullWidth,
      icon: iconProp,
      index, // eslint-disable-line no-unused-vars
      label: labelProp,
      labelClassName,
      onChange, // eslint-disable-line no-unused-vars
      selected,
      style: styleProp,
      textColor,
      disabled,
      ...other
    } = this.props;

    let icon;

    if (iconProp !== undefined) {
      icon = isValidElement(iconProp) ?
        iconProp :
        <Icon>{iconProp}</Icon>;
    }

    let label;

    if (labelProp !== undefined) {
      label = (
        <div className={classes.labelContainer}>
          <span
            className={classNames(
              classes.label,
              { [classes.labelWrapped]: this.state.wrappedText },
              labelClassName,
            )}
            ref={(node) => { this.label = node; }}
          >
            {labelProp}
          </span>
        </div>
      );
    }

    const className = classNames(classes.root, {
      [classes.rootAccent]: textColor === 'accent',
      [classes.rootAccentDisabled]: disabled && textColor === 'accent',
      [classes.rootAccentSelected]: selected && textColor === 'accent',
      [classes.rootInherit]: textColor === 'inherit',
      [classes.rootInheritDisabled]: disabled && textColor === 'inherit',
      [classes.rootInheritSelected]: selected && textColor === 'inherit',
      [classes.rootLabelIcon]: icon && label,
      [classes.fullWidth]: fullWidth,
    }, classNameProp);

    let style = {};

    if (textColor !== 'accent' && textColor !== 'inherit') {
      style.color = textColor;
    }

    style = Object.keys(style).length > 0 ? {
      ...style,
      ...styleProp,
    } : styleProp;

    return (
      <ButtonBase
        focusRipple
        className={className}
        style={style}
        role="tab"
        aria-selected={selected}
        disabled={disabled}
        {...other}
        onClick={this.handleChange}
      >
        {icon}
        {label}
      </ButtonBase>
    );
  }
}

Tab.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the tab will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
   */
  fullWidth: PropTypes.bool,
  /**
   * The icon element. If a string is provided, it will be used as a font ligature.
   */
  icon: PropTypes.node,
  /**
   * @ignore
   */
  index: PropTypes.number,
  /**
   * The label element.
   */
  label: PropTypes.node,
  /**
   * The CSS class name of the label element.
   */
  labelClassName: PropTypes.string,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  selected: PropTypes.bool,
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * @ignore
   */
  textColor: PropTypes.oneOfType([
    PropTypes.oneOf([
      'accent',
      'inherit',
    ]),
    PropTypes.string,
  ]),
};

export default withStyles(styleSheet)(Tab);
