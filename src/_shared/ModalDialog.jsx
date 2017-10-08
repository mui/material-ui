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
  const { children, classes, ...other } = props;

  return (
    <Dialog {...other}>
      <DialogContent className={classes.dialog}>
        { children }
      </DialogContent>

      <DialogActions>
        <Button onClick={props.onRequestClose}> Cancel </Button>
      </DialogActions>
    </Dialog>
  );
};

ModalDialog.propTypes = {
  children: PropTypes.node.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModalDialog);
