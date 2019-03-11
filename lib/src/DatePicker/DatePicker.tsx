import * as React from 'react';
import { getFormatByViews } from '../_helpers/date-utils';
import { BasePickerProps } from '../_shared/BasePicker';
import { usePickerState } from '../_shared/hooks/usePickerState';
import { useUtils } from '../_shared/hooks/useUtils';
import { PureDateInput, PureDateInputProps } from '../_shared/PureDateInput';
import { getWrapperFromVariant } from '../wrappers';
import { ExtendWrapper2 } from '../wrappers/ExtendWrapper';
import DatePickerRoot, { BaseDatePickerProps } from './DatePickerRoot';

export type DatePickerProps = BasePickerProps &
  BaseDatePickerProps &
  ExtendWrapper2<PureDateInputProps>;

export const DatePicker: React.FC<DatePickerProps> = props => {
  const {
    variant,
    onAccept,
    allowKeyboardControl,
    animateYearScrolling,
    forwardedRef,
    autoOk,
    disableFuture,
    disablePast,
    format,
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
    views,
    openTo,
    onMonthChange,
    onYearChange,
    ...other
  } = props;

  const utils = useUtils();
  const { pickerProps, inputProps, wrapperProps } = usePickerState(props, () =>
    getFormatByViews(views!, utils)
  );

  const Wrapper = getWrapperFromVariant<PureDateInputProps>(variant);
  return (
    <Wrapper
      InputComponent={PureDateInput}
      DateInputProps={inputProps}
      {...wrapperProps}
      {...other}
    >
      <DatePickerRoot
        {...pickerProps}
        allowKeyboardControl={allowKeyboardControl}
        animateYearScrolling={animateYearScrolling}
        disableFuture={disableFuture}
        disablePast={disablePast}
        leftArrowIcon={leftArrowIcon}
        maxDate={maxDate}
        minDate={minDate}
        openToYearSelection={openToYearSelection}
        renderDay={renderDay}
        rightArrowIcon={rightArrowIcon}
        shouldDisableDate={shouldDisableDate}
        views={views}
        openTo={openTo}
      />
    </Wrapper>
  );
};

DatePicker.defaultProps = {
  views: ['year', 'day'],
};

export default React.forwardRef((props: DatePickerProps, ref) => (
  <DatePicker {...props} forwardedRef={ref} />
));
