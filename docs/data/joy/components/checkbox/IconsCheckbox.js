import * as React from 'react';
import Checkbox from '@mui/joy/Checkbox';
import Close from '@mui/icons-material/Close';

export default function IconsCheckbox() {
  return (
    <Checkbox uncheckedIcon={<Close />} label="I have an icon when unchecked" />
  );
}
