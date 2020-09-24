import React from 'react';
import Rating from '@material-ui/core/Rating';

let warnedOnce = false;

/**
 * @ignore - do not document.
 */
export default React.forwardRef(function DeprecatedRating(props, ref) {
  if (!warnedOnce) {
    console.warn(
      [
        'Material-UI: The Rating component was moved from the lab to the core.',
        '',
        "You should use `import { Rating } from '@material-ui/core'`",
        "or `import Rating from '@material-ui/core/Rating'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }

  return <Rating ref={ref} {...props} />;
});
