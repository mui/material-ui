import * as React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function MinHeightTextarea() {
  return (
    <TextareaAutosize
      aria-label="minimum height"
      minRows={3}
      placeholder="Minimum 3 rows"
      style={{ width: 200 }}
    />
  );
}
