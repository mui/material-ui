import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/core/Skeleton';
import Box from '@material-ui/core/Box';

export default function SkeletonChildren() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ alignItems: 'center', display: 'flex', width: 200 }}>
        <Box sx={{ m: 1 }}>
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Skeleton width="100%">
            <Typography>.</Typography>
          </Skeleton>
        </Box>
      </Box>
    </React.Fragment>
  );
}
