import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';

function FadeSnackbar() {
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Button onClick={handleClick}>Open with Fade Transition</Button>
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">I love snacks</span>}
      />
    </div>
  );
}

export default FadeSnackbar;
