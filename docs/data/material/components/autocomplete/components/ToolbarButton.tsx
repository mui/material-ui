import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { ButtonProps } from '@mui/material/Button';

export function ToolbarButton(props: ButtonProps) {
  const { className, children, ...other } = props;
  return <IconButton {...other}>{children}</IconButton>;
}
