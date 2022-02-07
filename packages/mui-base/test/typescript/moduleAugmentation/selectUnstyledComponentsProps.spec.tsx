import * as React from 'react';
import { SelectUnstyled, MultiSelectUnstyled } from '@mui/base';

declare module '@mui/base' {
  interface SelectUnstyledComponentsPropsOverrides {
    variant?: 'one' | 'two';
  }
}

<SelectUnstyled componentsProps={{ root: { variant: 'one' } }} />;

// @ts-expect-error unknown variant
<SelectUnstyled componentsProps={{ root: { variant: 'three' } }} />;

<MultiSelectUnstyled componentsProps={{ root: { variant: 'one' } }} />;

// @ts-expect-error unknown variant
<MultiSelectUnstyled componentsProps={{ root: { variant: 'three' } }} />;
