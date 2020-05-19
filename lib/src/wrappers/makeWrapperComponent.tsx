import React from 'react';
import { StaticWrapperProps } from './StaticWrapper';
import { BasePickerProps } from '../typings/BasePicker';
import { DateInputProps } from '../_shared/PureDateInput';
import { ResponsiveWrapperProps } from './ResponsiveWrapper';
import { OmitInnerWrapperProps, SomeWrapper, WrapperProps, DateInputPropsLike } from './Wrapper';

interface MakePickerOptions<TInputProps> {
  PureDateInputComponent?: React.FC<TInputProps>;
  KeyboardDateInputComponent?: React.FC<TInputProps>;
}

interface WithWrapperProps<TInputProps = DateInputProps> {
  children: React.ReactNode;
  DateInputProps: TInputProps;
  wrapperProps: Omit<WrapperProps, 'DateInputProps'>;
}

/** Creates a component that rendering modal/popover/nothing and spreading props down to text field */
export function makeWrapperComponent<
  TInputProps extends DateInputPropsLike<TInputValue, TDateValue>,
  TInputValue,
  TDateValue,
  TWrapper extends SomeWrapper = any
>(
  Wrapper: TWrapper,
  { KeyboardDateInputComponent, PureDateInputComponent }: MakePickerOptions<TInputProps>
) {
  function WrapperComponent(
    props: Partial<BasePickerProps<TInputValue, TDateValue>> &
      WithWrapperProps<TInputProps> &
      Partial<OmitInnerWrapperProps<ResponsiveWrapperProps> & StaticWrapperProps>
  ) {
    const {
      open,
      value,
      autoOk,
      inputFormat,
      onChange,
      children,
      clearable,
      clearText,
      DialogProps,
      PopoverProps,
      okText,
      cancelText,
      todayText,
      DateInputProps,
      wrapperProps,
      wider,
      showTabs,
      onAccept,
      onClose,
      onOpen,
      displayStaticWrapperAs,
      ...restPropsForTextField
    } = props;

    const WrapperComponent = Wrapper as SomeWrapper;

    return (
      <WrapperComponent
        clearable={clearable}
        clearText={clearText}
        DialogProps={DialogProps}
        okText={okText}
        todayText={todayText}
        cancelText={cancelText}
        DateInputProps={DateInputProps}
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
