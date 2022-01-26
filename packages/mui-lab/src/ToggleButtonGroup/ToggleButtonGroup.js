import * as React from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

let warnedOnce = false;

/**
 * @ignore - do not document.
 */
export default React.forwardRef(function DeprecatedToggleButtonGroup(props, ref) {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The ToggleButtonGroup component was moved from the lab to the core.',
        '',
        "You should use `import { ToggleButtonGroup } from '@mui/material'`",
        "or `import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }

  return <ToggleButtonGroup ref={ref} {...props} />;
});
