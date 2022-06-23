import * as React from 'react';
import { styled } from '@mui/system';
import { Transition } from 'react-transition-group';
import { TransitionProps } from 'react-transition-group/Transition';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseIcon from '@mui/icons-material/Close';
import SnackbarUnstyled, {
  SnackbarCloseReason,
  SnackbarUnstyledProps,
} from '@mui/base/SnackbarUnstyled';

const blue = {
  50: '#F0F7FF',
  100: '#DAECFF',
  400: '#3399FF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  200: '#E0E3E7',
  800: '#2D3843',
};

const StyledSnackbar = styled(SnackbarUnstyled)`
  position: fixed;
  z-index: 5500;
  display: flex;
  bottom: 16px;
  right: 16px;
  max-width: 560px;
  min-width: 300px;
`;

const SnackbarContent = styled('div')(
  ({ theme }) => `
  display: flex;
  overflow: hidden;
  background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[50]};
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[400]};
  box-shadow: ${
    theme.palette.mode === 'dark'
      ? `0 5px 13px -3px rgba(0,0,0,0.4)`
      : `0 5px 13px -3px ${grey[200]}`
  };
  padding: 0.875rem;
  color: ${theme.palette.mode === 'dark' ? '#fff' : blue[900]};
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 500;
  text-align: start;
  position: relative;

  & .snackbar-message {
    flex: 1 1 0%;
    max-width: 100%;
  }

  & .snackbar-title {
    line-height: 1.5rem;
    margin-right: 0.5rem;
  }

  & .snackbar-description {
    line-height: 1.5rem;
    font-weight: 400;
    color: ${theme.palette.mode === 'dark' ? blue[100] : grey[800]};
  }

  & .snackbar-close-icon {
    cursor: pointer;
    font-size: 10px;
    position: absolute;
    top: 0.725rem;
    right: 0.725rem;
    width: 1.25rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  `,
);

const positioningStyles = {
  entering: 'translateX(200px)',
  entered: 'translateX(0)',
  exiting: 'translateX(200px)',
  exited: 'translateX(200px)',
  unmounted: 'translateX(200px)',
};

interface TransformProps {
  children: SnackbarUnstyledProps['children'];
  open: SnackbarUnstyledProps['open'];
  onEnter: TransitionProps['onEnter'];
  onExit: TransitionProps['onExit'];
}

const Transform = ({ open, children, onEnter, onExit }: TransformProps) => {
  const nodeRef = React.useRef(null);

  return (
    <Transition
      timeout={{ enter: 300, exit: 500 }}
      in={open}
      appear
      onEnter={onEnter}
      onExit={onExit}
      nodeRef={nodeRef}
    >
      {(status) => {
        return (
          <div
            style={{
              transform: positioningStyles[status],
              transition: 'transform 300ms ease',
            }}
          >
            {children}
          </div>
        );
      }}
    </Transition>
  );
};

const statusStyles = {
  entered: {
    opacity: 1,
  },
  entering: {
    opacity: 0,
  },
  exited: {
    opacity: 0,
  },
  exiting: {
    opacity: 0,
  },
  unmounted: {
    opacity: 0,
  },
};

const FadeTransform = (props: TransformProps) => {
  const { open, children, onEnter, onExit } = props;
  const nodeRef = React.useRef(null);

  return (
    <Transition
      timeout={{ enter: 300, exit: 500 }}
      in={open}
      appear
      onEnter={onEnter}
      onExit={onExit}
      nodeRef={nodeRef}
    >
      {(status) => (
        <div
          style={{
            ...statusStyles[status],
            transition: 'opacity 300ms ease',
          }}
        >
          <Transform open={open} onEnter={onEnter} onExit={onExit}>
            {children}
          </Transform>
        </div>
      )}
    </Transition>
  );
};

export default function TransitionComponentSnackbar() {
  const [open, setOpen] = React.useState(false);

  const handleClose = (_: any, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <button type="button" onClick={handleClick}>
        Open snackbar
      </button>
      <StyledSnackbar
        autoHideDuration={5000}
        open={open}
        onClose={handleClose}
        components={{ Transition: FadeTransform }}
        componentsProps={{ transition: { open } }}
      >
        <SnackbarContent>
          <CheckRoundedIcon
            sx={{
              flexShrink: 0,
              marginRight: '0.75rem',
              width: '1.25rem',
              height: '1.5rem',
            }}
          />
          <div className="snackbar-message">
            <div className="snackbar-title">Notifications sent</div>
            <div className="snackbar-description">
              All your notifications were sent to the desired adress.
            </div>
          </div>
          <CloseIcon onClick={handleClose} className="snackbar-close-icon" />
        </SnackbarContent>
      </StyledSnackbar>
    </React.Fragment>
  );
}
