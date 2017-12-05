import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { TextField, InputAdornment, IconButton } from 'material-ui';

import MaskedInput from 'react-text-mask';

class Input extends PureComponent {
  static propTypes = {
    mask: PropTypes.any,
  }

  static defaultProps = {
    mask: undefined,
  }

  render() {
    return (
      this.props.mask
        ? <MaskedInput {...this.props} />
        : <input {...this.props} />
    );
  }
}


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
  }

  constructor(props) {
    super(props);

    this.state = this.updateState(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState(this.updateState(nextProps));
    }
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

  updateState = props => ({
    value: props.value,
    displayValue: this.getDisplayDate(props),
    error: '',
  })

  handleChange = (e) => {
    const { format } = this.props;
    const oldValue = this.state.value;
    const newValue = moment(e.target.value, format, true);
    const error = newValue.isValid() ? '' : 'Invalid Date Format';

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
    const { disabled, onClick, keyboard } = this.props;

    if (keyboard && e.target.tagName.toLowerCase() !== 'span') {
      return;
    }

    e.target.blur();

    if (!disabled) {
      onClick(e);
    }
  }

  render() {
    const {
      format, disabled, onClick, invalidLabel, labelFunc, keyboard, value, mask, ...other
    } = this.props;
    const { displayValue, error } = this.state;

    return (
      <div>
        <TextField
          readOnly
          onClick={this.handleFocus}
          error={!!error}
          helperText={error}
          onKeyPress={this.handleChange}
          onBlur={e => e.preventDefault() && e.stopPropagation()}
          disabled={disabled}
          value={displayValue}
          {...other}
          onChange={this.handleChange}
          inputProps={{
            mask,
          }}
          InputProps={keyboard ? {
            endAdornment: (
              <InputAdornment
                onClick={this.handleFocus}
                position="end"
              >
                <IconButton>  event  </IconButton>
              </InputAdornment>
            ),
            inputComponent: Input,
          } : this.props.InputProps}
        />
      </div>
    );
  }
}
