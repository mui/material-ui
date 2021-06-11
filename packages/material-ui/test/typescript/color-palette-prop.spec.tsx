import * as React from 'react';
import { AppBar, Button, Checkbox, Chip } from '@material-ui/core';

function TestBaseColorPaletteProp() {
  const baseColorPalette = ['primary', 'secondary', 'error', 'info', 'success', 'warning'] as const;
  return (
    <div>
      {baseColorPalette.map((color) => (
        <div>
          <AppBar color={color} />
          <Button color={color} />
          <Checkbox color={color} />
          <Chip color={color} />
        </div>
      ))}
    </div>
  );
}
