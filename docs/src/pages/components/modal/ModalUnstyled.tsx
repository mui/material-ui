import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import ModalUnstyled from '@material-ui/unstyled/ModalUnstyled';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
`;

export default function ModalUnstyledDemo() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <button type="button" onClick={handleOpen}>
        modal unstyled
      </button>
      <StyledModal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box
          sx={{
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: (theme) => theme.shadows[5],
            pt: 2,
            px: 4,
            pb: 3,
          }}
        >
          <h2 id="modal-title">Unstyled modal</h2>
          <p id="modal-description">
            Aliquid amet deserunt earum eos nihil officia porro, quasi quibusdam!
          </p>
        </Box>
      </StyledModal>
    </Box>
  );
}
