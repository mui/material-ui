import * as React from 'react';
import { SliderUnstyled } from '@mui/core';

declare module '@mui/core' {
  interface SliderUnstyledComponentsPropsOverrides {
    variant?: 'one' | 'two';
  }
}

<SliderUnstyled componentsProps={{ root: { variant: 'one' } }} />;

// @ts-expect-error unknown color
<SliderUnstyled componentsProps={{ root: { variant: 'three' } }} />;
