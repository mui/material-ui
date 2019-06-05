import * as React from 'react';
import KeyboardDateInput, { KeyboardDateInputProps } from '../_shared/KeyboardDateInput';
import { Picker, ToolbarComponentProps } from './Picker';
import { ExtendWrapper, Wrapper } from '../wrappers/Wrapper';
import { StateHookOptions } from '../_shared/hooks/usePickerState';
import { DateValidationProps } from '../_helpers/text-field-helper';
import {
  BaseKeyboardPickerProps,
  useKeyboardPickerState,
} from '../_shared/hooks/useKeyboardPickerState';

export type WrappedKeyboardPickerProps = DateValidationProps &
  BaseKeyboardPickerProps &
  ExtendWrapper<KeyboardDateInputProps>;

export interface MakePickerOptions<T> {
  useOptions: (props: any) => StateHookOptions;
  ToolbarComponent: React.ComponentType<ToolbarComponentProps>;
}

export function makeKeyboardPicker<T extends any>({
  useOptions,
  ToolbarComponent,
}: MakePickerOptions<T>): React.FC<WrappedKeyboardPickerProps & T> {
  function WrappedKeyboardPicker(props: WrappedKeyboardPickerProps & T) {
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
      value,
      dateRangeIcon,
      timeIcon,
      variant,
      disableToolbar,
      loadingIndicator,
      ...other
    } = props;

    const options = useOptions(props);
    const { pickerProps, inputProps, wrapperProps } = useKeyboardPickerState(props, options);

    return (
      <Wrapper
        variant={variant}
        InputComponent={KeyboardDateInput}
        DateInputProps={inputProps}
        {...wrapperProps}
        {...other}
      >
        <Picker
          {...pickerProps}
          ToolbarComponent={ToolbarComponent}
          disableToolbar={disableToolbar}
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

  return WrappedKeyboardPicker;
}
