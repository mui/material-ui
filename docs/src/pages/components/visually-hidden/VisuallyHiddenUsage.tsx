import React from 'react';
import VisuallyHidden from '@material-ui/lab/VisuallyHidden';
import IconButton from '@material-ui/core/IconButton';
import AccessibilityIcon from '@material-ui/icons/Accessibility';

export default function IconButtonWithVisuallyHiddenText() {
  return (
    <IconButton>
      <VisuallyHidden>This text will not be visible, but will be read by screen readers.</VisuallyHidden>
      <AccessibilityIcon />  
    </IconButton>
  );
}
