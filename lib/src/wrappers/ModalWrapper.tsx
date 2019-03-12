import { Omit } from '@material-ui/core';
import { DialogProps as DialogPropsType } from '@material-ui/core/Dialog';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import ModalDialog from '../_shared/ModalDialog';
import { WrapperProps } from './Wrapper';

export interface ModalWrapperProps<T = {}> extends WrapperProps<T> {
  /** On open callback */
  onOpen?: () => void;
  /** On close callback */
  onClose?: () => void;
  /** "OK" label message */
  okLabel?: React.ReactNode;
  /** "Cancel" label message */
  cancelLabel?: React.ReactNode;
  /** "Clear" label message */
  clearLabel?: React.ReactNode;
  /** "Today" label message */
  todayLabel?: React.ReactNode;
  showTabs?: boolean;
  /**
   * If true today button will be displayed
   * <b>Note*</b> that clear button has higher priority
   */
  showTodayButton?: boolean;
  /** Props to be passed directly to material-ui Dialog */
  DialogProps?: Partial<Omit<DialogPropsType, 'classes'>>;
  /** Show clear action in picker dialog */
  clearable?: boolean;
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
  onOpen: PropTypes.func,
  DialogProps: PropTypes.object,
  onClose: PropTypes.func,
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
