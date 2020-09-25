import * as React from 'react';
import Skeleton from '@material-ui/core/Skeleton';

export default function Variants() {
  return (
    <div>
      <Skeleton variant="text" />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={118} />
    </div>
  );
}
