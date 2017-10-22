import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, Button, withStyles } from 'material-ui';

const styles = {
  dialog: {
    '&:first-child': {
      padding: 0,
    },
  },
};

const ModalDialog = (props) => {
  const {
    children, classes, onAccept, onDismiss, ...other
  } = props;

  return (
    <Dialog {...other}>
      <DialogContent className={classes.dialog}>
        { children }
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={onAccept}> OK </Button>
        <Button color="primary" onClick={onDismiss}> Cancel </Button>
      </DialogActions>
    </Dialog>
  );
};

ModalDialog.propTypes = {
  children: PropTypes.node.isRequired,
  onAccept: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { name: 'MuiPickersModal' })(ModalDialog);
