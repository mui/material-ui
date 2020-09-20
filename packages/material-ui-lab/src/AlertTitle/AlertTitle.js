import AlertTitle from '@material-ui/core/AlertTitle';

// To remove in v5
let warnOnce = false;
if (!warnOnce) {
  console.warn(
    [
      'Material-UI: AlertTitle from @material-ui/lab is deprecated.',
      'Please use @material-ui/core/AlertTitle',
    ].join('\n'),
  );
  warnOnce = true;
};

export default AlertTitle;
