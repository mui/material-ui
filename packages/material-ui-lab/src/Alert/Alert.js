import React from 'react';
import Alert from '@material-ui/core/Alert';

let warnedOnce = false;

/**
 * @ignore - do not document.
 */
export default React.forwardRef(function DeprecatedAlert(props, ref) {
  if (!warnedOnce) {
    console.warn(
      [
        'Material-UI: The Alert component was moved from the lab to the core.',
        '',
        "You should use `import { Alert } from '@material-ui/core'`",
        "or `import Alert from '@material-ui/core/Alert'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }

  return <Alert ref={ref} {...props} />;
});
