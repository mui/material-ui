import * as React from 'react';
import { Button, Badge, Checkbox, Chip } from '@material-ui/core';

function TestBaseColorPaletteProp() {
  const baseColorPalette = ['primary', 'secondary', 'error', 'info', 'success', 'warning'] as const;
  return (
    <div>
      {baseColorPalette.map((color) => (
        <div>
          <Button color={color} />
          <Badge color={color} />
          <Checkbox color={color} />
          <Chip color={color} />
        </div>
      ))}
    </div>
  );
}
