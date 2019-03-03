import * as React from 'react';

import { Omit } from '@material-ui/core';
import BasePicker, { BasePickerProps } from '../_shared/BasePicker';
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
    views,
    openTo,
    ...other
  } = props;

  const ComponentToShow: any = onlyCalendar ? Calendar : DatePicker;

  return (
    <BasePicker {...props} autoOk>
      {({
        date,
        utils,
        isAccepted,
        handleChange,
        handleClear,
        handleTextFieldChange,
        handleAccept,
      }) => (
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
          onClear={handleClear}
          {...other}
        >
          <ComponentToShow
            date={date}
            views={views}
            openTo={openTo}
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

DatePickerInline.defaultProps = {
  views: ['year', 'day'],
};

export default React.forwardRef((props: DatePickerInlineProps, ref) => (
  <DatePickerInline {...props} forwardedRef={ref} />
));
