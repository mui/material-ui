// @flow

import React from 'react';
import IconButton from 'material-ui/IconButton';
import { deepOrange } from 'material-ui/styles/colors';

export default function ContrastIconButton() {
  return (
    <IconButton color="contrast" style={{ backgroundColor: deepOrange[500] }}>home</IconButton>
  );
}
