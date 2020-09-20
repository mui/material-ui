import React from 'react';
import warning from 'warning';
import Alert from '@material-ui/core/Alert';

export default React.forwardRef(function DeprecatedAlert(props, ref) {
  warning(
    false,
    [
      'Material-UI: the Alert component was moved from the lab to the core.',
      '',
      'Yay, the component is stable! 🎉',
      '',
      "You should use `import { Alert } from '@material-ui/core'`",
      "or `import Alert from '@material-ui/core/Alert'`",
    ].join('\n'),
  );

  return <Alert ref={ref} {...props} />;
});
