import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type AugmentedChildren = React.ReactNode | Record<string, unknown>;

// Update React's children prop type
declare module 'react' {
  interface HTMLAttributes<T> {
    children?: AugmentedChildren | Iterable<AugmentedChildren>;
  }
}

// Rendering a TextField for the Autocomplete should work
<Autocomplete options={[{ label: 'test' }]} renderInput={(params) => <TextField {...params} />} />;
