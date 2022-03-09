import * as React from 'react';
import Avatar from '@mui/material/Avatar';

function ImgPropsShouldSupportSx() {
  <Avatar imgProps={{ sx: { objectFit: 'contain' } }} />;
}
