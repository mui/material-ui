import * as React from 'react';
import { useForkRef } from '@material-ui/core/utils';
import { WrapperVariantContext } from './WrapperVariantContext';
import PickersPopper, { ExportedPickerPopperProps } from '../PickersPopper';
import { DateInputPropsLike, PrivateWrapperProps } from './WrapperProps';

export interface DesktopWrapperProps extends ExportedPickerPopperProps {
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
      >
        {children}
      </PickersPopper>
    </WrapperVariantContext.Provider>
  );
}

export default DesktopWrapper;
