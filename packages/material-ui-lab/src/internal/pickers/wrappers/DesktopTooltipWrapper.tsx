import * as React from 'react';
import { WrapperVariantContext } from './WrapperVariantContext';
import { KeyboardDateInput } from '../KeyboardDateInput';
import { executeInTheNextEventLoopTick } from '../utils';
import PickersPopper from '../PickersPopper';
import { CanAutoFocusContext, useAutoFocusControl } from '../hooks/useCanAutoFocus';
import { PrivateWrapperProps, DesktopWrapperProps } from './WrapperProps';

const DesktopTooltipWrapper: React.FC<PrivateWrapperProps & DesktopWrapperProps> = (props) => {
  const {
    open,
    children,
    PopperProps,
    onDismiss,
    DateInputProps,
    TransitionComponent,
    KeyboardDateInputComponent = KeyboardDateInput,
  } = props;
  const inputRef = React.useRef<HTMLDivElement>(null);
  const popperRef = React.useRef<HTMLDivElement>(null);
  const { canAutoFocus, onOpen } = useAutoFocusControl(open);

  const handleBlur = () => {
    executeInTheNextEventLoopTick(() => {
      if (
        inputRef.current?.contains(document.activeElement) ||
        popperRef.current?.contains(document.activeElement)
      ) {
        return;
      }

      onDismiss();
    });
  };

  return (
    <WrapperVariantContext.Provider value="desktop">
      <CanAutoFocusContext.Provider value={canAutoFocus}>
        <KeyboardDateInputComponent
          {...DateInputProps}
          containerRef={inputRef}
          onBlur={handleBlur}
        />
        <PickersPopper
          role="tooltip"
          open={open}
          containerRef={popperRef}
          anchorEl={inputRef.current}
          TransitionComponent={TransitionComponent}
          PopperProps={PopperProps}
          onBlur={handleBlur}
          onClose={onDismiss}
          onOpen={onOpen}
        >
          {children}
        </PickersPopper>
      </CanAutoFocusContext.Provider>
    </WrapperVariantContext.Provider>
  );
};

export default DesktopTooltipWrapper;
