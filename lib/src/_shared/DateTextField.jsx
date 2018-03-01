/* eslint-disable react/sort-comp */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from 'material-ui/Icon';
import InputAdornment from 'material-ui/Input/InputAdornment';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import withStyles from 'material-ui/styles/withStyles';

import DomainPropTypes from '../constants/prop-types';
import MaskedInput from './MaskedInput';
import withUtils from '../_shared/WithUtils';

export class DateTextField extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]),
    mask: PropTypes.any,
    minDate: DomainPropTypes.date,
    minDateMessage: PropTypes.string,
    maxDate: DomainPropTypes.date,
    maxDateMessage: PropTypes.string,
    disablePast: PropTypes.bool,
    disableFuture: PropTypes.bool,
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
    TextFieldComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    utils: PropTypes.func.isRequired,
    InputAdornmentProps: PropTypes.object,
    adornmentPosition: PropTypes.string,
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
    disablePast: false,
    disableFuture: false,
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    minDateMessage: 'Date should not be before minimal date',
    maxDateMessage: 'Date should not be after maximal date',
    TextFieldComponent: TextField,
    InputAdornmentProps: {},
    adornmentPosition: 'end',
  }

  getDisplayDate = (props) => {
    const {
      utils, value, format, invalidLabel, emptyLabel, labelFunc,
    } = props;

    const isEmpty = value === null;
    const date = utils.date(value);

    if (labelFunc) {
      return labelFunc(isEmpty ? null : date, invalidLabel);
    }

    if (isEmpty) {
      return emptyLabel;
    }

    return utils.isValid(date)
      ? utils.format(date, format)
      : invalidLabel;
  }

  getError = (value, props = this.props) => {
    const {
      utils,
      maxDate,
      minDate,
      disablePast,
      disableFuture,
      maxDateMessage,
      minDateMessage,
      invalidDateMessage,
    } = props;

    if (!utils.isValid(value)) {
      // if null - do not show error
      if (utils.isNull(value)) {
        return '';
      }
      return invalidDateMessage;
    }

    if (
      (maxDate && utils.isAfter(value, maxDate)) ||
      (disableFuture && utils.isAfter(value, utils.endOfDay(utils.date())))
    ) {
      return maxDateMessage;
    }

    if (
      (minDate && utils.isBefore(value, minDate)) ||
      (disablePast && utils.isBefore(value, utils.startOfDay(utils.date())))
    ) {
      return minDateMessage;
    }

    return '';
  }

  updateState = (props = this.props) => ({
    value: props.value,
    displayValue: this.getDisplayDate(props),
    error: this.getError(props.utils.date(props.value)),
  })

  state = this.updateState()

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.value !== this.state.value ||
      nextProps.format !== this.props.format ||
      nextProps.maxDate !== this.props.maxDate ||
      nextProps.minDate !== this.props.minDate
    ) {
      this.setState(this.updateState(nextProps));
    }
  }

  handleBlur = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleChange = (e) => {
    const {
      clearable,
      onClear,
      utils,
      format,
    } = this.props;

    if (clearable && e.target.value === '') {
      if (this.props.value === null) {
        this.setState(this.updateState());
      } else if (onClear) {
        onClear();
      }

      return;
    }

    const oldValue = utils.date(this.state.value);
    const newValue = utils.parse(e.target.value, format);

    const error = this.getError(newValue);

    this.setState({
      displayValue: e.target.value,
      value: error ? newValue : oldValue,
      error,
    }, () => {
      if (!error && utils.format(newValue, 'LLLL') !== utils.format(oldValue, 'LLLL')) {
        this.props.onChange(newValue);
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
      utils,
      format,
      classes,
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
      maxDate,
      minDate,
      disablePast,
      disableFuture,
      maxDateMessage,
      minDateMessage,
      TextFieldComponent,
      InputAdornmentProps,
      adornmentPosition,
      ...other
    } = this.props;

    const { displayValue, error } = this.state;
    const localInputProps = {
      inputComponent: MaskedInput,
      inputProps: {
        mask: !keyboard ? null : mask,
        readOnly: !keyboard,
      },
      className: classes.input,
    };

    if (keyboard) {
      localInputProps[`${adornmentPosition}Adornment`] = (
        <InputAdornment position={adornmentPosition} {...InputAdornmentProps}>
          <IconButton onClick={this.openPicker}> <Icon> {keyboardIcon} </Icon> </IconButton>
        </InputAdornment>
      );
    }

    return (
      <TextFieldComponent
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

const styles = {
  input: {
    alignItems: 'flex-end',
  },
};

export default withStyles(styles)(withUtils()(DateTextField));
