import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardDateInput from '../_shared/KeyboardDateInput';
import { DateInputProps } from '../_shared/PureDateInput';
import { InnerMobileWrapperProps } from '../wrappers/MobileWrapper';

interface MobileKeyboardInputViewProps extends DateInputProps, Partial<InnerMobileWrapperProps> {}

const useStyles = makeStyles(() => ({
  mobileKeyboardView: {
    padding: '16px 24px',
  },
}));

export const MobileKeyboardInputView: React.FC<MobileKeyboardInputViewProps> = ({
  clearLabel,
  DialogProps,
  clearable,
  ...other
}) => {
  const classes = useStyles();
  return (
    <div className={classes.mobileKeyboardView}>
      <KeyboardDateInput autoFocus fullWidth {...other} hideOpenPickerButton ignoreInvalidInputs />
    </div>
  );
};
