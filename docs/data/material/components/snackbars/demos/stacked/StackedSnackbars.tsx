import * as React from 'react';
import { Toast } from '@base-ui/react/toast';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SnackbarContent from '@mui/material/SnackbarContent';
import CloseIcon from '@mui/icons-material/Close';

const Viewport = styled(Toast.Viewport)(({ theme }) => ({
  position: 'fixed',
  zIndex: theme.zIndex.snackbar,
  left: 8,
  right: 8,
  bottom: 8,
  display: 'flex',
  // Base UI lists the newest toast first, so this puts it at the bottom.
  flexDirection: 'column-reverse',
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
  // Toasts over the provider's `limit` stay mounted until older ones close.
  '&[data-limited]': {
    display: 'none',
  },
}));

function Snackbars() {
  const { toasts } = Toast.useToastManager();

  return toasts.map((toast) => (
    <Toast.Root
      key={toast.id}
      toast={toast}
      render={(props) => (
        <StackedSnackbarContent
          {...props}
          message={<Toast.Description />}
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
