import * as React from 'react';
import { DialogTitle } from '@mui/material';

function DialogTitleTest() {
  <DialogTitle component="h4" />;
  <DialogTitle component="button" />;
  <DialogTitle component="p" />;
  <DialogTitle sx={{ typography: { xs: 'body1', sm: 'h2', md: 'h1', lg: 'body2' } }} />
  {/* @ts-expect-error */}
  <DialogTitle sx={{ typography: { xs: 'body 1', sm: 'h2', md: 'h1', lg: 'body1' } }} />
}
