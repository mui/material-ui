import * as React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import { DIALOG_WIDTH, DIALOG_WIDTH_WIDER } from '../constants/dimensions';

export interface ModalDialogProps extends DialogProps {
  onAccept: () => void;
  onDismiss: () => void;
  onClear: () => void;
  onSetToday: () => void;
  okLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  clearLabel?: React.ReactNode;
  todayLabel?: React.ReactNode;
  clearable?: boolean;
  showTodayButton?: boolean;
  showTabs?: boolean;
  wider?: boolean;
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
    withAdditionalAction: {
      // set justifyContent to default value to fix IE11 layout bug
      // see https://github.com/mui-org/material-ui-pickers/pull/267
      justifyContent: 'flex-start',

      '& > *:first-child': {
        marginRight: 'auto',
      },
    },
  },
  { name: 'MuiPickersModal' }
);

export const ModalDialog: React.FC<ModalDialogProps> = ({
  children,
  onAccept,
  onDismiss,
  onClear,
  onSetToday,
  okLabel,
  cancelLabel,
  clearLabel,
  todayLabel,
  clearable,
  showTodayButton,
  showTabs,
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
      }}
      {...other}
    >
      <DialogContent children={children} className={classes.dialog} />

      <DialogActions
        className={clsx({
          [classes.withAdditionalAction]: clearable || showTodayButton,
        })}
      >
        {clearable && (
          <Button data-mui-test="clear-action-button" color="primary" onClick={onClear}>
            {clearLabel}
          </Button>
        )}

        {showTodayButton && (
          <Button data-mui-test="today-action-button" color="primary" onClick={onSetToday}>
            {todayLabel}
          </Button>
        )}

        {cancelLabel && (
          <Button color="primary" onClick={onDismiss}>
            {cancelLabel}
          </Button>
        )}

        {okLabel && (
          <Button color="primary" onClick={onAccept}>
            {okLabel}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

ModalDialog.displayName = 'ModalDialog';

export default ModalDialog;
