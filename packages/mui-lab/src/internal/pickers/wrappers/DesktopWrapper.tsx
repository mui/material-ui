import * as React from 'react';
import { useForkRef } from '@mui/material/utils';
import { WrapperVariantContext } from './WrapperVariantContext';
import PickersPopper, {
  ExportedPickerPopperProps,
  ExportedPickerPaperProps,
} from '../PickersPopper';
import { DateInputPropsLike, PrivateWrapperProps } from './WrapperProps';

export interface DesktopWrapperProps extends ExportedPickerPopperProps, ExportedPickerPaperProps {
  children?: React.ReactNode;
}

export interface InternalDesktopWrapperProps extends DesktopWrapperProps, PrivateWrapperProps {
  DateInputProps: DateInputPropsLike & { ref?: React.Ref<HTMLDivElement> };
  KeyboardDateInputComponent: React.JSXElementConstructor<
    DateInputPropsLike & { ref?: React.Ref<HTMLDivElement> }
  >;
}

function DesktopWrapper(props: InternalDesktopWrapperProps) {
  const {
    children,
    DateInputProps,
    KeyboardDateInputComponent,
    onDismiss,
    open,
    PopperProps,
    PaperProps,
    TransitionComponent,
  } = props;
  const ownInputRef = React.useRef<HTMLInputElement>(null);
  const inputRef = useForkRef(DateInputProps.inputRef, ownInputRef);

  return (
    <WrapperVariantContext.Provider value="desktop">
      <KeyboardDateInputComponent {...DateInputProps} inputRef={inputRef} />
      <PickersPopper
        role="dialog"
        open={open}
        anchorEl={ownInputRef.current}
        TransitionComponent={TransitionComponent}
        PopperProps={PopperProps}
        PaperProps={PaperProps}
        onClose={onDismiss}
      >
        {children}
      </PickersPopper>
    </WrapperVariantContext.Provider>
  );
}

export default DesktopWrapper;
