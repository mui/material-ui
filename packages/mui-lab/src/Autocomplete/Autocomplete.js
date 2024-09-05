'use client';
import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The Autocomplete component was moved from the lab to the core.',
        '',
        "You should use `import { Autocomplete } from '@mui/material'`",
        "or `import Autocomplete from '@mui/material/Autocomplete'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

/**
 * @ignore - do not document.
 */
export default React.forwardRef(function DeprecatedAutocomplete(props, ref) {
  warn();

  return <Autocomplete ref={ref} {...props} />;
});
