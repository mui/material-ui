import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';
import { useRef } from 'react';

export default function TextareaRef() {
  const textareaRef = useRef(null);

  const handleTextareaFocus = () => {
    textareaRef.current.focus();
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'row', gap: 1}}>
      <Textarea ref={textareaRef} placeholder="Textarea" />
      <Button onClick={handleTextareaFocus}>Focus Textarea</Button>
    </Box>
  );
}

