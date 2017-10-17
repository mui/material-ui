import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import DateTextField from '../_shared/DateTextField';
import ModalDialog from '../_shared/ModalDialog';
import TimePicker from './TimePicker';

export default class TimePickerModal extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    format: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    autoOk: PropTypes.bool,
  }

  static defaultProps = {
    value: null,
    format: 'MM:HH A',
    autoOk: false,
  }

  state = {
    open: true,
    time: moment(this.props.value),
  }

  togglePicker = () => {
    this.setState({ open: !this.state.open });
  }

  handleChange = (time) => {
    this.setState({ time }, () => {
      if (this.props.autoOk) {
        this.handleAccept();
      }
    });
  }

  handleAccept = () => {
    this.props.onChange(this.state.date);
    this.togglePicker(); // close
  }

  handleDismiss = () => {
    this.setState({
      date: moment(this.props.value),
    });

    this.togglePicker();
  }

  render() {
    const { time } = this.state;
    const {
      value, format, autoOk, onChange,
      ...other
    } = this.props;

    return (
      <span>
        <DateTextField
          value={value}
          format={format}
          onClick={this.togglePicker}
          {...other}
        />

        <ModalDialog
          open={this.state.open}
          onAccept={this.handleAccept}
          onDismiss={this.handleDismiss}
        >
          <TimePicker
            date={time}
            onChange={this.handleChange}
          />
        </ModalDialog>
      </span>
    );
  }
}
