import * as React from 'react';
import Box from '@mui/joy/Box';
import Textarea from '@mui/joy/Textarea';
import { useRef } from 'react';

export default function TextareaRef() {
  const textareaRef = useRef(null);

  const handleTextareaFocus = () => {
    textareaRef.current.focus();
  };

  return (
    <Box>
      <Textarea ref={textareaRef} placeholder="Textarea" />
      <button onClick={handleTextareaFocus}>Focus Textarea</button>
    </Box>
  );
}

