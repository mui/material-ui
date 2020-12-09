import React from 'react';
import { BasePickerProps } from '../typings/BasePicker';
import { ResponsiveWrapperProps } from './ResponsiveWrapper';
import { SomeWrapper } from './Wrapper';
import { StaticWrapperProps, DateInputPropsLike, WrapperProps } from './WrapperProps';

interface MakePickerOptions {
  PureDateInputComponent?: React.ComponentType<DateInputPropsLike>;
  KeyboardDateInputComponent?: React.ComponentType<DateInputPropsLike>;
}

interface WithWrapperProps {
  children: React.ReactNode;
  DateInputProps: DateInputPropsLike;
  wrapperProps: Omit<WrapperProps, 'DateInputProps'>;
}

/* Creates a component that rendering modal/popover/nothing and spreading props down to text field */
export function makeWrapperComponent<TWrapper extends SomeWrapper = any>(
  Wrapper: TWrapper,
  { KeyboardDateInputComponent, PureDateInputComponent }: MakePickerOptions,
) {
  function WrapperComponent(
    props: Partial<BasePickerProps<any, any>> &
      WithWrapperProps &
      ResponsiveWrapperProps &
      StaticWrapperProps,
  ) {
    const {
      disableCloseOnSelect,
      cancelText,
      clearable,
      clearText,
      DateInputProps,
      DialogProps,
      displayStaticWrapperAs,
      inputFormat,
      okText,
      onAccept,
      onChange,
      onClose,
      onOpen,
      open,
      PopperProps,
      todayText,
      value,
      wrapperProps,
      ...other
    } = props;

    const TypedWrapper = Wrapper as SomeWrapper;

    return (
      <TypedWrapper
        clearable={clearable}
        clearText={clearText}
        DialogProps={DialogProps}
        PopperProps={PopperProps}
        okText={okText}
        todayText={todayText}
        cancelText={cancelText}
        DateInputProps={DateInputProps}
        KeyboardDateInputComponent={KeyboardDateInputComponent}
        PureDateInputComponent={PureDateInputComponent}
        displayStaticWrapperAs={displayStaticWrapperAs}
        {...wrapperProps}
        {...other}
      />
    );
  }

  return WrapperComponent;
}

export default makeWrapperComponent;
