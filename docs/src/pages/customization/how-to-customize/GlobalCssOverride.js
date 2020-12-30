import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    '.MuiButton-root': {
      fontSize: '1rem',
    },
  },
})(() => null);

export default function GlobalCssOverride() {
  return (
    <React.Fragment>
      <GlobalCss />
      <Button>font-size: 1rem</Button>
    </React.Fragment>
  );
}
