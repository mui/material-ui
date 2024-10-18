import * as React from 'react';
import IconButton from '@mui/material/IconButton';

export function ToolbarButton(props) {
  const { className, children, ...other } = props;
  return <IconButton {...other}>{children}</IconButton>;
}
