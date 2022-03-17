import * as React from 'react';
import BackdropUnstyled from '@mui/base/BackdropUnstyled';
import { styled } from '@mui/system';

const Backdrop = styled(BackdropUnstyled)`
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1201;
`;

export default function SimpleBackdrop() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Show backdrop
      </button>
      {open && <Backdrop onClick={handleClose} />}
    </div>
  );
}
