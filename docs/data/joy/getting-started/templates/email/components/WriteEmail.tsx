import * as React from 'react';
import Box from '@mui/joy/Box';
import ModalClose from '@mui/joy/ModalClose';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import Sheet from '@mui/joy/Sheet';
import { IconButton, Input, Stack, Typography } from '@mui/joy';

import FormatColorTextRoundedIcon from '@mui/icons-material/FormatColorTextRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';

interface WriteEmailProps {
  open?: boolean;
  onClose?: () => void;
}

const WriteEmail = React.forwardRef<HTMLDivElement, WriteEmailProps>(
  function WriteEmail({ open, onClose }, ref) {
    return (
      <Sheet
        ref={ref}
        sx={[
          {
            alignItems: 'center',
            px: 1.5,
            py: 1.5,
            ml: 'auto',
            width: { xs: '100dvw', md: 600 },
            flexGrow: 1,
            border: '1px solid',
            borderRadius: '8px 8px 0 0',
            backgroundColor: 'background.level1',
            borderColor: 'neutral.outlinedBorder',
            boxShadow: 'lg',
            zIndex: 1000,
            position: 'fixed',
            bottom: 0,
            right: 24,
            transition: 'transform 0.3s ease',
          },
          open ? { transform: 'translateY(0)' } : { transform: 'translateY(100%)' },
        ]}
      >
        <Box sx={{ mb: 2 }}>
          <Typography level="title-sm">New message</Typography>
          <ModalClose id="close-icon" onClick={onClose} />
        </Box>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}
        >
          <FormControl>
            <FormLabel>To</FormLabel>
            <Input placeholder="email@email.com" aria-label="Message" />
          </FormControl>
          <FormControl>
            <FormLabel>CC</FormLabel>
            <Input placeholder="email@email.com" aria-label="Message" />
          </FormControl>
          <Input placeholder="Subject" aria-label="Message" />
          <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Textarea
              placeholder="Type your message here…"
              aria-label="Message"
              minRows={8}
              endDecorator={
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexGrow: 1,
                    py: 1,
                    pr: 1,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <div>
                    <IconButton size="sm" variant="plain" color="neutral">
                      <FormatColorTextRoundedIcon />
                    </IconButton>
                    <IconButton size="sm" variant="plain" color="neutral">
                      <AttachFileRoundedIcon />
                    </IconButton>
                    <IconButton size="sm" variant="plain" color="neutral">
                      <InsertPhotoRoundedIcon />
                    </IconButton>
                    <IconButton size="sm" variant="plain" color="neutral">
                      <FormatListBulletedRoundedIcon />
                    </IconButton>
                  </div>
                  <Button
                    color="primary"
                    sx={{ borderRadius: 'sm' }}
                    onClick={onClose}
                  >
                    Send
                  </Button>
                </Stack>
              }
              sx={{
                '& textarea:first-of-type': {
                  minHeight: 72,
                },
              }}
            />
          </FormControl>
        </Box>
      </Sheet>
    );
  },
);

export default WriteEmail;
