import * as React from 'react';
import * as PropTypes from 'prop-types';
import { WrapperProps } from './Wrapper';
import { StaticWrapperProps } from './StaticWrapper';
import { InnerMobileWrapperProps } from './MobileWrapper';
import { WrapperVariantContext } from './WrapperVariantContext';
import { KeyboardDateInput } from '../_shared/KeyboardDateInput';
import { InnerDesktopTooltipWrapperProps } from './DesktopTooltipWrapper';
import { PickerPopper, ExportedPickerPopperProps } from '../_shared/PickerPopper';
import { CanAutoFocusContext, useAutoFocusControl } from '../_shared/hooks/useCanAutoFocus';

export interface InnerDesktopWrapperProps extends ExportedPickerPopperProps {}

export interface DesktopWrapperProps
  extends InnerDesktopWrapperProps,
    WrapperProps,
    Partial<InnerMobileWrapperProps & InnerDesktopTooltipWrapperProps & StaticWrapperProps> {}

export const DesktopWrapper: React.FC<DesktopWrapperProps> = ({
  children,
  DateInputProps,
  KeyboardDateInputComponent = KeyboardDateInput,
  onDismiss,
  open,
  PopperProps,
  TransitionComponent,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { canAutoFocus, onOpen } = useAutoFocusControl(open);

  return (
    <WrapperVariantContext.Provider value="desktop">
      <CanAutoFocusContext.Provider value={canAutoFocus}>
        <KeyboardDateInputComponent {...DateInputProps} inputRef={inputRef} />

        <PickerPopper
          role="dialog"
          open={open}
          anchorEl={inputRef.current}
          TransitionComponent={TransitionComponent}
          PopperProps={PopperProps}
          onClose={onDismiss}
          onOpen={onOpen}
        >
          {children}
        </PickerPopper>
      </CanAutoFocusContext.Provider>
    </WrapperVariantContext.Provider>
  );
};

DesktopWrapper.propTypes = {
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
} as any;
