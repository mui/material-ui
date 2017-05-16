// @flow weak
/* eslint-disable jsx-a11y/label-has-for */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import wrapDisplayName from 'recompose/wrapDisplayName';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiSwitchLabel', (theme) => {
  return {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'pointer',
    },
    hasLabel: {
      marginLeft: -12,
      marginRight: 16, // used for row presentation of radio/checkbox
    },
    labelText: {
      fontFamily: theme.typography.fontFamily,
      userSelect: 'none',
    },
    disabled: {
      color: theme.palette.text.disabled,
      cursor: 'not-allowed',
    },
  };
});

function withSwitchLabel(SwitchComponent) {
  class SwitchLabel extends Component {
    static propTypes = {
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

    static contextTypes = {
      styleManager: customPropTypes.muiRequired,
    };

    switch = undefined;

    focus() {
      if (this.switch && this.switch.focus) {
        this.switch.focus();
      }
    }

    render() {
      const {
        disabled,
        label,
        labelClassName: labelClassNameProp,
        ...other
      } = this.props;

      const classes = this.context.styleManager.render(styleSheet);

      const labelClassName = classNames(classes.root, {
        [classes.hasLabel]: label && label.length,
      }, labelClassNameProp);

      const labelTextClassName = classNames(classes.labelText, {
        [classes.disabled]: disabled,
      });

      const switchElement = (
        <SwitchComponent
          ref={(c) => { this.switch = c; }}
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

  if (process.env.NODE_ENV !== 'production') {
    SwitchLabel.displayName = wrapDisplayName(SwitchComponent, 'withSwitchLabel');
  }

  return SwitchLabel;
}

export default withSwitchLabel;
