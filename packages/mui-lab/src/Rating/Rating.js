import * as React from 'react';
import Rating from '@mui/material/Rating';

let warnedOnce = false;

/**
 * @ignore - do not document.
 */
export default React.forwardRef(function DeprecatedRating(props, ref) {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The Rating component was moved from the lab to the core.',
        '',
        "You should use `import { Rating } from '@mui/material'`",
        "or `import Rating from '@mui/material/Rating'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }

  return <Rating ref={ref} {...props} />;
});
