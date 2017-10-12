import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import DateTextField from '../_shared/DateTextField';
import ModalDialog from '../_shared/ModalDialog';
import DatePicker from './DatePicker';

export default class DatePickerModal extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    format: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    autoOk: PropTypes.bool,
    disableFuture: PropTypes.bool,
    animateYearScrolling: PropTypes.bool,
  }

  static defaultProps = {
    value: null,
    format: 'MMMM Do',
    autoOk: false,
  }

  state = {
    open: true,
    date: moment(this.props.value),
  }

  togglePicker = () => {
    this.setState({ open: !this.state.open });
  }

  handleChange = (date) => {
    this.setState({ date }, () => {
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
    const { date } = this.state;
    const {
      value, format, autoOk, onChange, disableFuture, animateYearScrolling,
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
          <DatePicker
            date={date}
            onChange={this.handleChange}
            disableFuture={disableFuture}
            animateYearScrolling={animateYearScrolling}
          />
        </ModalDialog>
      </span>
    );
  }
}
