import * as React from 'react';
import NProgressBar, { NProgress } from '@material-ui/lab/NProgressBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function DelayedAppearance() {
  const [initialDelay, setInitialDelay] = React.useState(300);

  return (
    <React.Fragment>
      <NProgressBar initialDelay={initialDelay} />
      <Button onClick={() => NProgress.start()}>Start</Button>
      <Button onClick={() => NProgress.finish()}>Finish</Button>
      <TextField
        sx={{ display: 'block', mt: 3 }}
        label="Initial delay"
        value={initialDelay}
        onChange={({ target: { value } }) => setInitialDelay(+value || 0)}
      />
    </React.Fragment>
  );
}
