import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Transition } from 'react-transition-group';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import SnackbarUnstyled from '@mui/base/SnackbarUnstyled';

const StyledSnackbar = styled(SnackbarUnstyled)`
  position: fixed;
  z-index: 5500;
  display: flex;
  top: 15px;
  right: 15px;
  max-width: 560px;
  min-width: 300px;
`;

const SnackbarContent = styled('div')`
  display: flex;
  overflow: hidden;
  padding: 0.75rem 2rem 0.75rem 1rem;
  background-color: #9ae6b4;
  color: #171923;
  border-radius: 0.375rem;
  text-align: start;
  position: relative;

  & .snackbar-message {
    flex: 1 1 0%;
    max-width: 100%;
  }

  & .snackbar-title {
    font-weight: 700;
    line-height: 1.5rem;
    margin-right: 0.5rem;
  }

  & .snackbar-description {
    line-height: 1.5rem;
  }

  & .snackbar-close-icon {
    cursor: pointer;
    font-size: 10px;
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    width: 1.25rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const positioningStyles = {
  entering: 'translateX(200px)',
  entered: 'translateX(0)',
  exiting: 'translateX(200px)',
  exited: 'translateX(200px)',
  unmounted: 'translateX(200px)',
};

const Transform = ({ open, children, onEnter, onExit }) => {
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

Transform.propTypes = {
  children: PropTypes.node,
  onEnter: PropTypes.func,
  onExit: PropTypes.func,
  open: PropTypes.bool,
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

const FadeTransform = (props) => {
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

FadeTransform.propTypes = {
  children: PropTypes.node,
  onEnter: PropTypes.func,
  onExit: PropTypes.func,
  open: PropTypes.bool,
};

export default function TransitionComponentSnackbar() {
  const [open, setOpen] = React.useState(false);

  const handleClose = (_, reason) => {
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
          <CheckCircleIcon
            sx={{
              flexShrink: 0,
              marginRight: '0.75rem',
              width: '1.25rem',
              height: '1.5rem',
            }}
          />
          <div className="snackbar-message">
            <div className="snackbar-title">Account Created</div>
            <div className="snackbar-description">
              We&apos;ve created your account for you
            </div>
          </div>
          <CloseIcon onClick={handleClose} className="snackbar-close-icon" />
        </SnackbarContent>
      </StyledSnackbar>
    </React.Fragment>
  );
}
