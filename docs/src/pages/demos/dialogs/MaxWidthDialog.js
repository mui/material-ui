import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slide from '@material-ui/core/Slide';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing.unit,
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing.unit,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  state = {
    open: false,
    fullWidth: true,
    maxWidth: 'sm',
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleMaxWidthChange = event => {
    this.setState({ maxWidth: event.target.value });
  };

  handleFullWidthChange = event => {
    this.setState({ fullWidth: event.target.checked });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Open max-width dialog</Button>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <DialogTitle id="form-dialog-title">Play with me</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can set my maximum width and whether to adapt or not.
            </DialogContentText>
            <form className={classes.form} noValidate>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="max-width">Max width</InputLabel>
                <Select
                  value={this.state.maxWidth}
                  onChange={this.handleMaxWidthChange}
                  inputProps={{
                    name: 'max-width',
                    id: 'max-width',
                  }}
                >
                  <MenuItem value={false}>false</MenuItem>
                  <MenuItem value="xs">xs</MenuItem>
                  <MenuItem value="sm">sm</MenuItem>
                  <MenuItem value="md">md</MenuItem>
                  <MenuItem value="lg">lg</MenuItem>
                  <MenuItem value="xl">xl</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                className={classes.formControlLabel}
                control={
                  <Switch
                    checked={this.state.fullWidth}
                    onChange={this.handleFullWidthChange}
                    value="fullWidth"
                  />
                }
                label="Full width"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);
