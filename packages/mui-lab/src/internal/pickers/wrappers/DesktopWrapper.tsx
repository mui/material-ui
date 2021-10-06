import * as React from 'react';
import { useForkRef } from '@mui/material/utils';
import { PaperProps as MuiPaperProps } from '@mui/material/Paper';
import { WrapperVariantContext } from './WrapperVariantContext';
import PickersPopper, { ExportedPickerPopperProps } from '../PickersPopper';
import { DateInputPropsLike, PrivateWrapperProps } from './WrapperProps';

interface ExportedPickerPaperProps {
  /**
   * Paper props passed down to [Paper](https://mui.com/api/paper/) component.
   */
  PaperProps?: Partial<
    Omit<MuiPaperProps, 'role' | 'tabIndex' | 'ref' | 'onClick' | 'onTouchStart' | 'ownerState'>
  >;
}

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
        onClose={onDismiss}
        {...PaperProps}
      >
        {children}
      </PickersPopper>
    </WrapperVariantContext.Provider>
  );
}

export default DesktopWrapper;
