import * as React from 'react';
import { getFormatByViews } from '../_helpers/date-utils';
import BasePicker, { BasePickerProps } from '../_shared/BasePicker';
import { usePickerState } from '../_shared/hooks/usePickerState';
import { useUtils } from '../_shared/hooks/useUtils';
import { ExtendWrapper } from '../wrappers/ExtendWrapper';
import ModalWrapper, { ModalWrapperProps } from '../wrappers/ModalWrapper';
import DatePicker, { BaseDatePickerProps } from './DatePicker';

export interface DatePickerModalProps
  extends BasePickerProps,
    BaseDatePickerProps,
    ExtendWrapper<ModalWrapperProps> {}

export function DatePickerModal(props: DatePickerModalProps) {
  // const utils = useUtils()
  // const [state] = React.useState(null)
  // const { pickerProps, wrapperProps } = usePickerState(props);
  const {
    allowKeyboardControl,
    animateYearScrolling,
    autoOk,
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
    views,
    openTo,
    onMonthChange,
    onYearChange,
    ...other
  } = props;

  return null;
  // <ModalWrapper
  //   {...wrapperProps}
  //   disableFuture={disableFuture}
  //   disablePast={disablePast}
  //   format={format || getFormatByViews(views!, utils)}
  //   labelFunc={labelFunc}
  //   maxDate={maxDate}
  //   minDate={minDate}
  //   onChange={() => ({})}
  //   ref={forwardedRef}
  //   value={value}
  //   isAccepted={false}
  //   {...other}
  // >
  //   <DatePicker
  //     {...pickerProps}
  //     allowKeyboardControl={allowKeyboardControl}
  //     animateYearScrolling={animateYearScrolling}
  //     disableFuture={disableFuture}
  //     disablePast={disablePast}
  //     leftArrowIcon={leftArrowIcon}
  //     maxDate={maxDate}
  //     minDate={minDate}
  //     openToYearSelection={openToYearSelection}
  //     renderDay={renderDay}
  //     rightArrowIcon={rightArrowIcon}
  //     shouldDisableDate={shouldDisableDate}
  //     views={views}
  //     openTo={openTo}
  //   />
  // </ModalWrapper>
}

DatePickerModal.defaultProps = {
  views: ['year', 'day'],
};

export default React.forwardRef((props: DatePickerModalProps, ref) => (
  <DatePickerModal {...props} forwardedRef={ref} />
));
