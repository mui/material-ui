import * as React from 'react';
import * as PropTypes from 'prop-types';
import ModalDialog from '../_shared/ModalDialog';
import { WrapperProps } from './Wrapper';
import { PureDateInput } from '../_shared/PureDateInput';
import { InnerDesktopWrapperProps } from './DesktopWrapper';
import { WrapperVariantContext } from './WrapperVariantContext';
import { DialogProps as MuiDialogProps } from '@material-ui/core/Dialog';

export interface InnerMobileWrapperProps {
  /**
   * "OK" label message
   * @default "OK"
   */
  okLabel?: React.ReactNode;
  /**
   * "CANCEL" label message
   * @default "CANCEL"
   */
  cancelLabel?: React.ReactNode;
  /**
   * "CLEAR" label message
   * @default "CLEAR"
   */
  clearLabel?: React.ReactNode;
  /**
   * "TODAY" label message
   * @default "TODAY"
   */
  todayLabel?: React.ReactNode;
  /**
   * If true today button will be displayed. **Note** that clear button has higher priority
   * @default false
   */
  showTodayButton?: boolean;
  /**
   * Show clear action in picker dialog
   * @default false
   */
  clearable?: boolean;
  /**
   * Props to be passed directly to material-ui Dialog
   * @type {Partial<MuiDialogProps>}
   */
  DialogProps?: Partial<Omit<MuiDialogProps, 'classes'>>;
  showTabs?: boolean;
  wider?: boolean;
}

export interface MobileWrapperProps
  extends InnerMobileWrapperProps,
    WrapperProps,
    Partial<InnerDesktopWrapperProps> {}

export const MobileWrapper: React.FC<MobileWrapperProps> = ({
  open,
  children,
  okLabel,
  cancelLabel,
  clearLabel,
  todayLabel,
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
  KeyboardDateInputComponent,
  PureDateInputComponent = PureDateInput,
  ...other
}) => {
  return (
    <WrapperVariantContext.Provider value="mobile">
      <PureDateInputComponent {...other} {...DateInputProps} />

      <ModalDialog
        wider={wider}
        showTabs={showTabs}
        open={open}
        onClear={onClear}
        onAccept={onAccept}
        onDismiss={onDismiss}
        onSetToday={onSetToday}
        clearLabel={clearLabel}
        todayLabel={todayLabel}
        okLabel={okLabel}
        cancelLabel={cancelLabel}
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
  okLabel: PropTypes.node,
  cancelLabel: PropTypes.node,
  clearLabel: PropTypes.node,
  clearable: PropTypes.bool,
  todayLabel: PropTypes.node,
  showTodayButton: PropTypes.bool,
  DialogProps: PropTypes.object,
} as any;

MobileWrapper.defaultProps = {
  okLabel: 'OK',
  cancelLabel: 'Cancel',
  clearLabel: 'Clear',
  todayLabel: 'Today',
  clearable: false,
  showTodayButton: false,
};
