import * as React from 'react';
import { Picker } from './Picker';
import { BasePickerProps } from '../typings/BasePicker';
import { MakePickerOptions } from './WrappedKeyboardPicker';
import { ExtendWrapper, Wrapper } from '../wrappers/Wrapper';
import { usePickerState } from '../_shared/hooks/usePickerState';
import { DateValidationProps } from '../_helpers/text-field-helper';
import { PureDateInput, PureDateInputProps } from '../_shared/PureDateInput';

export type WrappedPurePickerProps = DateValidationProps &
  BasePickerProps &
  ExtendWrapper<PureDateInputProps>;

export function makePurePicker<T extends any>({
  useOptions,
  ToolbarComponent,
}: MakePickerOptions): React.FC<WrappedPurePickerProps & T> {
  function WrappedPurePicker(props: WrappedPurePickerProps & T) {
    const {
      allowKeyboardControl,
      ampm,
      hideTabs,
      animateYearScrolling,
      autoOk,
      disableFuture,
      disablePast,
      format,
      forwardedRef,
      initialFocusedDate,
      invalidDateMessage,
      labelFunc,
      leftArrowIcon,
      leftArrowButtonProps,
      maxDate,
      maxDateMessage,
      minDate,
      onOpen,
      onClose,
      minDateMessage,
      strictCompareDates,
      minutesStep,
      onAccept,
      onChange,
      onMonthChange,
      onYearChange,
      renderDay,
      views,
      openTo,
      rightArrowIcon,
      rightArrowButtonProps,
      shouldDisableDate,
      dateRangeIcon,
      emptyLabel,
      invalidLabel,
      timeIcon,
      value,
      variant,
      disableToolbar,
      loadingIndicator,
      ...other
    } = props;

    const options = useOptions(props);
    const { pickerProps, inputProps, wrapperProps } = usePickerState(props, options);

    return (
      <Wrapper
        variant={variant}
        InputComponent={PureDateInput}
        DateInputProps={inputProps}
        {...wrapperProps}
        {...other}
      >
        <Picker
          {...pickerProps}
          disableToolbar={disableToolbar}
          ToolbarComponent={ToolbarComponent}
          hideTabs={hideTabs}
          ampm={ampm}
          views={views}
          openTo={openTo}
          allowKeyboardControl={allowKeyboardControl}
          minutesStep={minutesStep}
          animateYearScrolling={animateYearScrolling}
          disableFuture={disableFuture}
          disablePast={disablePast}
          leftArrowIcon={leftArrowIcon}
          leftArrowButtonProps={leftArrowButtonProps}
          maxDate={maxDate}
          minDate={minDate}
          strictCompareDates={strictCompareDates}
          onMonthChange={onMonthChange}
          onYearChange={onYearChange}
          renderDay={renderDay}
          dateRangeIcon={dateRangeIcon}
          timeIcon={timeIcon}
          rightArrowIcon={rightArrowIcon}
          rightArrowButtonProps={rightArrowButtonProps}
          shouldDisableDate={shouldDisableDate}
          loadingIndicator={loadingIndicator}
        />
      </Wrapper>
    );
  }

  return WrappedPurePicker;
}
