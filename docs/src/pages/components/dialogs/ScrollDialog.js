import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl'; // debug
import FormControlLabel from '@material-ui/core/FormControlLabel'; // debug
import InputLabel from '@material-ui/core/InputLabel'; // debug
import MenuItem from '@material-ui/core/MenuItem'; // debug
import Select from '@material-ui/core/Select'; // debug
import Switch from '@material-ui/core/Switch'; // debug


function ScrollDialog() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const [filled, setFilled] = React.useState(false); // debug
  const [maxWidth, setMaxWidth] = React.useState('sm'); // debug
  const [fullWidth, setFullWidth] = React.useState(false); // debug
  const [fullScreen, setFullScreen] = React.useState(false); // debug

  const handleClickOpen = scrollType => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  function handleClose() {
    setOpen(false);
  }

  // debug
  function toggleFilled() {
    setFilled(!filled);
  }

  // debug
  function handleMaxWidthChange(event) {
    setMaxWidth(event.target.value);
  }

  // debug
  function handleFullWidthChange(event) {
    setFullWidth(event.target.checked);
  }

  // debug
  function handleFullScreenChange(event) {
    setFullScreen(event.target.checked);
  }

  return (
    <div>
      <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
      <Button onClick={handleClickOpen('body')}>scroll=body</Button>
      <Dialog
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>

          {/* debug start */}
          <form noValidate>
            <FormControl>
              <InputLabel htmlFor="max-width">maxWidth</InputLabel>
              <Select
                value={maxWidth}
                onChange={handleMaxWidthChange}
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
            <br/>
            <FormControlLabel
              control={
                <Switch checked={fullWidth} onChange={handleFullWidthChange} value="fullWidth" />
              }
              label="Full width"
            />
            <br/>
            <FormControlLabel
              control={
                <Switch checked={fullScreen} onChange={handleFullScreenChange} value="fullScreen" />
              }
              label="Full screen"
            />
          </form>
          <br/>
          <div>
            <textarea rows="4">Resize me...</textarea>
          </div>
          <br/>
          <Button onClick={toggleFilled} color="primary" variant="contained">
            Show {filled?'Less':'More'} Content
          </Button>
          <br/>
          <br/>
          {/* debug end */}

          <DialogContentText>
            {filled ? [...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join('\n') : `Cras mattis consectetur.`}
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ScrollDialog;
