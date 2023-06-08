import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import { IconButton, Stack } from '@mui/joy';

export type MessageInputProps = {
  onHeightChange?: (height: number) => void;
  textAreaValue: string;
  setTextAreaValue: (value: string) => void;
  onSubmit: () => void;
};

export default function MessageInput({
  onHeightChange,
  textAreaValue,
  setTextAreaValue,
  onSubmit,
}: MessageInputProps) {
  const [textAreaHeight, setTextAreaHeight] = React.useState(112);
  const textAreaRef = React.useRef<HTMLDivElement>(null);

  const handleHeightChange = () => {
    if (textAreaRef.current) {
      const newHeight = textAreaRef.current.offsetHeight;
      if (newHeight !== textAreaHeight) {
        setTextAreaHeight(newHeight);
        if (onHeightChange) {
          onHeightChange(newHeight);
        }
      }
    }
  };

  React.useEffect(() => {
    if (textAreaRef.current) {
      setTextAreaHeight(textAreaRef.current.offsetHeight);
    }
  }, []);

  return (
    <Box sx={{ px: 3.25, pb: 3 }}>
      <FormControl>
        <Textarea
          placeholder="Type something here…"
          aria-label="Message"
          ref={textAreaRef}
          onChange={(e) => {
            handleHeightChange();
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
              <Button
                onClick={() => {
                  if (textAreaValue.trim() !== '') {
                    onSubmit();
                    setTextAreaValue('');
                  }
                }}
              >
                Send
              </Button>
            </Stack>
          }
        />
      </FormControl>
    </Box>
  );
}
