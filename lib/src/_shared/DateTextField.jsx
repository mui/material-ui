/* eslint-disable react/jsx-no-duplicate-props */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { TextField as MuiTextField, InputAdornment, IconButton, Icon } from 'material-ui';

import MaskedInput from './MaskedInput';


/* eslint-disable react/sort-comp */
export default class DateTextField extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]),
    mask: PropTypes.any,
    disabled: PropTypes.bool,
    format: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onClear: PropTypes.func,
    onClick: PropTypes.func.isRequired,
    invalidLabel: PropTypes.string,
    emptyLabel: PropTypes.string,
    labelFunc: PropTypes.func,
    keyboard: PropTypes.bool,
    InputProps: PropTypes.shape(),
    keyboardIcon: PropTypes.node,
    invalidDateMessage: PropTypes.string,
    clearable: PropTypes.bool,
    TextField: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }

  static defaultProps = {
    disabled: false,
    invalidLabel: 'Unknown',
    emptyLabel: '',
    value: new Date(),
    labelFunc: undefined,
    format: undefined,
    InputProps: undefined,
    keyboard: false,
    mask: undefined,
    keyboardIcon: 'event',
    invalidDateMessage: 'Invalid Date Format',
    clearable: false,
    onClear: undefined,
    TextField: undefined,
  }

  getDisplayDate = (props) => {
    const {
      value,
      format,
      invalidLabel,
      emptyLabel,
      labelFunc,
    } = props;

    const isEmpty = value === null;
    const date = moment(value);

    if (labelFunc) {
      return labelFunc(isEmpty ? null : date, invalidLabel);
    }

    if (isEmpty) {
      return emptyLabel;
    }

    return date.isValid()
      ? date.format(format)
      : invalidLabel;
  }

  updateState = (props = this.props) => ({
    value: props.value,
    displayValue: this.getDisplayDate(props),
    error: '',
  })

  state = this.updateState()

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState(this.updateState(nextProps));
    }
  }

  handleBlur = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleChange = (e) => {
    const {
      format,
      invalidDateMessage,
      clearable,
      onClear,
    } = this.props;

    if (clearable && e.target.value === '') {
      if (this.props.value === null) {
        this.setState(this.updateState());
      } else if (onClear) {
        onClear();
      }

      return;
    }

    const oldValue = moment(this.state.value);
    const newValue = moment(e.target.value, format, true);
    const error = newValue.isValid() ? '' : invalidDateMessage;

    this.setState({
      displayValue: e.target.value,
      value: error ? newValue : oldValue,
      error,
    }, () => {
      if (!error && newValue.format('LLLL') !== oldValue.format('LLLL')) {
        this.props.onChange(newValue, true);
      }
    });
  }

  handleFocus = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const { keyboard } = this.props;

    if (keyboard) {
      return;
    }

    e.target.blur();

    this.openPicker(e);
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.openPicker(e);
    }
  }

  openPicker = (e) => {
    const { disabled, onClick } = this.props;

    if (!disabled) {
      onClick(e);
    }
  }

  render() {
    const {
      format,
      disabled,
      onClick,
      invalidLabel,
      invalidDateMessage,
      clearable,
      onClear,
      emptyLabel,
      labelFunc,
      keyboard,
      value,
      mask,
      InputProps,
      keyboardIcon,
      TextField = MuiTextField,
      ...other
    } = this.props;
    const { displayValue, error } = this.state;

    const localInputProps = {
      inputComponent: MaskedInput,
      inputProps: {
        mask: value === null ? null : mask,
        readOnly: !keyboard,
      },
    };

    if (keyboard) {
      localInputProps.endAdornment = (
        <InputAdornment position="end">
          <IconButton onClick={this.openPicker}> <Icon> {keyboardIcon} </Icon> </IconButton>
        </InputAdornment>
      );
    }

    return (
      <TextField
        onClick={this.handleFocus}
        error={!!error}
        helperText={error}
        onKeyPress={this.handleKeyPress}
        onBlur={this.handleBlur}
        disabled={disabled}
        value={displayValue}
        {...other}
        onChange={this.handleChange}
        InputProps={{ ...localInputProps, ...InputProps }}
      />
    );
  }
}
