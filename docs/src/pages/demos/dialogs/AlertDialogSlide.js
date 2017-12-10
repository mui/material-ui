import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import NoSSR from 'docs/src/modules/components/NoSSR'; // Temporary workaround for SSR Portal issue.

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Slide in alert dialog</Button>
        <NoSSR>
          <Dialog
            open={this.state.open}
            transition={Transition}
            keepMounted
            onClose={this.handleClose}
          >
            <DialogTitle>{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Let Google help apps determine location. This means sending anonymous location data
                to Google, even when no apps are running.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Disagree
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </NoSSR>
      </div>
    );
  }
}

export default AlertDialogSlide;
