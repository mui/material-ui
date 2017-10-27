import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from 'material-ui';

import ModalWrapper from '../wrappers/ModalWrapper';
import DateTimePicker from './DateTimePicker';

class DateTimePickerModal extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]),
    format: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    autoOk: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    autoSubmit: PropTypes.bool,
    openTo: PropTypes.string,
  }

  static defaultProps = {
    value: new Date(),
    format: 'MMMM Do hh:mm a',
    autoOk: false,
    autoSubmit: undefined,
    openTo: undefined,
  }

  state = {
    date: moment(this.props.value),
  }

  handleAccept = () => {
    this.props.onChange(this.state.date);
  }

  handleDismiss = () => {
    this.setState({ date: moment(this.props.value) });
  }

  handleChange = (date) => {
    this.setState({ date });
  }

  render() {
    const { date } = this.state;
    const {
      value,
      format,
      autoOk,
      openTo,
      classes,
      autoSubmit,
      ...other
    } = this.props;

    return (
      <ModalWrapper
        value={value}
        format={format}
        onAccept={this.handleAccept}
        onDismiss={this.handleDismiss}
        date={date}
        dialogContentClassName={classes.dialogContent}
        {...other}
      >
        <DateTimePicker
          date={date}
          autoSubmit={autoSubmit}
          onChange={this.handleChange}
        />
      </ModalWrapper>
    );
  }
}

const styles = {
  dialogContent: {
    height: 470,
    width: 310,
  },
};

export default withStyles(styles)(DateTimePickerModal);

