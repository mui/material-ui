import * as React from 'react';
import { SelectUnstyled } from '@mui/base';

const SelectUnstyledComponentsPropsOverridesTest = (
  <SelectUnstyled
    componentsProps={{
      root: {
        // @ts-expect-error - requires module augmentation
        size: 'red',
        className: 'test',
      },
      popper: {
        className: 'popper',
        disablePortal: true,
      },
      listbox: {
        className: 'listbox',
        onMouseOver: () => {},
      },
    }}
  />
);
