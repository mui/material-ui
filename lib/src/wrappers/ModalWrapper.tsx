import * as React from 'react';
import * as PropTypes from 'prop-types';
import ModalDialog from '../_shared/ModalDialog';
import { Omit } from '@material-ui/core';
import { WrapperProps } from './Wrapper';
import { DialogProps as DialogPropsType } from '@material-ui/core/Dialog';

export interface ModalWrapperProps<T = {}> extends WrapperProps<T> {
  /**
   * "OK" label message
   * @default 'OK'
   */
  okLabel?: React.ReactNode;
  /**
   * "CANCEL" label message
   * @default 'CANCEL'
   */
  cancelLabel?: React.ReactNode;
  /**
   * "CLEAR" label message
   * @default 'CLEAR'
   */
  clearLabel?: React.ReactNode;
  /**
   * "CLEAR" label message
   * @default 'CLEAR'
   */
  todayLabel?: React.ReactNode;
  /**
   * If true today button will be displayed <b>Note*</b> that clear button has higher priority
   * @default false
   */
  showTodayButton?: boolean;
  /**
   * Show clear action in picker dialog
   * @default false
   */
  clearable?: boolean;
  /** Props to be passed directly to material-ui Dialog */
  DialogProps?: Partial<Omit<DialogPropsType, 'classes'>>;
}

export const ModalWrapper: React.FC<ModalWrapperProps<any>> = ({
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
  InputComponent,
  DateInputProps,
  onClear,
  onAccept,
  onDismiss,
  onSetToday,
  ...other
}) => {
  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
          onAccept();
          break;
        default:
          return; // if key is not handled, stop execution
      }

      // if event was handled prevent other side effects
      event.preventDefault();
    },
    [onAccept]
  );

  return (
    <React.Fragment>
      <InputComponent {...other} {...DateInputProps} />

      <ModalDialog
        wider={wider}
        showTabs={showTabs}
        open={open}
        onKeyDownInner={handleKeyDown}
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
        {...DialogProps}
      />
    </React.Fragment>
  );
};

ModalWrapper.propTypes = {
  okLabel: PropTypes.node,
  cancelLabel: PropTypes.node,
  clearLabel: PropTypes.node,
  clearable: PropTypes.bool,
  todayLabel: PropTypes.node,
  showTodayButton: PropTypes.bool,
  DialogProps: PropTypes.object,
} as any;

ModalWrapper.defaultProps = {
  okLabel: 'OK',
  cancelLabel: 'Cancel',
  clearLabel: 'Clear',
  todayLabel: 'Today',
  clearable: false,
  showTodayButton: false,
};

export default ModalWrapper;
