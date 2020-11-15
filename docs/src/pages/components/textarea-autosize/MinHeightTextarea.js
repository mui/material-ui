import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

export default function MinHeightTextarea() {
  return <TextareaAutosize aria-label="minimum height" minRows={3} placeholder="Minimum 3 rows" />;
}
