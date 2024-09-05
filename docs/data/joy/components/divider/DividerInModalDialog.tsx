import * as React from 'react';
import Button from '@mui/joy/Button';
import CardOverflow from '@mui/joy/CardOverflow';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Divider from '@mui/joy/Divider';

export default function DividerInModalDialog() {
  return (
    <ModalDialog
      sx={{
        // this custom styles is for demonstration purpose, you might not need them in your app
        position: 'static',
        transform: 'none',
        maxWidth: 300,
      }}
    >
      <DialogTitle>Modal Title</DialogTitle>
      <Divider inset="none" />
      <DialogContent>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry standard dummy text ever since the 1500s
      </DialogContent>
      <CardOverflow sx={{ bgcolor: 'background.level1' }}>
        <Divider inset="context" />
        <DialogActions
          buttonFlex="none"
          sx={{ pt: 1.5, justifyContent: 'flex-start' }}
        >
          <Button size="sm">Got it!</Button>
        </DialogActions>
      </CardOverflow>
    </ModalDialog>
  );
}
