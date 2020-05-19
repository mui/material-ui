import * as React from 'react';
import * as PropTypes from 'prop-types';
import { WrapperProps } from './Wrapper';
import { StaticWrapperProps } from './StaticWrapper';
import { PureDateInput } from '../_shared/PureDateInput';
import { InnerDesktopWrapperProps } from './DesktopWrapper';
import { WrapperVariantContext } from './WrapperVariantContext';
import { DialogProps as MuiDialogProps } from '@material-ui/core/Dialog';
import { PickerModalDialog, ExportedPickerModalProps } from '../_shared/PickerModalDialog';

export interface InnerMobileWrapperProps extends ExportedPickerModalProps {
  /**
   * Props to be passed directly to material-ui Dialog
   * @type {Partial<MuiDialogProps>}
   */
  DialogProps?: Partial<MuiDialogProps>;
}

export interface MobileWrapperProps
  extends InnerMobileWrapperProps,
    WrapperProps,
    Partial<InnerDesktopWrapperProps & StaticWrapperProps> {}

export const MobileWrapper: React.FC<MobileWrapperProps> = ({
  open,
  children,
  okText,
  cancelText,
  clearText,
  todayText,
  showTodayButton,
  clearable,
  DialogProps,
  showTabs,
  wider,
  DateInputProps,
  onClear,
  onAccept,
  onDismiss,
  onSetToday,
  PopoverProps,
  displayStaticWrapperAs,
  KeyboardDateInputComponent,
  PureDateInputComponent = PureDateInput,
  ...other
}) => {
  return (
    <WrapperVariantContext.Provider value="mobile">
      <PureDateInputComponent {...other} {...DateInputProps} />

      <PickerModalDialog
        wider={wider}
        showTabs={showTabs}
        open={open}
        onClear={onClear}
        onAccept={onAccept}
        onDismiss={onDismiss}
        onSetToday={onSetToday}
        clearText={clearText}
        todayText={todayText}
        okText={okText}
        cancelText={cancelText}
        clearable={clearable}
        showTodayButton={showTodayButton}
        children={children}
        data-mui-test="mobile-wrapper-dialog"
        {...DialogProps}
      />
    </WrapperVariantContext.Provider>
  );
};

MobileWrapper.propTypes = {
  okText: PropTypes.node,
  cancelText: PropTypes.node,
  clearText: PropTypes.node,
  clearable: PropTypes.bool,
  todayText: PropTypes.node,
  showTodayButton: PropTypes.bool,
  DialogProps: PropTypes.object,
};
