import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import * as React from 'react';
import EventListener from 'react-event-listener';
import { DIALOG_WIDTH } from '../constants/dimensions';

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
  ...other
}) => (
  <Dialog
    role="dialog"
    onClose={onDismiss}
    classes={{
      paper: classnames(classes.dialogRoot, {
        [classes.dialogWithTabs]: showTabs,
      }),
    }}
    {...other}
  >
    <EventListener target="window" onKeyDown={onKeyDownInner} />
    <DialogContent
      children={children}
      className={classnames(classes.dialog, {
        [classes.dialogWithTabs]: showTabs,
      })}
    />

    <DialogActions
      classes={{
        root: clearable || showTodayButton ? classes.dialogActions : undefined,
        action: classnames(classes.dialogAction, {
          [classes.clearableDialogAction]: clearable,
          [classes.todayDialogAction]: !clearable && showTodayButton,
        }),
      }}
    >
      {clearable && (
        <Button color="primary" onClick={onClear}>
          {clearLabel}
        </Button>
      )}

      {!clearable &&
        showTodayButton && (
          <Button color="primary" onClick={onSetToday}>
            {todayLabel}
          </Button>
        )}

      <Button color="primary" onClick={onDismiss}>
        {cancelLabel}
      </Button>

      <Button color="primary" onClick={onAccept}>
        {okLabel}
      </Button>
    </DialogActions>
  </Dialog>
);

ModalDialog.displayName = 'ModalDialog';

const dialogHeight = 405;
const dialogHeightWithTabs = 455;

export const styles = createStyles({
  dialogRoot: {
    minWidth: DIALOG_WIDTH,
    minHeight: dialogHeight,
  },
  dialog: {
    minHeight: dialogHeight,
    overflow: 'hidden',

    '&:first-child': {
      padding: 0,
    },
  },
  dialogWithTabs: {
    minHeight: dialogHeightWithTabs,
  },
  dialogActions: {
    // set justifyContent to default value to fix IE11 layout bug
    // see https://github.com/dmtrKovalenko/material-ui-pickers/pull/267
    justifyContent: 'flex-start',
  },
  clearableDialogAction: {
    '&:first-child': {
      marginRight: 'auto',
    },
  },
  todayDialogAction: {
    '&:first-child': {
      marginRight: 'auto',
    },
  },
  dialogAction: {
    // empty but may be needed for override
  },
});

export default withStyles(styles, { name: 'MuiPickersModal' })(ModalDialog);
