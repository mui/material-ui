import RootRef from '@material-ui/core/RootRef';
// import { RootRef } from '@material-ui/core';
// import { RootRef, Button } from '@material-ui/core';
// import { Tooltip, RootRef, Button } from '@material-ui/core';

function App() {
  return (
    <RootRef rootRef={this.container}>
      <Typography />
      <CssBaseline></CssBaseline>
    </RootRef>
  );
}
