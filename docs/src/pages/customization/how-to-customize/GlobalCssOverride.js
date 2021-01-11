import * as React from 'react';
import GlobalStyles from '@material-ui/core/GlobalStyles';
import Button from '@material-ui/core/Button';

const globalStyles = {
  '.MuiButton-root': {
    fontSize: '1rem',
  },
};

export default function GlobalCssOverride() {
  return (
    <React.Fragment>
      <GlobalStyles styles={globalStyles} />
      <Button>font-size: 1rem</Button>
    </React.Fragment>
  );
}
