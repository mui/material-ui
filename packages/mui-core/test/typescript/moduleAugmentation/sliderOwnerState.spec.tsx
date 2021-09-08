import * as React from 'react';
import { SliderUnstyled } from '@mui/core';

declare module '@mui/core' {
  interface SliderOwnerStateOverrides {
    color?: 'primary' | 'secondary';
  }
}

<SliderUnstyled componentsProps={{ root: { ownerState: { color: 'primary' } } }} />;

// @ts-expect-error unknown color
<SliderUnstyled componentsProps={{ root: { ownerState: { color: 'inherit' } } }} />;
