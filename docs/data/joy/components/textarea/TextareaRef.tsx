import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';

export default function TextareaRef() {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const handleTextareaFocus = () => {
    textareaRef.current?.focus();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
      <Textarea
        placeholder="Placeholder"
        slotProps={{ textarea: { ref: textareaRef } }}
      />
      <Button onClick={handleTextareaFocus}>Focus textarea element</Button>
    </Box>
  );
}
