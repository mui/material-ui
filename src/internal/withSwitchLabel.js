// @flow weak
/* eslint-disable jsx-a11y/label-has-for */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import wrapDisplayName from 'recompose/wrapDisplayName';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiSwitchLabel', (theme) => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  hasLabel: {
    marginLeft: -12,
    marginRight: theme.spacing.unit * 2, // used for row presentation of radio/checkbox
  },
  labelText: {
    fontFamily: theme.typography.fontFamily,
    userSelect: 'none',
  },
  disabled: {
    color: theme.palette.text.disabled,
    cursor: 'not-allowed',
  },
}));

function withSwitchLabel(SwitchComponent) {
  class SwitchLabel extends Component {
    switch = undefined;

    focus() {
      if (this.switch && this.switch.focus) {
        this.switch.focus();
      }
    }

    render() {
      const {
        classes,
        disabled,
        label,
        labelClassName: labelClassNameProp,
        ...other
      } = this.props;

      const labelClassName = classNames(classes.root, {
        [classes.hasLabel]: label && label.length,
      }, labelClassNameProp);

      const labelTextClassName = classNames(classes.labelText, {
        [classes.disabled]: disabled,
      });

      const switchElement = (
        <SwitchComponent
          ref={(node) => { this.switch = node; }}
          disabled={disabled}
          {...other}
        />
      );

      if (!label) {
        return switchElement;
      }

      return (
        <label className={labelClassName}>
          {switchElement}
          <span className={labelTextClassName}>
            {label}
          </span>
        </label>
      );
    }
  }

  SwitchLabel.propTypes = {
    /**
     * Useful to extend the style applied to components.
     */
    classes: PropTypes.object.isRequired,
    /**
     * If `true`, the control will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * The text to be used in an enclosing label element.
     */
    label: PropTypes.node,
    /**
     * The className to be used in an enclosing label element.
     */
    labelClassName: PropTypes.string,
  };

  if (process.env.NODE_ENV !== 'production') {
    SwitchLabel.displayName = wrapDisplayName(SwitchComponent, 'withSwitchLabel');
  }

  return withStyles(styleSheet)(SwitchLabel);
}

export default withSwitchLabel;
