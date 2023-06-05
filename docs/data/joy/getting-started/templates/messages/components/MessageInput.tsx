import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import { IconButton, Stack } from '@mui/joy';

export default function MessageInput({ ref }: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  return (
    <Box
      sx={{
        // backgroundColor: 'green',
        px: 3.25,
        pb: 3,
        minHeight: 128,
      }}
      // ref={ref}
    >
      <FormControl>
        <Textarea
          placeholder="Type something here…"
          aria-label="Message"
          minRows={2}
          maxRows={2}
          endDecorator={
            <Stack
              direction="row"
              spacing={1}
              justifyContent="flex-end"
              flexGrow={1}
            >
              <IconButton variant="plain" color="neutral">
                <i data-feather="smile" />
              </IconButton>
              <IconButton
                variant="plain"
                color="neutral"
                onClick={(event) => setAnchorEl(event.currentTarget)}
              >
                <i data-feather="more-horizontal" />
              </IconButton>
              <Button>Send</Button>
            </Stack>
          }
        />
      </FormControl>
    </Box>
  );
}
