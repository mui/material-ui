import * as React from 'react';
import Snackbar from '@mui/joy/Snackbar';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Close from '@mui/icons-material/Close';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

export default function SnackbarUsage() {
  const [open, setOpen] = React.useState(false);

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
        {
          propName: 'autoHideDuration',
          helperText: 'The duration to be shown (in ms)',
          knob: 'number',
        },
        {
          propName: 'invertedColors',
          knob: 'switch',
          helperText: 'To invert children colors',
        },
      ]}
      renderDemo={(props) => (
        <React.Fragment>
          <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
            Show Snackbar
          </Button>
          <Snackbar
            open={open}
            onClose={(event, reason) => {
              if (reason === 'clickaway') {
                return;
              }

              setOpen(false);
            }}
            startDecorator={<InfoOutlined />}
            endDecorator={
              <IconButton onClick={() => setOpen(false)}>
                <Close />
              </IconButton>
            }
            {...props}
          >
            <div>
              <Typography level="title-md">Notification alert</Typography>
              <Typography level="body-sm">
                102 unread messages since last month.
              </Typography>
            </div>
          </Snackbar>
        </React.Fragment>
      )}
    />
  );
}
