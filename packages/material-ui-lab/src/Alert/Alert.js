import React from 'react';
import warning from 'warning';
import Alert from '@material-ui/core/Alert';

export default React.forwardRef(function DeprecatedAlert(props, ref) {
  let warnOnce = false;

  warning(
    warnOnce,

    [
      'Material-UI: the Alert component was moved from the lab to the core.',
      '',
      "You should use `import { Alert } from '@material-ui/core'`",
      "or `import Alert from '@material-ui/core/Alert'`",
    ].join('\n'),
  );

  warnOnce = true;

  return <Alert ref={ref} {...props} />;
});
