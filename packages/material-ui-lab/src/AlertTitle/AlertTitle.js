import React from 'react';
import warning from 'warning';
import AlertTitle from '@material-ui/core/AlertTitle';

export default React.forwardRef(function DeprecatedAlertTitle(props, ref) {
  warning(
    false,
    [
      'Material-UI: the AlertTitle component was moved from the lab to the core.',
      '',
      'Yay, the component is stable! 🎉',
      '',
      "You should use `import { AlertTitle } from '@material-ui/core'`",
      "or `import AlertTitle from '@material-ui/core/AlertTitle'`",
    ].join('\n'),
  );

  return <AlertTitle ref={ref} {...props} />;
});
