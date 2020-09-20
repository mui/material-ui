import Alert from '@material-ui/core/Alert';

// To remove in v5
let warnOnce = false;
if (!warnOnce) {
  console.warn(
    [
      'Material-UI: Alert from @material-ui/lab is deprecated.',
      'Please use @material-ui/core/Alert',
    ].join('\n'),
  );
  warnOnce = true;
}
export default Alert;
