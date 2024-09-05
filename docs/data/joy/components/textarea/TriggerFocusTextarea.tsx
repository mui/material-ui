import * as React from 'react';
import Textarea from '@mui/joy/Textarea';

export default function TriggerFocusTextarea() {
  return (
    <Textarea
      placeholder="Looks like I'm focused but no"
      sx={{ '--Textarea-focused': 1 }}
    />
  );
}
