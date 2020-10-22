import * as React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

export default function BoxClone() {
  return (
    <Box sx={{ border: '1px dashed grey' }} clone>
      <Button>Save</Button>
    </Box>
  );
}
