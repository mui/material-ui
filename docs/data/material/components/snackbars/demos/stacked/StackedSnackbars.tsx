import * as React from 'react';
import { Toast } from '@base-ui/react/toast';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SnackbarContent from '@mui/material/SnackbarContent';
import CloseIcon from '@mui/icons-material/Close';

// Same offsets as a Snackbar with `anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}`.
const Viewport = styled(Toast.Viewport)(({ theme }) => ({
  position: 'fixed',
  zIndex: theme.zIndex.snackbar,
  left: 8,
  right: 8,
  bottom: 8,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    left: 24,
    right: 'auto',
    bottom: 24,
  },
}));

const StackedSnackbarContent = styled(SnackbarContent)(({ theme }) => ({
  transition: theme.transitions.create(['opacity', 'transform'], {
    duration: theme.transitions.duration.shorter,
  }),
  '&[data-starting-style], &[data-ending-style]': {
    opacity: 0,
    transform: 'translateY(16px)',
  },
  // Keep a swiped Snackbar moving in the direction it was swiped.
  '&[data-ending-style][data-swipe-direction="right"]': {
    transform: 'translateX(calc(var(--toast-swipe-movement-x) + 100%))',
  },
  '&[data-ending-style][data-swipe-direction="down"]': {
    transform: 'translateY(calc(var(--toast-swipe-movement-y) + 100%))',
  },
  // Over the provider's `limit`, the oldest toasts are hidden until a newer one closes.
  '&[data-limited]': {
    display: 'none',
  },
}));

function Snackbars() {
  const { toasts } = Toast.useToastManager();

  // Base UI lists the newest toast first. Render it last so it's at the bottom,
  // and keyboard focus follows the same order as the stack.
  return [...toasts].reverse().map((toast) => (
    <Toast.Root
      key={toast.id}
      toast={toast}
      render={(props) => (
        <StackedSnackbarContent
          {...props}
          message={<Toast.Description render={<span />} />}
          action={
            <Toast.Close
              aria-label="Close"
              render={<IconButton size="small" color="inherit" />}
            >
              <CloseIcon fontSize="small" />
            </Toast.Close>
          }
        />
      )}
    />
  ));
}

function ShowSnackbarButton() {
  const toastManager = Toast.useToastManager();
  const count = React.useRef(0);

  const handleClick = () => {
    count.current += 1;
    toastManager.add({ description: `Snackbar ${count.current}` });
  };

  return <Button onClick={handleClick}>Show snackbar</Button>;
}

export default function StackedSnackbars() {
  return (
    // @focus-start @padding 2
    <Toast.Provider limit={3}>
      <ShowSnackbarButton />
      <Toast.Portal>
        <Viewport>
          <Snackbars />
        </Viewport>
      </Toast.Portal>
    </Toast.Provider>
    // @focus-end
  );
}
