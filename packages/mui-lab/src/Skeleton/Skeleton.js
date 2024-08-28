'use client';
import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The Skeleton component was moved from the lab to the core.',
        '',
        "You should use `import { Skeleton } from '@mui/material'`",
        "or `import Skeleton from '@mui/material/Skeleton'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

/**
 * @ignore - do not document.
 */
export default React.forwardRef(function DeprecatedSkeleton(props, ref) {
  warn();

  return <Skeleton ref={ref} {...props} />;
});
