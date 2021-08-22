import * as React from 'react';
import Button from '@material-ui/core/Button';

export default function ThemeButton() {
  return (
    <React.Fragment>
      <Button size="medium" variant="contained" sx={{ flexGrow: 1 }}>
        Buy Library
      </Button>
      <Button size="medium" variant="contained" disabled sx={{ flexGrow: 1 }}>
        Buy Library
      </Button>
    </React.Fragment>
  );
}
