import * as React from 'react';
import { WrapperVariantContext } from './WrapperVariantContext';
import PickersModalDialog, { ExportedPickerModalProps } from '../PickersModalDialog';
import { PrivateWrapperProps, DateInputPropsLike } from './WrapperProps';

export interface MobileWrapperProps extends ExportedPickerModalProps {
  children?: React.ReactNode;
}

export interface InternalMobileWrapperProps extends MobileWrapperProps, PrivateWrapperProps {
  DateInputProps: DateInputPropsLike & { ref?: React.Ref<HTMLDivElement> };
  PureDateInputComponent: React.JSXElementConstructor<DateInputPropsLike>;
}

function MobileWrapper(props: InternalMobileWrapperProps) {
  const {
    cancelText,
    children,
    clearable,
    clearText,
    DateInputProps,
    DialogProps,
    okText,
    onAccept,
    onClear,
    onDismiss,
    onSetToday,
    open,
    PureDateInputComponent,
    showTodayButton,
    todayText,
    ...other
  } = props;

  return (
    <WrapperVariantContext.Provider value="mobile">
      <PureDateInputComponent {...other} {...DateInputProps} />
      <PickersModalDialog
        cancelText={cancelText}
        clearable={clearable}
        clearText={clearText}
        DialogProps={DialogProps}
        okText={okText}
        onAccept={onAccept}
        onClear={onClear}
        onDismiss={onDismiss}
        onSetToday={onSetToday}
        open={open}
        showTodayButton={showTodayButton}
        todayText={todayText}
      >
        {children}
      </PickersModalDialog>
    </WrapperVariantContext.Provider>
  );
}

export default MobileWrapper;
