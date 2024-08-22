'use client';
import * as React from 'react';
import Button from '@mui/material/Button';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The Button component was moved from the lab to the core.',
        '',
        "You should use `import { Button } from '@mui/material'`",
        "or `import Button from '@mui/material/Button'`",
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

  return <Button ref={ref} {...props} />;
});