import * as React from 'react';
import NProgressBar, { NProgress } from '@material-ui/lab/NProgressBar';
import Button from '@material-ui/core/Button';

export default function App() {
  return (
    <React.Fragment>
      <NProgressBar />
      <br />
      <Button onClick={() => NProgress.start()}>Start</Button>
      <Button onClick={() => NProgress.finish()}>Finish</Button>
    </React.Fragment>
  );
}
