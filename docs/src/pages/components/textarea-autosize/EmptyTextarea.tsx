import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

export default function EmptyTextarea() {
  return <TextareaAutosize aria-label="empty textarea" placeholder="Empty" />;
}
