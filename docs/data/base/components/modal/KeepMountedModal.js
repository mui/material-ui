import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, Box } from '@mui/system';
import { Modal } from '@mui/base/Modal';

export default function KeepMountedModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <TriggerButton type="button" onClick={handleOpen}>
        Open modal
      </TriggerButton>
      <StyledModal
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
        keepMounted
      >
        <Box sx={style}>
          <h2 id="keep-mounted-modal-title">Text in a modal</h2>
          <p id="keep-mounted-modal-description">Aliquid amet deserunt earum!</p>
        </Box>
      </StyledModal>
    </div>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'MuiBackdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const blue = {
  500: '#007FFF',
  600: '#0072E6',
};

const grey = {
  50: '#F3F6F9',
  900: '#1C2025',
};

const StyledModal = styled(Modal)(`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &.MuiModal-hidden {
    visibility: hidden;
  }
`);

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme) => ({
  width: 400,
  borderRadius: '12px',
  padding: '16px 32px 24px 32px',
  backgroundColor: theme.palette.mode === 'dark' ? grey[900] : grey[50],
  boxshadow: `0px 4px 6px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
  }`,
});

const TriggerButton = styled('button')(
  ({ theme }) => `
font-family: IBM Plex Sans, sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${blue[600]};
  }

  &:focus-visible {
    box-shadow: 0 3px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }
  `,
);
