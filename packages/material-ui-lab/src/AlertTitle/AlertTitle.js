import React from 'react';
import warning from 'warning';
import AlertTitle from '@material-ui/core/AlertTitle';

export default React.forwardRef(function DeprecatedAlertTitle(props, ref) {
  let warnOnce = false;

  warning(
    warnOnce,
    [
      'Material-UI: the AlertTitle component was moved from the lab to the core.',
      '',
      "You should use `import { AlertTitle } from '@material-ui/core'`",
      "or `import AlertTitle from '@material-ui/core/AlertTitle'`",
    ].join('\n'),
  );
  
  warnOnce = true;

  return <AlertTitle ref={ref} {...props} />;
});
