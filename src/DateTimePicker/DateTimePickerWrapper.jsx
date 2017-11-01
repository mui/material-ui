import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { withStyles } from 'material-ui';

import DomainPropTypes from '../constants/prop-types';
import ModalWrapper from '../wrappers/ModalWrapper';
import DateTimePicker from './DateTimePicker';
import PickerBase from '../_shared/PickerBase';

export class DateTimePickerWrapper extends PickerBase {
  static propTypes = {
    value: DomainPropTypes.date,
    format: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    autoOk: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    autoSubmit: PropTypes.bool,
    disableFuture: PropTypes.bool,
    openTo: PropTypes.string,
    minDate: DomainPropTypes.date,
    maxDate: DomainPropTypes.date,
    showTabs: PropTypes.bool,
    returnMoment: PropTypes.bool,
    invalidLabel: PropTypes.string,
  }

  static defaultProps = {
    value: new Date(),
    format: 'MMMM Do hh:mm a',
    autoOk: false,
    autoSubmit: undefined,
    openTo: undefined,
    disableFuture: undefined,
    minDate: undefined,
    maxDate: undefined,
    showTabs: true,
    returnMoment: true,
    invalidLabel: undefined,
  }

  render() {
    const { date } = this.state;
    const {
      value,
      format,
      autoOk,
      openTo,
      classes,
      minDate,
      maxDate,
      showTabs,
      autoSubmit,
      disableFuture,
      returnMoment,
      invalidLabel,
      ...other
    } = this.props;

    const dialogClassName = classnames(classes.dialogContent, { [classes.noTabs]: !showTabs });

    return (
      <ModalWrapper
        ref={(node) => { this.wrapper = node; }}
        value={value}
        format={format}
        onAccept={this.handleAccept}
        onDismiss={this.handleDismiss}
        dialogContentClassName={dialogClassName}
        invalidLabel={invalidLabel}
        {...other}
      >
        <DateTimePicker
          date={date}
          openTo={openTo}
          autoSubmit={autoSubmit}
          onChange={this.handleChange}
          disableFuture={disableFuture}
          minDate={minDate}
          maxDate={maxDate}
          showTabs={showTabs}
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
  noTabs: {
    height: 422,
  },
};

export default withStyles(styles, { name: 'MuiPickerDTPickerModal' })(DateTimePickerWrapper);

