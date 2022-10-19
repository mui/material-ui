import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ModalDialog from '@mui/joy/ModalDialog';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';

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
      <Typography fontSize="lg" fontWeight="lg">
        Modal Title
      </Typography>
      <Divider inset="none" sx={{ my: 1.5 }} />
      <Typography level="body2">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry standard dummy text ever since the 1500s
      </Typography>
      <Divider sx={{ mt: 2 }} />
      <Box
        sx={{
          bgcolor: 'background.level1',
          px: 2,
          py: 1.5,
          m: 'calc(-1 * var(--ModalDialog-padding))',
          mt: 0,
          borderBottomLeftRadius: 'var(--ModalDialog-radius)',
          borderBottomRightRadius: 'var(--ModalDialog-radius)',
          textAlign: 'right',
        }}
      >
        <Button size="sm">Got it!</Button>
      </Box>
    </ModalDialog>
  );
}
