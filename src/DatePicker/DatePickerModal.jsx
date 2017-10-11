import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DateTextField from '../_shared/DateTextField';
import ModalDialog from '../_shared/ModalDialog';
import DatePicker from './DatePicker';

export default class DatePickerModal extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    format: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    value: null,
    format: 'MMMM Do',
  }

  state = {
    open: true,
  }

  togglePicker = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    const {
      value, format, onChange, ...other
    } = this.props;

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
        <DatePicker
          onChange={onChange}
          value={value}
        />
      </ModalDialog>,
    ];
  }
}
