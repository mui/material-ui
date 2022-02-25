import * as React from 'react';
import { SelectUnstyled, MultiSelectUnstyled } from '@mui/base';

declare module '@mui/base' {
  interface SelectUnstyledComponentsPropsOverrides {
    variant?: 'one' | 'two';
  }

  interface MultiSelectUnstyledComponentsPropsOverrides {
    variant?: 'a' | 'b';
  }
}

<SelectUnstyled componentsProps={{ root: { variant: 'one' } }} />;

// @ts-expect-error unknown variant
<SelectUnstyled componentsProps={{ root: { variant: 'three' } }} />;

<MultiSelectUnstyled componentsProps={{ root: { variant: 'a' } }} />;

// @ts-expect-error unknown variant
<MultiSelectUnstyled componentsProps={{ root: { variant: 'c' } }} />;
