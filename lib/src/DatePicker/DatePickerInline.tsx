import * as PropTypes from 'prop-types';
import * as React from 'react';

import { Omit } from '@material-ui/core';
import BasePicker, { BasePickerProps } from '../_shared/BasePicker';
import DomainPropTypes from '../constants/prop-types';
import { ExtendWrapper } from '../wrappers/ExtendWrapper';
import InlineWrapper, { OuterInlineWrapperProps } from '../wrappers/InlineWrapper';
import Calendar from './components/Calendar';
import DatePicker, { BaseDatePickerProps } from './DatePicker';

export interface DatePickerInlineProps
  extends Omit<BasePickerProps, 'ampm'>,
    BaseDatePickerProps,
    ExtendWrapper<OuterInlineWrapperProps> {
  onlyCalendar?: boolean;
}

export const DatePickerInline: React.SFC<DatePickerInlineProps> = props => {
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

  const ComponentToShow: any = onlyCalendar ? Calendar : DatePicker;

  return (
    <BasePicker {...props} autoOk>
      {({ date, utils, isAccepted, handleChange, handleTextFieldChange, handleAccept }) => (
        <InlineWrapper
          disableFuture={disableFuture}
          disablePast={disablePast}
          format={format || utils.dateFormat}
          labelFunc={labelFunc}
          maxDate={maxDate}
          minDate={minDate}
          onChange={handleTextFieldChange}
          innerRef={forwardedRef}
          value={value}
          isAccepted={isAccepted}
          handleAccept={handleAccept}
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
      )}
    </BasePicker>
  );
};

(DatePickerInline as any).propTypes = {
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
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
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
  leftArrowIcon: undefined,
  rightArrowIcon: undefined,
  renderDay: undefined,
  labelFunc: undefined,
  shouldDisableDate: undefined,
  forwardedRef: undefined,
  autoOk: undefined,
  onlyCalendar: false,
};

export default React.forwardRef((props: DatePickerInlineProps, ref) => (
  <DatePickerInline {...props} forwardedRef={ref} />
));
