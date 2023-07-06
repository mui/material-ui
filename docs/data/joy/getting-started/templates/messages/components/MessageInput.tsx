import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import { IconButton, Stack } from '@mui/joy';

export type MessageInputProps = {
  textAreaValue: string;
  setTextAreaValue: (value: string) => void;
  onSubmit: () => void;
};

export default function MessageInput({
  textAreaValue,
  setTextAreaValue,
  onSubmit,
}: MessageInputProps) {
  const textAreaRef = React.useRef<HTMLDivElement>(null);
  const handleClick = () => {
    if (textAreaValue.trim() !== '') {
      onSubmit();
      setTextAreaValue('');
    }
  };
  return (
    <Box sx={{ px: 2, pb: 3 }}>
      <FormControl>
        <Textarea
          placeholder="Type something here…"
          aria-label="Message"
          ref={textAreaRef}
          onChange={(e) => {
            setTextAreaValue(e.target.value);
          }}
          value={textAreaValue}
          minRows={2}
          maxRows={10}
          endDecorator={
            <Stack
              direction="row"
              spacing={1}
              justifyContent="flex-end"
              flexGrow={1}
              minHeight={40}
            >
              <IconButton variant="plain" color="neutral">
                <i data-feather="smile" />
              </IconButton>
              <IconButton variant="plain" color="neutral">
                <i data-feather="more-horizontal" />
              </IconButton>
              <Button onClick={handleClick}>Send</Button>
            </Stack>
          }
          onKeyDown={(event) => {
            if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
              handleClick();
            }
          }}
        />
      </FormControl>
    </Box>
  );
}
