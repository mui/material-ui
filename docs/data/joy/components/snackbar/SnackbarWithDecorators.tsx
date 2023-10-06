import * as React from 'react';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';

interface CloseButtonProps {
  onClose: () => React.Dispatch<React.SetStateAction<boolean>>;
}

function CloseButton(props: CloseButtonProps) {
  const { onClose } = props;
  return (
    <Button onClick={onClose} size="sm" variant="plain" color="neutral">
      Dismiss
    </Button>
  );
}

export default function SnackbarWithDecorators() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" onClick={handleOpen}>
        Show Snackbar
      </Button>
      <Snackbar
        variant="outlined"
        color="success"
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        slots={{
          startDecorator: PlaylistAddCheckCircleRoundedIcon,
          endDecorator: CloseButton,
        }}
        slotProps={{
          endDecorator: {
            onClose: handleClose,
          },
        }}
      >
        Your message was sent successfully.
      </Snackbar>
    </React.Fragment>
  );
}
