import React from 'react';
import PaginationItem from '@material-ui/core/PaginationItem';

let warnedOnce = false;

/**
 * @ignore - do not document.
 */
export default React.forwardRef(function DeprecatedPaginationItem(props, ref) {
  if (!warnedOnce) {
    console.warn(
      [
        'Material-UI: The PaginationItem component was moved from the lab to the core.',
        '',
        "You should use `import { PaginationItem } from '@material-ui/core'`",
        "or `import PaginationItem from '@material-ui/core/PaginationItem'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }

  return <PaginationItem ref={ref} {...props} />;
});
