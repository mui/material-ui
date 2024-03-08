import * as React from 'react';
import { keyframes } from '@pigment-css/react';

const rotateKeyframe = keyframes({
  from: {
    transform: 'rotate(360deg)',
  },
  to: {
    transform: 'rotate(0deg)',
  },
});

<div style={{ animation: `${rotateKeyframe} 2s infinite` }} />;
