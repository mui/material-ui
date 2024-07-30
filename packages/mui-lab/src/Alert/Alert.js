'use client';
import * as React from 'react';
import Alert from '@mui/material/Alert';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The Alert component was moved from the lab to the core.',
        '',
        "You should use `import { Alert } from '@mui/material'`",
        "or `import Alert from '@mui/material/Alert'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

/**
 * @ignore - do not document.
 */
export default React.forwardRef(function DeprecatedAlert(props, ref) {
  warn();

  return <Alert ref={ref} {...props} />;
});
