import * as React from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
  Checkbox,
  Chip,
  CircularProgress,
  IconButton,
  LinearProgress,
  SvgIcon,
} from '@material-ui/core';
import { TimelineDot } from '@material-ui/lab';

function TestBaseColorPaletteProp() {
  const baseColorPalette = ['primary', 'secondary', 'error', 'info', 'success', 'warning'] as const;
  return (
    <div>
      {baseColorPalette.map((color) => (
        <div key={color}>
          <Badge color={color} />
          <Button color={color} />
          <ButtonGroup color={color} />
          <Checkbox color={color} />
          <Chip color={color} />
          <CircularProgress color={color} />
          <IconButton color={color} />
          <LinearProgress color={color} />
          <TimelineDot color={color} />
          <SvgIcon color={color} />
        </div>
      ))}
    </div>
  );
}
