import * as React from 'react';
import { Dialog } from '@mui/material';

function optionalChildrenTest() {
  <Dialog open />;
}

function PaperPropsTest() {
  <Dialog PaperProps={{ component: 'form' }} open />;
}
