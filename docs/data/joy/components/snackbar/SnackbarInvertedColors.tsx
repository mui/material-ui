import * as React from 'react';
import Snackbar from '@mui/joy/Snackbar';
import IconButton from '@mui/joy/IconButton';
import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';

function SnackbarStartDecorator() {
  return (
    <AspectRatio
      variant="solid"
      ratio="1"
      sx={{
        minWidth: 30,
        borderRadius: '50%',
        boxShadow: '0 2px 12px 0 rgb(0 0 0/0.2)',
      }}
    >
      <div>
        <Check />
      </div>
    </AspectRatio>
  );
}

interface SnackbarEndDecoratorProps {
  onClose: () => React.Dispatch<React.SetStateAction<boolean>>;
}

function SnackbarEndDecorator(props: SnackbarEndDecoratorProps) {
  return (
    <IconButton
      variant="plain"
      sx={{
        '--IconButton-size': '32px',
        transform: 'translate(0.5rem, -0.5rem)',
      }}
      onClick={props.onClose}
    >
      <Close />
    </IconButton>
  );
}

export default function SnackbarInvertedColors() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" onClick={handleOpen}>
        Show Snackbar
      </Button>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={5000}
        variant="solid"
        invertedColors
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        I love snacks
      </Snackbar>
    </React.Fragment>
  );
}
