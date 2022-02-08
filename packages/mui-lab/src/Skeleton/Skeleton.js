import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';

let warnedOnce = false;

/**
 * @ignore - do not document.
 */
export default React.forwardRef(function DeprecatedSkeleton(props, ref) {
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

  return <Skeleton ref={ref} {...props} />;
});
