import React from 'react';
import PropTypes from 'prop-types';

import ModalWrapper from '../wrappers/ModalWrapper';
import TimePicker from './TimePicker';
import PickerBase from '../_shared/PickerBase';
import * as defaultUtils from '../utils/utils';

export default class TimePickerWrapper extends PickerBase {
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
    returnMoment: PropTypes.bool,
    invalidLabel: PropTypes.string,
    utils: PropTypes.object,
    ampm: PropTypes.bool,
  }

  static defaultProps = {
    value: new Date(),
    format: undefined,
    autoOk: false,
    returnMoment: true,
    invalidLabel: undefined,
    utils: defaultUtils,
    ampm: true,
  }

  default12hFormat = 'hh:mm A'
  default24hFormat = 'HH:mm'

  render() {
    const { date } = this.state;
    const {
      value, format, autoOk, onChange, returnMoment, invalidLabel,
      utils, ampm, ...other
    } = this.props;

    return (
      <ModalWrapper
        ref={this.getRef}
        value={value}
        format={this.getFormat()}
        onClear={this.handleClear}
        onAccept={this.handleAccept}
        onChange={this.handleTextFieldChange}
        onDismiss={this.handleDismiss}
        invalidLabel={invalidLabel}
        {...other}
      >
        <TimePicker
          date={date}
          onChange={this.handleChange}
          utils={utils}
          ampm={ampm}
        />
      </ModalWrapper>
    );
  }
}
