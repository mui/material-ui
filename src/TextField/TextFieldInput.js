import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import shallowEqual from 'recompose/shallowEqual';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('TextFieldInput', (theme) => {
  const {palette} = theme;
  return {
    root: {
      font: 'inherit',
      margin: '8px 0',
      padding: '6px 0',
      border: 0,
      display: 'inline-block',
      verticalAlign: 'middle',
      whiteSpace: 'normal',
      background: 'none',
      lineHeight: 1,
      '&:focus': {
        outline: 0,
      },
    },
    disabled: {
      color: palette.text.disabled,
      cursor: 'not-allowed',
    },
    underline: {
      borderBottom: `1px solid ${palette.text.divider}`,
      '&disabled': {
        borderBottomStyle: 'dotted',
      },
    },
  };
});

/**
 * TextFieldInput
 */
export default class TextFieldInput extends Component {
  static muiName = 'TextFieldInput';

  static propTypes = {
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * The element or component used for the root node.
     */
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    disabled: PropTypes.bool,
    /**
     * TextFieldInput type
     */
    type: PropTypes.string,
    /**
     * If set to true, the input will have an underline
     */
    underline: PropTypes.bool,
  };

  static defaultProps = {
    component: 'input',
    type: 'text',
    underline: true,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return !shallowEqual(this.props, nextProps);
  }

  render() {
    const {
      className,
      component,
      disabled,
      type,
      underline,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet, {group: 'mui'});

    const classNames = ClassNames({
      [classes.root]: true,
      [classes.underline]: underline,
      [classes.disabled]: disabled,
    }, className);

    const inputProps = {
      ref: (c) => this.input = c,
      className: classNames,
      disabled,
      ...other,
    };

    if (component === 'input' || typeof component === 'function') {
      inputProps.type = type;
    }

    return React.createElement(component, inputProps);
  }
}
