'use client';
import * as React from 'react';
import AlertTitle from '@mui/material/AlertTitle';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The AlertTitle component was moved from the lab to the core.',
        '',
        "You should use `import { AlertTitle } from '@mui/material'`",
        "or `import AlertTitle from '@mui/material/AlertTitle'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

/**
 * @ignore - do not document.
 */
export default React.forwardRef(function DeprecatedAlertTitle(props, ref) {
  warn();

  return <AlertTitle ref={ref} {...props} />;
});
