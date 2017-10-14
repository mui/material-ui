// @flow

import React from 'react';
import type { Node, Element } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import IconButton from '../IconButton';
import CheckBoxOutlineBlankIcon from '../svg-icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '../svg-icons/CheckBox';
import Icon from '../Icon';

export const styles = {
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'none',
  },
  input: {
    cursor: 'inherit',
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
  },
  default: {},
  checked: {},
  disabled: {},
};

type ProvidedProps = {
  classes: Object,
};

// NB: If changed, please update Checkbox, Switch and Radio
// so that the API documentation is updated.
export type Props = {
  /**
   * If `true`, the component is checked.
   */
  checked?: boolean | string,
  /**
   * The CSS class name of the root element when checked.
   */
  checkedClassName?: string,
  /**
   * The icon to display when the component is checked.
   * If a string is provided, it will be used as a font ligature.
   */
  checkedIcon?: Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * @ignore
   */
  defaultChecked?: boolean,
  /**
   * If `true`, the switch will be disabled.
   */
  disabled?: boolean,
  /**
   * The CSS class name of the root element when disabled.
   */
  disabledClassName?: string,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple?: boolean,
  /**
   * The icon to display when the component is unchecked.
   * If a string is provided, it will be used as a font ligature.
   */
  icon?: Node,
  /**
   * If `true`, the component appears indeterminate.
   */
  indeterminate?: boolean,
  /**
   * The icon to display when the component is indeterminate.
   * If a string is provided, it will be used as a font ligature.
   */
  indeterminateIcon?: Node,
  /**
   * Properties applied to the `input` element.
   */
  inputProps?: Object,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef?: Function,
  /*
   * @ignore
   */
  name?: string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange?: Function,
  /**
   * @ignore
   */
  tabIndex?: number | string,
  /**
   * The value of the component.
   */
  value?: string,
};

type State = {
  checked?: boolean,
};

export type Options = {
  defaultIcon: Element<*>,
  defaultCheckedIcon: Element<*>,
  inputType?: string,
};

export default function createSwitch(
  {
    defaultIcon = <CheckBoxOutlineBlankIcon />,
    defaultCheckedIcon = <CheckBoxIcon />,
    inputType = 'checkbox',
  }: Options = {},
) {
  /**
   * @ignore - internal component.
   */
  class SwitchBase extends React.Component<ProvidedProps & Props, State> {
    static defaultProps = {
      checkedIcon: defaultCheckedIcon,
      disableRipple: false,
      icon: defaultIcon,
    };

    state = {};

    componentWillMount() {
      const { props } = this;

      this.isControlled = props.checked !== undefined;

      if (!this.isControlled) {
        // not controlled, use internal state
        this.setState({
          checked: props.defaultChecked !== undefined ? props.defaultChecked : false,
        });
      }
    }

    input = null;
    button = null;
    isControlled = null;

    handleInputChange = (event: SyntheticInputEvent<*>) => {
      const checked = event.target.checked;

      if (!this.isControlled) {
        this.setState({ checked });
      }

      if (this.props.onChange) {
        this.props.onChange(event, checked);
      }
    };

    render() {
      const {
        checked: checkedProp,
        classes,
        className: classNameProp,
        checkedClassName,
        checkedIcon,
        disabled,
        disabledClassName,
        icon: iconProp,
        inputProps,
        inputRef,
        name,
        onChange,
        tabIndex,
        value,
        ...other
      } = this.props;

      const checked = this.isControlled ? checkedProp : this.state.checked;
      const className = classNames(classes.root, classes.default, classNameProp, {
        [classNames(classes.checked, checkedClassName)]: checked,
        [classNames(classes.disabled, disabledClassName)]: disabled,
      });

      let icon = checked ? checkedIcon : iconProp;

      if (typeof icon === 'string') {
        icon = <Icon>{icon}</Icon>;
      }

      return (
        <IconButton
          data-mui-test="SwitchBase"
          component="span"
          className={className}
          disabled={disabled}
          tabIndex={null}
          role={undefined}
          rootRef={node => {
            this.button = node;
          }}
          {...other}
        >
          {icon}
          <input
            ref={node => {
              this.input = node;
              if (inputRef) {
                inputRef(node);
              }
            }}
            type={inputType}
            name={name}
            checked={this.isControlled ? checkedProp : undefined}
            onChange={this.handleInputChange}
            className={classes.input}
            disabled={disabled}
            tabIndex={tabIndex}
            value={value}
            {...inputProps}
          />
        </IconButton>
      );
    }
  }

  return withStyles(styles, { name: 'MuiSwitchBase' })(SwitchBase);
}
