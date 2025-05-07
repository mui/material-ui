import * as React from 'react';
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';

export default function TextareaRef() {
  const textareaRef = React.useRef(null);

  const handleTextareaFocus = () => {
    textareaRef.current?.focus();
  };

  return (
    <Stack direction="row" sx={{ gap: 1 }}>
      <Textarea
        placeholder="Placeholder"
        slotProps={{ textarea: { ref: textareaRef } }}
      />
      <Button onClick={handleTextareaFocus}>Focus textarea element</Button>
    </Stack>
  );
}
