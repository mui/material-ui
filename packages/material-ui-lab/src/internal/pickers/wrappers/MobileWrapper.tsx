import * as React from 'react';
import PropTypes from 'prop-types';
import { PureDateInput } from '../PureDateInput';
import { WrapperVariantContext } from './WrapperVariantContext';
import PickersModalDialog, { ExportedPickerModalProps } from '../PickersModalDialog';
import { PrivateWrapperProps } from './WrapperProps';

export interface MobileWrapperProps extends ExportedPickerModalProps {
  children?: React.ReactNode;
}

const MobileWrapper: React.FC<MobileWrapperProps & PrivateWrapperProps> = (props) => {
  const {
    cancelText,
    children,
    clearable,
    clearText,
    DateInputProps,
    DialogProps,
    KeyboardDateInputComponent,
    okText,
    onAccept,
    onClear,
    onDismiss,
    onSetToday,
    open,
    PureDateInputComponent = PureDateInput,
    showTodayButton,
    todayText,
    ...other
  } = props;

  return (
    <WrapperVariantContext.Provider value="mobile">
      <PureDateInputComponent {...other} {...DateInputProps} />
      <PickersModalDialog
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
        DialogProps={DialogProps}
      >
        {children}
      </PickersModalDialog>
    </WrapperVariantContext.Provider>
  );
};

MobileWrapper.propTypes = {
  cancelText: PropTypes.node,
  clearable: PropTypes.bool,
  clearText: PropTypes.node,
  DialogProps: PropTypes.object,
  okText: PropTypes.node,
  showTodayButton: PropTypes.bool,
  todayText: PropTypes.node,
};

export default MobileWrapper;
