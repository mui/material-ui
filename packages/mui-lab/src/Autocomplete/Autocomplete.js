import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';

let warnedOnce = false;

/**
 * @ignore - do not document.
 */
export default React.forwardRef(function DeprecatedAutocomplete(props, ref) {
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

  return <Autocomplete ref={ref} {...props} />;
});
