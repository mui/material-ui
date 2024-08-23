import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Snackbar from '@mui/joy/Snackbar';

export default function SnackbarHideDuration() {
  const [open, setOpen] = React.useState(false);
  const [duration, setDuration] = React.useState();
  const [left, setLeft] = React.useState();
  const timer = React.useRef(undefined);
  const countdown = () => {
    timer.current = setInterval(() => {
      setLeft((prev) => (prev === undefined ? prev : Math.max(0, prev - 100)));
    }, 100);
  };
  React.useEffect(() => {
    if (open && duration !== undefined && duration > 0) {
      setLeft(duration);
      countdown();
    } else {
      window.clearInterval(timer.current);
    }
  }, [open, duration]);
  const handlePause = () => {
    window.clearInterval(timer.current);
  };
  const handleResume = () => {
    countdown();
  };
  return (
    <div>
      <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
        <FormControl disabled={open} sx={{ display: 'grid', columnGap: 1 }}>
          <FormLabel sx={{ gridColumn: 'span 2' }}>
            Auto Hide Duration (ms)
          </FormLabel>
          <Input
            type="number"
            slotProps={{ input: { step: 100 } }}
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
      </Stack>
      <Snackbar
        variant="solid"
        color="danger"
        autoHideDuration={duration}
        resumeHideDuration={left}
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
        onFocus={handlePause}
        onBlur={handleResume}
        onUnmount={() => setLeft(undefined)}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        This snackbar will{' '}
        {left !== undefined
          ? `disappear in ${left}ms`
          : `not disappear until you click away`}
        .
      </Snackbar>
    </div>
  );
}
