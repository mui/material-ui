import * as React from 'react';
import Box from '@material-ui/core/Box';
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';

export default function Icons() {
  return (
    <Box
      sx={{
        '& > span': {
          m: 2,
        },
      }}
    >
      <Icon>add_circle</Icon>
      <Icon color="primary">add_circle</Icon>
      <Icon style={{ color: green[500] }}>add_circle</Icon>
      <Icon fontSize="small">add_circle</Icon>
      <Icon style={{ fontSize: 30 }}>add_circle</Icon>
    </Box>
  );
}
