import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from 'material-ui/styles/withStyles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog/Dialog';
import DialogActions from 'material-ui/Dialog/DialogActions';
import DialogContent from 'material-ui/Dialog/DialogContent';

const dialogWidth = 310;
const styles = {
  dialogRoot: {
    minWidth: dialogWidth,
  },
  dialog: {
    width: dialogWidth,

    '&:first-child': {
      padding: 0,
    },
  },
  dialogActions: {
    '&:first-child': {
      marginRight: 'auto',
    },
  },
};

const ModalDialog = ({
  children,
  classes,
  onAccept,
  onDismiss,
  onClear,
  okLabel,
  cancelLabel,
  clearLabel,
  dialogContentClassName,
  clearable,
  ...other
}) => (
  <Dialog onClose={onDismiss} classes={{ paper: classes.dialogRoot }} {...other}>
    <DialogContent className={classnames(classes.dialog, dialogContentClassName)}>
      { children }
    </DialogContent>

    <DialogActions
      classes={{
        action: clearable && classes.dialogActions,
      }}
    >

      { clearable &&
        <Button
          color="primary"
          onClick={onClear}
          aria-label={clearLabel}
        >
          { clearLabel }
        </Button>
      }
      <Button
        color="primary"
        onClick={onDismiss}
        aria-label={cancelLabel}
      >
        { cancelLabel }
      </Button>

      <Button
        color="primary"
        onClick={onAccept}
        aria-label={okLabel}
      >
        { okLabel }
      </Button>
    </DialogActions>
  </Dialog>
);


ModalDialog.propTypes = {
  children: PropTypes.node.isRequired,
  onAccept: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  dialogContentClassName: PropTypes.string,
  okLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  clearLabel: PropTypes.string,
  clearable: PropTypes.bool.isRequired,
};

ModalDialog.defaultProps = {
  dialogContentClassName: '',
  okLabel: 'OK',
  cancelLabel: 'Cancel',
  clearLabel: 'Clear',
};

export default withStyles(styles, { name: 'MuiPickersModal' })(ModalDialog);
