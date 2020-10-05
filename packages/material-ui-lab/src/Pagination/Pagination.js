import React from 'react';
import Pagination from '@material-ui/core/Pagination';

let warnedOnce = false;

/**
 * @ignore - do not document.
 */
export default React.forwardRef(function DeprecatedPagination(props, ref) {
  if (!warnedOnce) {
    console.warn(
      [
        'Material-UI: The Pagination component was moved from the lab to the core.',
        '',
        "You should use `import { Pagination } from '@material-ui/core'`",
        "or `import Pagination from '@material-ui/core/Pagination'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }

  return <Pagination ref={ref} {...props} />;
});
