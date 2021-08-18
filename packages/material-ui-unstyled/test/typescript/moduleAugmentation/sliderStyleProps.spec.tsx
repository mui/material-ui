import * as React from 'react';
import { SliderUnstyled } from '@material-ui/unstyled';

declare module '@material-ui/unstyled' {
  interface SliderOwnerStateOverrides {
    color?: 'primary' | 'secondary';
  }
}

<SliderUnstyled componentsProps={{ root: { ownerState: { color: 'primary' } } }} />;

// @ts-expect-error unknown color
<SliderUnstyled componentsProps={{ root: { ownerState: { color: 'inherit' } } }} />;
