import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';

let warnedOnce = false;

/**
 * @ignore - do not document.
 */
export default React.forwardRef(function DeprecatedToggleButton(props, ref) {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The ToggleButton component was moved from the lab to the core.',
        '',
        "You should use `import { ToggleButton } from '@mui/material'`",
        "or `import ToggleButton from '@mui/material/ToggleButton'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }

  return <ToggleButton ref={ref} {...props} />;
});
