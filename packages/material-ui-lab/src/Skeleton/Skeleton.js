import React from 'react';
import Skeleton from '@material-ui/core/Skeleton';

let warnedOnce = false;

/**
 * @ignore - do not document.
 */
export default React.forwardRef(function DeprecatedSkeleton(props, ref) {
  if (!warnedOnce) {
    console.warn(
      [
        'Material-UI: The Skeleton component was moved from the lab to the core.',
        '',
        "You should use `import { Skeleton } from '@material-ui/core'`",
        "or `import Skeleton from '@material-ui/core/Skeleton'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }

  return <Skeleton ref={ref} {...props} />;
});
