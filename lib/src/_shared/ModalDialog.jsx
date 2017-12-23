import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Dialog, DialogActions, DialogContent, Button, withStyles } from 'material-ui';

const dialogWidth = 310;
const styles = {
  dialogRoot: {
    minWidth: dialogWidth,
  },
  dialog: {
    width: dialogWidth,
    height: 420,

    '&:first-child': {
      padding: 0,
    },
  },
};

const ModalDialog = ({
  children,
  classes,
  onAccept,
  onDismiss,
  okLabel,
  cancelLabel,
  dialogContentClassName,
  ...other
}) => (
  <Dialog onClose={onDismiss} classes={{ paper: classes.dialogRoot }} {...other}>
    <DialogContent className={classnames(classes.dialog, dialogContentClassName)}>
      { children }
    </DialogContent>

    <DialogActions>
      <Button
        color="primary"
        onClick={onDismiss}
        tabIndex={-1}
      >
        { cancelLabel }
      </Button>

      <Button
        color="primary"
        onClick={onAccept}
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
  classes: PropTypes.object.isRequired,
  dialogContentClassName: PropTypes.string,
  okLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
};

ModalDialog.defaultProps = {
  dialogContentClassName: '',
  okLabel: 'OK',
  cancelLabel: 'Cancel',
};

export default withStyles(styles, { name: 'MuiPickersModal' })(ModalDialog);
