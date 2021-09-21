import * as React from 'react';
import SpeedDialAction from '@mui/material/SpeedDialAction';

let warnedOnce = false;

/**
 * @ignore - do not document.
 */
export default React.forwardRef(function DeprecatedSpeedDialAction(props, ref) {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The SpeedDialAction component was moved from the lab to the core.',
        '',
        "You should use `import { SpeedDialAction } from '@mui/material'`",
        "or `import SpeedDialAction from '@mui/material/SpeedDialAction'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }

  return <SpeedDialAction ref={ref} {...props} />;
});
