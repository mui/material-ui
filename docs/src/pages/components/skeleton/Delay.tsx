import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export default function Variants() {
  return (
    <div>
      <Skeleton variant="rect" width={210} height={118} />
      <Skeleton variant="rect" width={210} height={118} animationDelay={'0.2s'} />
      <Skeleton variant="rect" width={210} height={118} animationDelay={'0.4s'} />
    </div>
  );
}
