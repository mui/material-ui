import * as React from 'react';
import NProgressBar, { NProgress } from '@material-ui/core/NProgressBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function App() {
  const [initialDelay, setInitialDelay] = React.useState(300);

  return (
    <React.Fragment>
      <NProgressBar initialDelay={initialDelay} />
      <br />
      <Button onClick={() => NProgress.start()}>Start</Button>
      <Button onClick={() => NProgress.finish()}>Finish</Button>
      <br /><br />
      <TextField
        value={initialDelay}
        onChange={({ target: { value } }) => setInitialDelay(+value || 0)}
      />
    </React.Fragment>
  );
}
