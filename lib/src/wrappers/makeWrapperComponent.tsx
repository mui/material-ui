import React from 'react';
import { StaticWrapperProps } from './StaticWrapper';
import { BasePickerProps } from '../typings/BasePicker';
import { DateInputProps } from '../_shared/PureDateInput';
import { ResponsiveWrapperProps } from './ResponsiveWrapper';
import { DateValidationProps } from '../_helpers/text-field-helper';
import { OmitInnerWrapperProps, SomeWrapper, WrapperProps } from './Wrapper';

interface MakePickerOptions<TInputProps> {
  PureDateInputComponent?: React.FC<TInputProps>;
  KeyboardDateInputComponent?: React.FC<TInputProps>;
}

interface WithWrapperProps<TInputProps = DateInputProps> {
  children: React.ReactNode;
  inputProps: TInputProps;
  wrapperProps: Omit<WrapperProps, 'DateInputProps'>;
}

/** Creates a component that rendering modal/popover/nothing and spreading props down to text field */
export function makeWrapperComponent<
  TInputProps extends DateInputProps<TInputValue, TDateValue>,
  TInputValue,
  TDateValue,
  TWrapper extends SomeWrapper = any
>(
  Wrapper: TWrapper,
  { KeyboardDateInputComponent, PureDateInputComponent }: MakePickerOptions<TInputProps>
) {
  function WrapperComponent(
    props: Partial<BasePickerProps<TInputValue, TDateValue>> &
      DateValidationProps &
      WithWrapperProps<TInputProps> &
      Partial<OmitInnerWrapperProps<ResponsiveWrapperProps> & StaticWrapperProps>
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
      displayStaticWrapperAs,
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
        // @ts-ignore
        KeyboardDateInputComponent={KeyboardDateInputComponent}
        // @ts-ignore
        PureDateInputComponent={PureDateInputComponent}
        wider={wider}
        showTabs={showTabs}
        displayStaticWrapperAs={displayStaticWrapperAs}
        {...wrapperProps}
        {...restPropsForTextField}
      >
        {children}
      </WrapperComponent>
    );
  }

  return WrapperComponent;
}
