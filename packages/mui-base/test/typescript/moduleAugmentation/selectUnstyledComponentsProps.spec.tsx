import * as React from 'react';
import { SelectUnstyled } from '@mui/base';

declare module '@mui/base' {
  interface SelectUnstyledComponentsPropsOverrides {
    variant?: 'one' | 'two';
  }
}

<SelectUnstyled componentsProps={{ root: { variant: 'one' } }} />;

// @ts-expect-error unknown variant
<SelectUnstyled componentsProps={{ root: { variant: 'three' } }} />;
