import React from 'react';
import Alert from '@material-ui/core/Alert';

export default React.forwardRef(function DeprecatedAlert(props, ref) {
  let warnedOnce = false;

  if (!warnedOnce) {
    console.warn(
      [
        'Material-UI: the Alert component was moved from the lab to the core.',
        '',
        "You should use `import { Alert } from '@material-ui/core'`",
        "or `import Alert from '@material-ui/core/Alert'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }

  return <Alert ref={ref} {...props} />;
});
