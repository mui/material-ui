import * as React from 'react';
import PropTypes from 'prop-types';
import { WrapperVariantContext } from './WrapperVariantContext';
import { KeyboardDateInput } from '../KeyboardDateInput';
import PickersPopper from '../PickersPopper';
import { CanAutoFocusContext, useAutoFocusControl } from '../hooks/useCanAutoFocus';
import { PrivateWrapperProps, DesktopWrapperProps } from './WrapperProps';

const DesktopWrapper: React.FC<PrivateWrapperProps & DesktopWrapperProps> = (props) => {
  const {
    children,
    DateInputProps,
    KeyboardDateInputComponent = KeyboardDateInput,
    onDismiss,
    open,
    PopperProps,
    TransitionComponent,
  } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { canAutoFocus, onOpen } = useAutoFocusControl(open);

  return (
    <WrapperVariantContext.Provider value="desktop">
      <CanAutoFocusContext.Provider value={canAutoFocus}>
        <KeyboardDateInputComponent {...DateInputProps} inputRef={inputRef} />
        <PickersPopper
          role="dialog"
          open={open}
          anchorEl={inputRef.current}
          TransitionComponent={TransitionComponent}
          PopperProps={PopperProps}
          onClose={onDismiss}
          onOpen={onOpen}
        >
          {children}
        </PickersPopper>
      </CanAutoFocusContext.Provider>
    </WrapperVariantContext.Provider>
  );
};

DesktopWrapper.propTypes = {
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
} as any;

export default DesktopWrapper;
