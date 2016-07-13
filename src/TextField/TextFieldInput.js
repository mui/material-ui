// @flow
import React, {Component, PropTypes, Element} from 'react';
import {createStyleSheet} from 'stylishly';
import shallowEqual from 'recompose/shallowEqual';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('TextFieldInput', (theme) => {
  const {palette} = theme;
  return {
    root: {
      font: 'inherit',
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

type DefaultProps = {
  component: string|Function,
  type: string,
  underline: boolean,
};

type Props = {
  /**
   * The CSS class name of the root element.
   */
  className?: string,
  /**
   * The element or component used for the root node.
   */
  component: string|Function,
  disabled?: boolean,
  /**
   * @ignore
   */
  onChange?: EventHandler,
  /**
   * @ignore
   */
  onClean?: Callback,
  /**
   * @ignore
   */
  onDirty?: Callback,
  /**
   * TextFieldInput type
   */
  type: string,
  /**
   * If set to true, the input will have an underline
   */
  underline: boolean,
  /**
   * The input value, required for a controlled component
   */
  value?: string,
};

/**
 * TextFieldInput
 */
export default class TextFieldInput extends Component<DefaultProps, Props, void> {
  static muiName:string = 'TextFieldInput';

  static defaultProps:DefaultProps = {
    component: 'input',
    type: 'text',
    underline: true,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  componentWillMount() {
    if (this.isControlled()) {
      this.checkDirty(this.props);
    }
  }

  shouldComponentUpdate(nextProps: Props) {
    return !shallowEqual(this.props, nextProps);
  }

  componentWillUpdate(nextProps: Props) {
    this.checkDirty(nextProps);
  }

  // Holds the input reference
  input: ?Element<any> = undefined;
  props: Props;

  handleChange: EventListener = (event: Event) => {
    if (!this.isControlled()) {
      this.checkDirty(this.input);
    }
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  isControlled() {
    return typeof this.props.value === 'string';
  }

  isDirty(obj: Props|Element<any>) {
    return obj && obj.value && obj.value.length > 0;
  }

  checkDirty(obj: Props|Element<any>) {
    if (this.props.onDirty && this.isDirty(obj)) {
      this.props.onDirty();
    } else if (this.props.onClean) {
      this.props.onClean();
    }
  }

  render(): Element<any> {
    const {
      className,
      component,
      disabled,
      onChange, // eslint-disable-line no-unused-vars
      onDirty, // eslint-disable-line no-unused-vars
      onClean, // eslint-disable-line no-unused-vars
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
      onChange: this.handleChange,
      disabled,
      ...other,
    };

    if (component === 'input' || typeof component === 'function') {
      inputProps.type = type;
    }

    return React.createElement(component, inputProps);
  }
}
