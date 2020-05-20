import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/lab/Skeleton';

export default function SkeletonChildren() {
  return (
    <React.Fragment>
      <CssBaseline />
      <div style={{ alignItems: 'center', display: 'flex', width: '200px' }}>
        <div style={{ margin: '8px' }}>
          <Skeleton variant="circle">
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
