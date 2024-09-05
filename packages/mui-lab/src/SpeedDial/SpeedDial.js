'use client';
import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The SpeedDial component was moved from the lab to the core.',
        '',
        "You should use `import { SpeedDial } from '@mui/material'`",
        "or `import SpeedDial from '@mui/material/SpeedDial'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

/**
 * @ignore - do not document.
 */
export default React.forwardRef(function DeprecatedSpeedDial(props, ref) {
  warn();

  return <SpeedDial ref={ref} {...props} />;
});
