import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Snackbar, { SnackbarOrigin } from '@mui/joy/Snackbar';

export default function SnackbarVariants() {
  const [open, setOpen] = React.useState(false);
  const [duration, setDuration] = React.useState();
  const [left, setLeft] = React.useState();
  const timer = React.useRef();
  const countdown = () => {
    timer.current = setInterval(() => {
      setLeft((prev) => prev - 16);
    }, 16); // 60fps = 16ms / frame
  };
  React.useEffect(() => {
    if (open && duration > 0) {
      setLeft(duration);
      countdown();
    } else {
      setLeft(undefined);
      window.clearInterval(timer.current);
    }
  }, [open]);
  const handlePause = () => {
    window.clearInterval(timer.current);
  };
  const handleResume = () => {
    countdown();
  };
  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <FormControl disabled={open} sx={{ display: 'grid', columnGap: 1 }}>
        <FormLabel sx={{ gridColumn: 'span 2' }}>Auto Hide Duration (ms)</FormLabel>
        <Input
          type="number"
          value={duration || ''}
          onChange={(event) => {
            setDuration(event.target.valueAsNumber || undefined);
          }}
        />
        <Button
          disabled={open}
          variant="outlined"
          color="neutral"
          onClick={() => {
            setOpen(true);
          }}
        >
          Show snackbar
        </Button>
      </FormControl>
      <Snackbar
        variant="solid"
        color="danger"
        autoHideDuration={duration}
        resumeHideDuration={left}
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
        onFocus={handlePause}
        onBlur={handleResume}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        This snackbar will{' '}
        {left ? `disappear in ${left}ms` : `not disappear until you click away`}.
      </Snackbar>
    </Stack>
  );
}
