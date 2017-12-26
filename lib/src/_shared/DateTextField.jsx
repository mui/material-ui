/* eslint-disable react/jsx-no-duplicate-props */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { TextField, InputAdornment, IconButton, Icon } from 'material-ui';

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
    onClick: PropTypes.func.isRequired,
    invalidLabel: PropTypes.string,
    labelFunc: PropTypes.func,
    keyboard: PropTypes.bool,
    InputProps: PropTypes.shape(),
    keyboardIcon: PropTypes.node,
    invalidDateMessage: PropTypes.string,
  }

  static defaultProps = {
    disabled: false,
    invalidLabel: 'Unknown',
    value: new Date(),
    labelFunc: undefined,
    format: undefined,
    InputProps: undefined,
    keyboard: false,
    mask: undefined,
    keyboardIcon: 'event',
    invalidDateMessage: 'Invalid Date Format',
  }

  getDisplayDate = (props) => {
    const {
      value,
      format,
      invalidLabel,
      labelFunc,
    } = props;

    const date = moment(value);

    if (labelFunc) {
      return labelFunc(date, invalidLabel);
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

  handleChange = (e) => {
    const { format, invalidDateMessage } = this.props;
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
      labelFunc,
      keyboard,
      value,
      mask,
      InputProps,
      keyboardIcon,
      ...other
    } = this.props;
    const { displayValue, error } = this.state;

    const localInputProps = {
      inputComponent: MaskedInput,
      inputProps: {
        mask,
        readOnly: true,
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
        onKeyPress={this.handleChange}
        onBlur={e => e.preventDefault() && e.stopPropagation()}
        disabled={disabled}
        value={displayValue}
        {...other}
        onChange={this.handleChange}
        InputProps={{ ...localInputProps, ...InputProps }}
      />
    );
  }
}
