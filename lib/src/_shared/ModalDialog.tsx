import * as React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import EventListener from 'react-event-listener';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { DIALOG_WIDTH, DIALOG_WIDTH_WIDER } from '../constants/dimensions';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

export interface ModalDialogProps extends DialogProps {
  onAccept: () => void;
  onDismiss: () => void;
  onClear: () => void;
  onSetToday: () => void;
  onKeyDownInner: (e: KeyboardEvent) => void;
  okLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  clearLabel?: React.ReactNode;
  todayLabel?: React.ReactNode;
  clearable?: boolean;
  showTodayButton?: boolean;
  showTabs?: boolean;
  wider?: boolean;
}

export const ModalDialog: React.SFC<ModalDialogProps & WithStyles<typeof styles>> = ({
  children,
  classes,
  onKeyDownInner,
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
}) => (
  <Dialog
    role="dialog"
    onClose={onDismiss}
    classes={{
      paper: clsx(classes.dialogRoot, {
        [classes.dialogRootWider]: wider,
      }),
    }}
    {...other}
  >
    <EventListener target="window" onKeyDown={onKeyDownInner} />
    <DialogContent children={children} className={classes.dialog} />

    <DialogActions
      classes={{
        root: clsx({
          [classes.withAdditionalAction]: clearable || showTodayButton,
        }),
      }}
    >
      {clearable && (
        <Button color="primary" onClick={onClear}>
          {clearLabel}
        </Button>
      )}

      {!clearable && showTodayButton && (
        <Button color="primary" onClick={onSetToday}>
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

ModalDialog.displayName = 'ModalDialog';

export const styles = createStyles({
  dialogRoot: {
    minWidth: DIALOG_WIDTH,
    maxWidth: DIALOG_WIDTH_WIDER,
  },
  dialogRootWider: {
    minWidth: DIALOG_WIDTH_WIDER,
  },
  dialog: {
    // minHeight: dialogHeight,
    overflow: 'hidden',

    '&:first-child': {
      padding: 0,
    },
  },
  withAdditionalAction: {
    // set justifyContent to default value to fix IE11 layout bug
    // see https://github.com/dmtrKovalenko/material-ui-pickers/pull/267
    justifyContent: 'flex-start',

    '& > *:first-child': {
      marginRight: 'auto',
    },
  },
});

export default withStyles(styles, { name: 'MuiPickersModal' })(ModalDialog);
