import React from 'react';
import { BasePickerProps } from '../typings/BasePicker';
import { DateInputProps } from '../_shared/PureDateInput';
import { ResponsiveWrapperProps } from './ResponsiveWrapper';
import { DateValidationProps } from '../_helpers/text-field-helper';
import { OmitInnerWrapperProps, SomeWrapper, WrapperProps } from './Wrapper';

interface MakePickerOptions<TInputValue, TDateValue> {
  PureDateInputComponent?: React.FC<DateInputProps<TInputValue, TDateValue>>;
  KeyboardDateInputComponent?: React.FC<DateInputProps<TInputValue, TDateValue>>;
}

interface WithWrapperProps<TInputValue, TDateValue> {
  children: React.ReactNode;
  inputProps: DateInputProps<TInputValue, TDateValue>;
  wrapperProps: Omit<WrapperProps, 'DateInputProps'>;
}

/** Creates a component that rendering modal/popover/nothing and spreading props down to text field */
export function makeWrapperComponent<TInputValue, TDateValue, TWrapper extends SomeWrapper = any>(
  Wrapper: TWrapper,
  { KeyboardDateInputComponent, PureDateInputComponent }: MakePickerOptions<TInputValue, TDateValue>
) {
  function WrapperComponent(
    props: Partial<BasePickerProps<TInputValue, TDateValue>> &
      DateValidationProps &
      WithWrapperProps<TInputValue, TDateValue> &
      Partial<OmitInnerWrapperProps<ResponsiveWrapperProps>>
  ) {
    const {
      open,
      value,
      autoOk,
      inputFormat,
      minDateMessage,
      maxDateMessage,
      invalidDateMessage,
      defaultHighlight,
      onChange,
      children,
      clearable,
      clearLabel,
      DialogProps,
      PopoverProps,
      okLabel,
      cancelLabel,
      todayLabel,
      inputProps,
      wrapperProps,
      wider,
      showTabs,
      onAccept,
      onClose,
      onOpen,
      onError,
      strictCompareDates,
      ...restPropsForTextField
    } = props;

    const WrapperComponent = Wrapper as SomeWrapper;

    return (
      <WrapperComponent
        clearable={clearable}
        clearLabel={clearLabel}
        DialogProps={DialogProps}
        okLabel={okLabel}
        todayLabel={todayLabel}
        cancelLabel={cancelLabel}
        DateInputProps={inputProps}
        KeyboardDateInputComponent={KeyboardDateInputComponent}
        PureDateInputComponent={PureDateInputComponent}
        wider={wider}
        showTabs={showTabs}
        {...wrapperProps}
        {...restPropsForTextField}
      >
        {children}
      </WrapperComponent>
    );
  }

  return WrapperComponent;
}
