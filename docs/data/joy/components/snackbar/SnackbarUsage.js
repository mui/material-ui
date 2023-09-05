import * as React from 'react';
import Snackbar from '@mui/joy/Snackbar';
import Button from '@mui/joy/Button';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

function SimpleSnackbar(props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleClick}>Show Snackbar</Button>
      <Snackbar autoHideDuration={6000} open={open} onClose={handleClose} {...props}>
        Hello World
      </Snackbar>
    </React.Fragment>
  );
}

export default function SnackbarUsage() {
  return (
    <JoyUsageDemo
      componentName="Snackbar"
      data={[
        {
          propName: 'variant',
          knob: 'radio',
          defaultValue: 'outlined',
          options: ['plain', 'outlined', 'soft', 'solid'],
        },
        {
          propName: 'color',
          knob: 'color',
          defaultValue: 'neutral',
        },
        {
          propName: 'size',
          knob: 'radio',
          options: ['sm', 'md', 'lg'],
          defaultValue: 'md',
        },
      ]}
      renderDemo={(props) => <SimpleSnackbar {...props} />}
    />
  );
}
