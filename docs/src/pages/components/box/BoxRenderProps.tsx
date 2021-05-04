import * as React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

export default function BoxRenderProps() {
  return (
    <Box sx={{ border: '1px dashed grey' }}>
      {(props: { className: string }) => <Button {...props}>Save</Button>}
    </Box>
  );
}
