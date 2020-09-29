import * as React from 'react';
import { legacy_styled as styled } from '@material-ui/core/styles';
import { compose, spacing, palette } from '@material-ui/system';

const Box = styled('div')(compose(spacing, palette));

export default function JSS() {
  return (
    <Box color="white" bgcolor="palevioletred" p={1}>
      JSS
    </Box>
  );
}
