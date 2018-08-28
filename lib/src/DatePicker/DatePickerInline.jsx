import React from 'react';
import PropTypes from 'prop-types';

import InlineWrapper from '../wrappers/InlineWrapper';
import DatePicker from './DatePicker';
import DomainPropTypes from '../constants/prop-types';
import BasePicker from '../_shared/BasePicker';
import Calendar from './components/Calendar';

export const DatePickerInline = (props) => {
  const {
    allowKeyboardControl,
    animateYearScrolling,
    disableFuture,
    disablePast,
    format,
    forwardedRef,
    labelFunc,
    leftArrowIcon,
    maxDate,
    minDate,
    initialFocusedDate,
    onChange,
    openToYearSelection,
    renderDay,
    rightArrowIcon,
    shouldDisableDate,
    value,
    autoOk,
    onlyCalendar,
    ...other
  } = props;

  const ComponentToShow = onlyCalendar ? Calendar : DatePicker;

  return (
    <BasePicker {...props} autoOk>
      {
        ({
          date,
          utils,
          isAccepted,
          handleChange,
          handleTextFieldChange,
        }) => (
          <InlineWrapper
            disableFuture={disableFuture}
            disablePast={disablePast}
            format={format || utils.dateFormat}
            labelFunc={labelFunc}
            maxDate={maxDate}
            minDate={minDate}
            onChange={handleTextFieldChange}
            ref={forwardedRef}
            value={value}
            isAccepted={isAccepted}
            {...other}
          >
            <ComponentToShow
              date={date}
              allowKeyboardControl={allowKeyboardControl}
              animateYearScrolling={animateYearScrolling}
              disableFuture={disableFuture}
              disablePast={disablePast}
              leftArrowIcon={leftArrowIcon}
              maxDate={maxDate}
              minDate={minDate}
              onChange={handleChange}
              openToYearSelection={openToYearSelection}
              renderDay={renderDay}
              rightArrowIcon={rightArrowIcon}
              shouldDisableDate={shouldDisableDate}
            />
          </InlineWrapper>
        )
      }
    </BasePicker>
  );
};

DatePickerInline.propTypes = {
  onlyCalendar: PropTypes.bool,
  value: DomainPropTypes.date,
  minDate: DomainPropTypes.date,
  maxDate: DomainPropTypes.date,
  initialFocusedDate: DomainPropTypes.date,
  format: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
  animateYearScrolling: PropTypes.bool,
  openToYearSelection: PropTypes.bool,
  labelFunc: PropTypes.func,
  leftArrowIcon: PropTypes.node,
  rightArrowIcon: PropTypes.node,
  renderDay: PropTypes.func,
  shouldDisableDate: PropTypes.func,
  allowKeyboardControl: PropTypes.bool,
  forwardedRef: PropTypes.func,
  autoOk: PropTypes.bool,
};

DatePickerInline.defaultProps = {
  value: new Date(),
  format: undefined,
  minDate: '1900-01-01',
  maxDate: '2100-01-01',
  initialFocusedDate: undefined,
  disableFuture: false,
  disablePast: false,
  animateYearScrolling: false,
  openToYearSelection: false,
  allowKeyboardControl: true,
  leftArrowIcon: 'keyboard_arrow_left',
  rightArrowIcon: 'keyboard_arrow_right',
  renderDay: undefined,
  labelFunc: undefined,
  shouldDisableDate: undefined,
  forwardedRef: undefined,
  autoOk: undefined,
  onlyCalendar: false,
};

export default React.forwardRef((props, ref) => (
  <DatePickerInline {...props} forwardedRef={ref} />
));

