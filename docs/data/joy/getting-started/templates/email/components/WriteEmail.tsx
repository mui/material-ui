import * as React from 'react';
import Box from '@mui/joy/Box';
import ModalClose from '@mui/joy/ModalClose';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import Sheet from '@mui/joy/Sheet';
import { IconButton, Input, Stack, Typography } from '@mui/joy';

import FormatBoldRoundedIcon from '@mui/icons-material/FormatBoldRounded';
import FormatItalicRoundedIcon from '@mui/icons-material/FormatItalicRounded';
import StrikethroughSRoundedIcon from '@mui/icons-material/StrikethroughSRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';

export default function DrawerMobileNavigation() {
  return (
    <Sheet
      sx={{
        alignItems: 'center',
        px: 1.5,
        py: 1.5,
        ml: 'auto',
        width: 400,
        height: 560,
        flexGrow: 1,
        border: '1px solid',
        borderRadius: 'md',
        backgroundColor: 'var(--joy-palette-background-level1)',
        borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
        boxShadow: 'lg',
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography level="title-sm">New message</Typography>
        <ModalClose id="close-icon" />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl>
          <Typography level="title-sm">To</Typography>
          <Input placeholder="email@email.com" aria-label="Message"></Input>
        </FormControl>
        <FormControl>
          <Typography level="title-sm">CC</Typography>
          <Input placeholder="email@email.com" aria-label="Message"></Input>
        </FormControl>

        <Input placeholder="Subject" aria-label="Message"></Input>

        <FormControl>
          <Textarea
            placeholder="Type your message here…"
            aria-label="Message"
            minRows={3}
            maxRows={10}
            endDecorator={
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                flexGrow={1}
                sx={{
                  py: 1,
                  pr: 1,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <div>
                  <IconButton size="sm" variant="plain" color="neutral">
                    <FormatBoldRoundedIcon />
                  </IconButton>
                  <IconButton size="sm" variant="plain" color="neutral">
                    <FormatItalicRoundedIcon />
                  </IconButton>
                  <IconButton size="sm" variant="plain" color="neutral">
                    <StrikethroughSRoundedIcon />
                  </IconButton>
                  <IconButton size="sm" variant="plain" color="neutral">
                    <FormatListBulletedRoundedIcon />
                  </IconButton>
                </div>
                <Button
                  size="sm"
                  color="primary"
                  sx={{ alignSelf: 'center', borderRadius: 'sm' }}
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
}
