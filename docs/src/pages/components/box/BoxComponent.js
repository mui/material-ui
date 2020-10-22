import * as React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default function BoxComponent() {
  return (
    <Box component="span" p={2} border="1px dashed grey">
      <Button>Save</Button>
    </Box>
  );
}
