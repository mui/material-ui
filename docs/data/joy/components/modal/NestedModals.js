import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function NestedModals({ random }) {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          layout="center"
          {...(random && {
            sx: {
              top: `${randomBetween(25, 75)}%`,
              left: `${randomBetween(25, 75)}%`,
            },
          })}
        >
          <DialogTitle>Infinite modals</DialogTitle>
          <DialogContent>Welcome to the infinite nested modals.</DialogContent>
          <NestedModals random />
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

NestedModals.propTypes = {
  random: PropTypes.bool,
};

export default NestedModals;
