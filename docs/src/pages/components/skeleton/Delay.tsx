import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export default function Variants() {
  return (
    <div>
      <Skeleton variant="rect" width={210} height={118} />
      <Skeleton
        variant="rect"
        width={210}
        height={118}
        animationDelay={'0.1s'}
        style={{ marginTop: 5 }}
      />
      <Skeleton
        variant="rect"
        width={210}
        height={118}
        animationDelay={'0.2s'}
        style={{ marginTop: 5 }}
      />
    </div>
  );
}
