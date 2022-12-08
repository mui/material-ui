import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';

export default function SkeletonChildren() {
  return (
    <React.Fragment>
      <CssBaseline />
      <div style={{ alignItems: 'center', display: 'flex', width: '200px' }}>
        <div style={{ margin: '8px' }}>
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
        </div>
        <div style={{ width: '100%' }}>
          <Skeleton width="100%">
            <Typography>.</Typography>
          </Skeleton>
        </div>
      </div>
    </React.Fragment>
  );
}
