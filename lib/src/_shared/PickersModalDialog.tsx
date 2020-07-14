import * as React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import { DIALOG_WIDTH, DIALOG_WIDTH_WIDER } from '../constants/dimensions';

export interface ExportedPickerModalProps {
  /**
   * "OK" button text.
   * @default "OK"
   */
  okText?: React.ReactNode;
  /**
   * "CANCEL" Text message
   * @default "CANCEL"
   */
  cancelText?: React.ReactNode;
  /**
   * "CLEAR" Text message
   * @default "CLEAR"
   */
  clearText?: React.ReactNode;
  /**
   * "TODAY" Text message
   * @default "TODAY"
   */
  todayText?: React.ReactNode;
  /**
   * If `true`, it shows the clear action in the picker dialog.
   * @default false
   */
  clearable?: boolean;
  /**
   * If `true`, the today button will be displayed. **Note** that `showClearButton` has a higher priority.
   * @default false
   */
  showTodayButton?: boolean;
  showTabs?: boolean;
  wider?: boolean;
}

export interface PickerModalDialogProps extends ExportedPickerModalProps, DialogProps {
  onAccept: () => void;
  onClear: () => void;
  onDismiss: () => void;
  onSetToday: () => void;
}

export const useStyles = makeStyles(
  {
    dialogRoot: {
      minWidth: DIALOG_WIDTH,
    },
    dialogRootWider: {
      minWidth: DIALOG_WIDTH_WIDER,
    },
    dialogContainer: {
      '&:focus > $dialogRoot': {
        outline: 'auto',
        '@media (pointer:coarse)': {
          outline: 0,
        },
      },
    },
    dialog: {
      '&:first-child': {
        padding: 0,
      },
    },
    dialogAction: {
      // requested for overrides
    },
    withAdditionalAction: {
      // set justifyContent to default value to fix IE11 layout bug
      // see https://github.com/mui-org/material-ui-pickers/pull/267
      justifyContent: 'flex-start',

      '& > *:first-child': {
        marginRight: 'auto',
      },
    },
  },
  { name: 'MuiPickersModalDialog' }
);

export const PickersModalDialog: React.FC<PickerModalDialogProps> = ({
  cancelText = 'Cancel',
  children,
  classes: MuiDialogClasses,
  clearable = false,
  clearText = 'Clear',
  okText = 'OK',
  onAccept,
  onClear,
  onDismiss,
  onSetToday,
  showTabs,
  showTodayButton = false,
  todayText = 'Today',
  wider,
  ...other
}) => {
  const classes = useStyles();
  return (
    <Dialog
      onClose={onDismiss}
      classes={{
        container: classes.dialogContainer,
        paper: clsx(classes.dialogRoot, {
          [classes.dialogRootWider]: wider,
        }),
        ...MuiDialogClasses,
      }}
      {...other}
    >
      <DialogContent children={children} className={classes.dialog} />

      <DialogActions
        className={clsx(classes.dialogAction, {
          [classes.withAdditionalAction]: clearable || showTodayButton,
        })}
      >
        {clearable && (
          <Button data-mui-test="clear-action-button" color="primary" onClick={onClear}>
            {clearText}
          </Button>
        )}

        {showTodayButton && (
          <Button data-mui-test="today-action-button" color="primary" onClick={onSetToday}>
            {todayText}
          </Button>
        )}

        {cancelText && (
          <Button color="primary" onClick={onDismiss}>
            {cancelText}
          </Button>
        )}

        {okText && (
          <Button color="primary" onClick={onAccept}>
            {okText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
