import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'material-ui/styles/withStyles';

import DomainPropTypes from '../constants/prop-types';
import ModalWrapper from '../wrappers/ModalWrapper';
import DateTimePicker from './DateTimePicker';
import PickerBase from '../_shared/PickerBase';
import * as defaultUtils from '../utils/utils';

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
    leftArrowIcon: PropTypes.node,
    rightArrowIcon: PropTypes.node,
    dateRangeIcon: PropTypes.node,
    timeIcon: PropTypes.node,
    renderDay: PropTypes.func,
    labelFunc: PropTypes.func,
    utils: PropTypes.object,
    ampm: PropTypes.bool,
    shouldDisableDate: PropTypes.func,
    animateYearScrolling: PropTypes.bool,
  }

  static defaultProps = {
    value: new Date(),
    format: undefined,
    autoOk: false,
    autoSubmit: undefined,
    openTo: undefined,
    disableFuture: undefined,
    minDate: undefined,
    maxDate: undefined,
    showTabs: true,
    returnMoment: true,
    invalidLabel: undefined,
    leftArrowIcon: undefined,
    rightArrowIcon: undefined,
    dateRangeIcon: undefined,
    timeIcon: undefined,
    renderDay: undefined,
    labelFunc: undefined,
    utils: defaultUtils,
    ampm: true,
    shouldDisableDate: undefined,
    animateYearScrolling: false,
  }

  default12hFormat = 'MMMM Do hh:mm a'
  default24hFormat = 'MMMM Do HH:mm'

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
      disablePast,
      disableFuture,
      returnMoment,
      invalidLabel,
      leftArrowIcon,
      rightArrowIcon,
      dateRangeIcon,
      timeIcon,
      renderDay,
      labelFunc,
      utils,
      ampm,
      shouldDisableDate,
      animateYearScrolling,
      ...other
    } = this.props;

    return (
      <ModalWrapper
        ref={this.getRef}
        value={value}
        format={this.getFormat()}
        onAccept={this.handleAccept}
        onChange={this.handleTextFieldChange}
        onDismiss={this.handleDismiss}
        onClear={this.handleClear}
        dialogContentClassName={classes.dialogContent}
        invalidLabel={invalidLabel}
        labelFunc={labelFunc}
        minDate={minDate}
        maxDate={maxDate}
        disablePast={disablePast}
        disableFuture={disableFuture}
        {...other}
      >
        <DateTimePicker
          date={date}
          openTo={openTo}
          autoSubmit={autoSubmit}
          onChange={this.handleChange}
          disablePast={disablePast}
          disableFuture={disableFuture}
          minDate={minDate}
          maxDate={maxDate}
          showTabs={showTabs}
          leftArrowIcon={leftArrowIcon}
          rightArrowIcon={rightArrowIcon}
          dateRangeIcon={dateRangeIcon}
          timeIcon={timeIcon}
          renderDay={renderDay}
          utils={utils}
          ampm={ampm}
          shouldDisableDate={shouldDisableDate}
          animateYearScrolling={animateYearScrolling}
        />
      </ModalWrapper>
    );
  }
}

const styles = {
  dialogContent: {
    width: 310,
  },
};

export default withStyles(styles, { name: 'MuiPickerDTPickerModal' })(DateTimePickerWrapper);

