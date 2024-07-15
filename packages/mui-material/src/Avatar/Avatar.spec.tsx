import * as React from 'react';
import Avatar from '@mui/material/Avatar';

function ImgPropsShouldSupportSx() {
  <Avatar imgProps={{ sx: { objectFit: 'contain' } }} />;
}

function CustomImg() {
  return <img alt="" />;
}
<Avatar slotProps={{ img: { alt: '' } }} />;
<Avatar slots={{ img: CustomImg }} />;
