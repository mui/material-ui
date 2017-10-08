import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateTextField from '../_shared/DateTextField';
import ModalDialog from '../_shared/ModalDialog';
import DatePicker from './DatePicker';

export default class DatePickerModal extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    format: PropTypes.string,
  }

  static defaultProps = {
    value: null,
    format: 'MMMM Do',
  }

  state = {
    open: false,
  }

  togglePicker = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { value, format, ...other } = this.props;
    return [
      <DateTextField
        value={value}
        format={format}
        onClick={this.togglePicker}
        {...other}
      />,

      <ModalDialog
        open={this.state.open}
        onRequestClose={this.togglePicker}
      >
        <DatePicker />
      </ModalDialog>,
    ];
  }
}
