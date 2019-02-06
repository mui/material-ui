import { IUtils } from '@date-io/core/IUtils';
import * as React from 'react';
import BasePicker, { BasePickerProps } from '../_shared/BasePicker';
import DatePickerView, { DatePickerViewType } from '../constants/DatePickerView';
import { MaterialUiPickersDate } from '../typings/date';
import { ExtendWrapper } from '../wrappers/ExtendWrapper';
import ModalWrapper, { ModalWrapperProps } from '../wrappers/ModalWrapper';
import DatePicker, { BaseDatePickerProps } from './DatePicker';

export interface DatePickerModalProps
  extends BasePickerProps,
    BaseDatePickerProps,
    ExtendWrapper<ModalWrapperProps> {}

const getFormat = (
  format: string | undefined,
  availableViews: DatePickerViewType[],
  utils: IUtils<MaterialUiPickersDate>
) =>
  format ||
  (availableViews.length === 1 && availableViews[0] === DatePickerView.YEAR
    ? utils.yearFormat
    : availableViews[availableViews.length - 1] === DatePickerView.MONTH
      ? utils.yearMonthFormat
      : utils.dateFormat);

export const DatePickerModal: React.SFC<DatePickerModalProps> = props => {
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
    availableViews,
    openTo,
    ...other
  } = props;

  return (
    <BasePicker {...props}>
      {({
        date,
        utils,
        handleAccept,
        handleChange,
        handleClear,
        handleDismiss,
        handleSetTodayDate,
        handleTextFieldChange,
        isAccepted,
      }) => (
        <ModalWrapper
          disableFuture={disableFuture}
          disablePast={disablePast}
          format={getFormat(format, availableViews!, utils)}
          labelFunc={labelFunc}
          maxDate={maxDate}
          minDate={minDate}
          onAccept={handleAccept}
          onChange={handleTextFieldChange}
          onClear={handleClear}
          onDismiss={handleDismiss}
          onSetToday={handleSetTodayDate}
          ref={forwardedRef}
          value={value}
          isAccepted={isAccepted}
          {...other}
        >
          <DatePicker
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
            availableViews={availableViews}
            openTo={openTo}
          />
        </ModalWrapper>
      )}
    </BasePicker>
  );
};

DatePickerModal.defaultProps = {
  availableViews: [DatePickerView.YEAR, DatePickerView.MONTH, DatePickerView.DAY],
};

export default React.forwardRef((props: DatePickerModalProps, ref) => (
  <DatePickerModal {...props} forwardedRef={ref} />
));
